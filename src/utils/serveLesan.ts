import { assert, enums } from "https://deno.land/x/lestruct/mod.ts";
import {
  getAct,
  getActsKeys,
  getDynamicKeys,
  getService,
  getServiceKeys,
  getStaticKeys,
} from "../mod.ts";
import { Body, parsBody } from "./mod.ts";

export const runAct = (body: Body) => {
  const bodyService = body.service || "main";
  const act = getAct(
    bodyService,
    body.contents,
    body.wants.model,
    body.wants.act,
  );
  assert(body.details, act.validator);

  return act.fn(body);
};

const checkActs = (body: Body) => {
  const bodyService = body.service || "main";
  const actKeys = getActsKeys(bodyService, body.contents, body.wants.model);
  const acts = enums(actKeys);
  assert(body.wants.act, acts);

  return runAct(body);
};

const checkModels = (body: Body) => {
  const bodyService = body.service || "main";
  const models = body.contents === "static"
    ? enums(getStaticKeys(bodyService))
    : enums(getDynamicKeys(bodyService));
  assert(body.wants.model, models);

  return checkActs(body);
};

const checkContetType = (body: Body) => {
  const content = enums(["dynamic", "static"]);
  assert(body.contents, content);

  return checkModels(body);
};

async function postData(url = "", body: Body, headers = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(body), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// TODO: do not implement fetch completly it shoud be fetch data with the same req but change the req.body.service to main
const fetchService = async (headers: {}, body: Body, serviceValue: string) => {
  const result = await postData(
    serviceValue,
    { ...body, service: "main" },
    headers,
  );
  return result;
};

const checkServices = async (req: Request, port: number) => {
  const body = (await parsBody(req, port)) as Body;
  const serviceKeys = getServiceKeys();
  const servic = enums(serviceKeys);
  const bodyService = body.service || "main";
  assert(bodyService, servic);
  const serviceValue = getService(bodyService);
  return typeof serviceValue === "string"
    ? fetchService(req.headers, body, serviceValue)
    : checkContetType(body);
};

export const serveLesan = async (req: Request, port: number) => {
  const response = async () => {
    await checkServices(req, port);
  };

  return new Response(
    JSON.stringify({ body: await response(), success: true }),
  );
};
