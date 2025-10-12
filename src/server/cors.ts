export const addCors = (
  cors: "*" | string[] | undefined,
  origin: string | null,
  contentType?: string,
) => {
  const header: Record<string, any> = {};
  // Only set content-type if explicitly provided
  if (contentType) {
    header["content-type"] = contentType;
  } else {
    header["content-type"] = "application/json";
  }
  header["Access-Control-Allow-Headers"] =
    "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, token, origin, Cache-Control, X-Requested-With, Authorization, Accept, Accept-Version, Content-MD5, Date";
  header["Access-Control-Allow-Methods"] = "POST, OPTIONS, GET, PUT";
  // Add Access-Control-Expose-Headers for file uploads
  header["Access-Control-Expose-Headers"] =
    "Content-Disposition, Content-Length, Content-Type";
  if (cors === "*") {
    header["Access-Control-Allow-Origin"] = "*";
  } else {
    if (origin === null) {
      return header;
    } else {
      const includeOrigin = cors && cors.includes(origin);
      if (includeOrigin) {
        header["Access-Control-Allow-Origin"] = origin;
        header["Access-Control-Allow-Credentials"] = "true";
      } else {
        return header;
      }
    }
  }
  return header;
};
