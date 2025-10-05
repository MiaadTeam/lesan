export const addCors = (
  cors: "*" | string[] | undefined,
  origin: string | null,
) => {
  const header: Headers = new Headers();
  header.set("content-type", "application/json");
  header.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, token, origin, Cache-Control, X-Requested-With, Authorization, Accept, Accept-Version, Content-MD5, Date",
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
      const includeOrigin = cors && cors.includes(origin);
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
