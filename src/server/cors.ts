export const addCors = (cors: "*" | string[], origin: string | null) => {
  const header: Headers = new Headers();
  header.set("content-type", "application/json");
  header.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, token, accept, origin, Cache-Control, X-Requested-With",
  );
  header.set(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS, GET, PUT",
  );
  if (cors === "*") {
    header.set("Access-Control-Allow-Origin", "*");
  } else {
    if (origin === null) {
      return header;
    } else {
      const includeOrigin = cors.includes(origin);
      if (includeOrigin) {
        header.set("Access-Control-Allow-Origin", origin);
        header.set("Access-Control-Allow-Credentials", "true");
      } else {
        return header;
      }
    }
  }
  return header;
};

export const addCorsObj = (
  cors: "*" | string[] | undefined,
  origin: string | null,
) => {
  const header: Record<string, any> = {
    "Access-Control-Allow-Headers":
      "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, token, accept, origin, Cache-Control, X-Requested-With",
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET, PUT",
  };
  if (cors === "*") {
    header["Access-Control-Allow-Origin"] = "*";
  } else {
    if (origin === null) {
      return header;
    } else {
      if (cors) {
        const includeOrigin = cors.includes(origin);
        if (includeOrigin) {
          header["Access-Control-Allow-Origin"] = origin;
          header["Access-Control-Allow-Credentials"] = "true";
        } else {
          return header;
        }
      } else {
        return header;
      }
    }
  }

  return header;
};
