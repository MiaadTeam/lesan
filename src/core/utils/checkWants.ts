import { throwError } from "./mod.ts";

/**
 * details of input is include set , get
 * @public
 */
export interface Details {
  /**
   *  set of query
   */
  set: Record<string, any>;
  /**
   * get pf query
   * What the client wants to return
   */
  get: Record<string, any>;
}
/**
 * interface is type of input of Actions
 * @public
 */
export interface TLesanBody {
  /**
   * name of service
   * "main" | "blog" | "ecommerce"
   */
  service?: string;
  /**
   * model : schema name that client wants
   * act : name of Actions
   */
  model: string;
  act: string;
  /**
   * details of request set and get
   */
  details: Details;
}

const decodeBody = async (req: Request): Promise<TLesanBody> => {
  /**
   * @function
   * decode body of request when content type is application/json
   */
  const decodeJsonBody = async () =>
    req.body
      ? JSON.parse(await req.text()) as TLesanBody
      : throwError("Your request body is incorrect");

  /**
   * @function
   * decode all files and funql body when type of content type is multipart/form-data
   * @remarks it puts all of files in set of details of request body
   * @return parsed body with uploaded files
   * @example we recommend to use postman or other client lib fot handling boundary field and other fields
   */
  const decodeMultiPartBody = async () => {
    // Extract boundary from content-type
    const boundaryMatch = contentType.match(/boundary=([^;]+)/);
    const boundary = boundaryMatch ? boundaryMatch[1] : null;

    if (!boundary) {
      console.warn("No boundary found in multipart/form-data request");
    }

    const getFileFormData: () => Promise<TLesanBody> = async () => {
      try {
        const fd = await req.formData();

        const returnBody: (body: string) => TLesanBody = (body) => {
          try {
            const parsedBody = JSON.parse(body) as TLesanBody;
            if (parsedBody && parsedBody.details && parsedBody.details.set) {
              parsedBody.details.set = {
                ...parsedBody.details.set,
                formData: fd,
              };
            } else {
              console.warn(
                "Parsed body structure is not as expected:",
                parsedBody,
              );
            }
            return parsedBody;
          } catch (e) {
            console.error("Error parsing body JSON:", e);
            return throwError("Invalid JSON in lesan-body field");
          }
        };

        const body = fd.get("lesan-body")
          ? fd.get("lesan-body") as string
          : "{}";

        return body
          ? returnBody(body)
          : throwError("Something wrong with your file upload");
      } catch (err) {
        console.error("Error processing multipart/form-data:", err);
        throw err;
      }
    };

    return req.body
      ? await getFileFormData()
      : throwError("Your request body is incorrect or empty");
  };

  const contentType = req.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      return await decodeJsonBody();
    } else if (contentType.includes("multipart/form-data")) {
      return await decodeMultiPartBody();
    } else {
      return throwError(
        `Unsupported content type: ${contentType}. Expected application/json or multipart/form-data`,
      );
    }
  } catch (error) {
    console.error(`Error processing ${contentType} request:`, error);
    throw error;
  }
};

export const parsBody = async (req: Request, port: number) => {
  const parsedBody = async () => {
    try {
      return await decodeBody(req);
    } catch (error) {
      console.error("Error decoding body:", error);
      throw error;
    }
  };

  const url = new URL(req.url);
  const path = url.pathname;

  if (req.method === "POST" && path === "/lesan") {
    return await parsedBody();
  } else {
    return throwError(
      `Invalid request: Expected POST to /lesan, got ${req.method} to ${path}`,
    );
  }
};
