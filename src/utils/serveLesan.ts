import { acts, Services } from "../acts/mod.ts";
import { contextFns } from "../context.ts";
import { assert, create, enums } from "../npmDeps.ts";
import { addCorsObj } from "../server/cors.ts";
import { parsBody, TLesanBody } from "./mod.ts";

const runPreHooks = async (preActs: Function[]) => {
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
   * @param {TLesanBody} body - input of act
   * @returns answer of function that executed
   */
  const runAct = async () => {
    let body = contextFns.getContextModel().body!;
    const bodyService = body.service || "main";
    const act = acts(actsObj).getAct(
      bodyService,
      body.model,
      body.act,
    );

    act.preValidation && await runPreHooks(act.preValidation);
    body = contextFns.getContextModel().body!;

    act.validationRunType === "create"
      ? create(body.details, act.validator)
      : assert(body.details, act.validator);
    body = contextFns.getContextModel().body!;

    act.preAct && await runPreHooks(act.preAct);
    body = contextFns.getContextModel().body!;

    return await act.fn(body);
  };

  /**
   * check action that client wants is true and if request is true, this function will run runAct's function
   * @param {@link Body} body - is type of Body
   * @returns return output of runAct's function
   */
  const checkActs = async () => {
    const body = contextFns.getContextModel().body!;
    const bodyService = body.service || "main";
    const actKeys = acts(actsObj).getActsKeys(
      bodyService,
      body.model,
    );
    const getedActs = actKeys;
    assert(
      body.act,
      enums(getedActs),
      `the wants.act key is incorrect we just have these acts: ${[
        ...getedActs,
      ]}`,
    );

    return await runAct();
  };

  /**
   * check model that client wants is true?
   * @param {@link Body} body - is type of Body
   * @return if it is exist in dynamickey or static key, it will run CkeckActs
   * else throw Error
   */
  const checkModels = async () => {
    const body = contextFns.getContextModel().body!;
    const bodyService = body.service || "main";
    const models = acts(actsObj).getActKeys(bodyService);
    assert(
      body.model,
      enums(models),
      `the wants.model key is incorrect we just have these models: ${[
        ...models,
      ]}`,
    );

    return await checkActs();
  };

  /**
   * sed request to another service
   * @param url - that we want to sed request for it
   * @param Body of request has been sent by client
   * @param header request has been sent by client
   * @returns return response of request
   */
  async function postData(url = "", body: TLesanBody, headers = {}) {
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
    body: TLesanBody,
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
    const body = (await parsBody(req, port)) as TLesanBody;
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
      : await checkModels();
  };
  /**
   * this is main function that call checkServices
   * @param req - request of client
   * @param port - port of request
   * @returns return response of request
   */
  const serveLesan = async (
    req: Request,
    port: number,
    cors: "*" | string[] | undefined,
  ) => {
    const response = async () => {
      contextFns.addHeaderToContext(req.headers);
      return await checkServices(req, port);
    };

    return new Response(
      JSON.stringify({ body: await response(), success: true }),
      {
        headers: {
          ...addCorsObj(cors, req.headers.get("origin")),
          "Content-Type": "application/json",
        },
      },
    );
  };
  return {
    runAct,
    checkActs,
    checkModels,
    serveLesan,
  };
};
