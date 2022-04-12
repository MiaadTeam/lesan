import { ServiceKeys } from "../mod.ts";
import { throwError } from "./mod.ts";

export interface Details {
  set: Record<string, any>;
  get: Record<string, any>;
}

export interface Body {
  service?: ServiceKeys;
  contents: "dynamic" | "static";
  wants: {
    model: string;
    act: string;
  };
  details: Details;
}

const decodeBody = async (req: Request): Promise<Body> => {
  /**
   * @function
   * decode body of request when content type is application/json
   */
  const decodeJsonBody = async () =>
    req.body
      ? JSON.parse(await req.text()) as Body
      : throwError("Your request body is incorrect");

  /**
   * @function
   * decode all files and funql body when type of content type is multipart/form-data
   * @remarks it puts all of files in set of details of request body
   * @return parsed body with uploaded files
   * @example we recommend to use postman or other client lib fot handling boundary field and other fields
   */
  const decodeMultiPartBody = async () => {
    // finds boundary of form data
    // const boundary = contentType.match(/boundary=([^\s]+)/)?.[1];

    const getFileFormData: () => Promise<Body> = async () => {
      const fd = await req.formData();
      // for (const f of fd.entries()) {
      //   if (!(f[1] instanceof File)) {
      //     continue;
      //   }
      //   const fileData = new Uint8Array(await f[1].arrayBuffer());
      //   await Deno.writeFile("./files/" + f[1].name, fileData);
      // }
      const returnBody: (body: string) => Body = (body) => {
        const parsedBody = JSON.parse(body) as Body;
        parsedBody &&
          parsedBody.details &&
          parsedBody.details.set &&
          (parsedBody.details.set = {
            ...parsedBody.details.set,
            formData: fd,
          });
        return parsedBody;
      };

      const body = fd.get("lesan-body") ? fd.get("lesan-body") as string : "{}";

      return body
        ? returnBody(body)
        : throwError("somthing wrong with your file");
    };

    return req.body
      ? await getFileFormData()
      : throwError("Your body is incorrect");
  };

  const contentType = req.headers.get("content-type") || "";
  return contentType.includes("application/json")
    ? await decodeJsonBody()
    : contentType.includes("multipart/form-data")
    ? await decodeMultiPartBody()
    : throwError("content type is not correct");
};

export const parsBody = async (req: Request, port: number) => {
  const parsedBody = await decodeBody(req);
  const url = req.url.split(`${port}`)[1];

  return req.method === "POST" && url === "/lesan"
    ? parsedBody
    : throwError("you most send a post request to /lesan url");
};
