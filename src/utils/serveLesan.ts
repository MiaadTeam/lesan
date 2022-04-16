import { acts, Services } from "../acts/mod.ts";
import { assert, enums } from "../deps.ts";
import { Body, parsBody } from "./mod.ts";

export const lesanFns = (actsObj: Services) => {
  const runAct = async (body: Body) => {
    const bodyService = body.service || "main";
    const act = acts(actsObj).getAct(
      bodyService,
      body.contents,
      body.wants.model,
      body.wants.act,
    );
    assert(body.details, act.validator);

    return await act.fn(body);
  };

  const checkActs = async (body: Body) => {
    const bodyService = body.service || "main";
    const actKeys = acts(actsObj).getActsKeys(
      bodyService,
      body.contents,
      body.wants.model,
    );
    const getedActs = enums(actKeys);
    assert(body.wants.act, getedActs);

    return await runAct(body);
  };

  const checkModels = async (body: Body) => {
    const bodyService = body.service || "main";
    const models = body.contents === "static"
      ? enums(acts(actsObj).getStaticKeys(bodyService))
      : enums(acts(actsObj).getDynamicKeys(bodyService));
    assert(body.wants.model, models);

    return await checkActs(body);
  };

  const checkContetType = async (body: Body) => {
    const content = enums(["dynamic", "static"]);
    assert(body.contents, content);

    return await checkModels(body);
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
  const fetchService = async (
    headers: {},
    body: Body,
    serviceValue: string,
  ) => {
    const result = await postData(
      serviceValue,
      { ...body, service: "main" },
      headers,
    );
    return result;
  };

  const checkServices = async (req: Request, port: number) => {
    const body = (await parsBody(req, port)) as Body;
    const serviceKeys = acts(actsObj).getServiceKeys();
    const servic = enums(serviceKeys);
    const bodyService = body.service || "main";
    assert(bodyService, servic);
    const serviceValue = acts(actsObj).getService(bodyService);
    return typeof serviceValue === "string"
      ? await fetchService(req.headers, body, serviceValue)
      : await checkContetType(body);
  };

  const serveLesan = async (req: Request, port: number) => {
    const response = async () => {
      return await checkServices(req, port);
    };

    return new Response(
      JSON.stringify({ body: await response(), success: true }),
    );
  };
  return {
    runAct,
    checkActs,
    checkModels,
    checkContetType,
    serveLesan,
  };
};
