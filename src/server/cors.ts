export const addCors = () => {
  const header: Headers = new Headers();
  header.set("content-type", "application/json");
  header.set("Access-Control-Allow-Origin", "*");
  header.set("Access-Control-Allow-Credentials", "true");
  header.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, token, accept, origin, Cache-Control, X-Requested-With",
  );
  header.set(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS, GET, PUT",
  );
  return header;
};
