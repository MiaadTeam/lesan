import { acts, Services } from "../acts/mod.ts";
import { contextFns } from "../context.ts";
import { assert, create, enums } from "../deps.ts";
import { addCors, addCorsObj } from "../server/cors.ts";
import { Body, parsBody } from "./mod.ts";

const runPreActs = async (preActs: Function[]) => {
  for (const func of preActs) {
    await func();
  }
};

/**
  * function of lesan
* @param actsObj -all services
* @returns - {
*   runAct, : runc action that client wants to run
    checkActs,
    checkModels,
    checkContetType,
    serveLesan,}
  */
export const lesanFns = (actsObj: Services) => {
  /**
   * runc action that client wants to run
   * @param {Body} body - input of act
   * @returns answer of function that executed
   */
  const runAct = async (body: Body) => {
    const bodyService = body.service || "main";
    const act = acts(actsObj).getAct(
      bodyService,
      body.contents,
      body.wants.model,
      body.wants.act,
    );

    act.validationRunType === "create"
      ? create(body.details, act.validator)
      : assert(body.details, act.validator);

    act.preAct && await runPreActs(act.preAct);

    return await act.fn(body);
  };

  /**
   * check action that client wants is true and if request is true, this function will run runAct's function
   * @param {@link Body} body - is type of Body
   * @returns return output of runAct's function
   */
  const checkActs = async (body: Body) => {
    const bodyService = body.service || "main";
    const actKeys = acts(actsObj).getActsKeys(
      bodyService,
      body.contents,
      body.wants.model,
    );
    const getedActs = actKeys;
    assert(
      body.wants.act,
      enums(getedActs),
      `the wants.act key is incorrect we just have these acts: ${[
        ...getedActs,
      ]}`,
    );

    return await runAct(body);
  };

  /**
   * check model that client wants is true?
   * @param {@link Body} body - is type of Body
   * @return if it is exist in dynamickey or static key, it will run CkeckActs
   * else throw Error
   */
  const checkModels = async (body: Body) => {
    const bodyService = body.service || "main";
    const models = body.contents === "static"
      ? (acts(actsObj).getStaticKeys(bodyService))
      : (acts(actsObj).getDynamicKeys(bodyService));
    assert(
      body.wants.model,
      enums(models),
      `the wants.model key is incorrect we just have these models: ${[
        ...models,
      ]}`,
    );

    return await checkActs(body);
  };

  /**
   * check Content-Type that client sends is true?
   * @param {@link Body} body - is type of Body
   * @returns if ContentType is true, it will run checkModels , else throwError
   */
  const checkContetType = async (body: Body) => {
    const content = ["dynamic", "static"];
    assert(
      body.contents,
      enums(content),
      `the contents key is incorrect we just have these contents: ${[
        ...content,
      ]}`,
    );

    return await checkModels(body);
  };

  /**
   * sed request to another service
   * @param url - that we want to sed request for it
   * @param Body of request has been sent by client
   * @param header request has been sent by client
   * @returns return response of request
   */
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
  /**
   * if we have url of service we send request to specif service with this function
   * and this function change service name becuse we want to request to another url of service
   * @param Body of request has been sent by client
   * @param header request has been sent by client
   * @param serviceValue - this url of service that we want to send request to it
   */
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

  /**
   * checkServices: if request for mainService or in the core Service exists other Act of service this function runs checkContetType's function
   * else run fetchService's function and send request to service directrly
   * @returns response of request
   * @param req - request of client
   * @param port - port of request
   */
  const checkServices = async (req: Request, port: number) => {
    const body = (await parsBody(req, port)) as Body;
    const services = acts(actsObj).getServiceKeys();
    const bodyService = body.service || "main";

    contextFns.addBodyToContext(body);

    assert(
      bodyService,
      enums(services),
      `the service key is incorrect we just have these services: ${[
        ...services,
      ]}`,
    );

    const serviceValue = acts(actsObj).getService(bodyService);
    return typeof serviceValue === "string"
      ? await fetchService(req.headers, body, serviceValue)
      : await checkContetType(body);
  };
  /**
   * this is main function that call checkServices
   * @param req - request of client
   * @param port - port of request
   * @returns return response of request
   */
  const serveLesan = async (req: Request, port: number) => {
    const response = async () => {
      contextFns.addHeaderToContext(req.headers);
      return await checkServices(req, port);
    };

    return new Response(
      JSON.stringify({ body: await response(), success: true }),
      {
        headers: {
          // temporarly add cors to request
          // TODO should export cors fn to user and add some custom input to that
          ...addCorsObj(),

          "Content-Type": "application/json",
        },
      },
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
