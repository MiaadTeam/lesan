/// context type ----
export interface Context {
  [key: string]: any;
}

export const contextFns = () => {
  let context: Context = {};

  const getContextModel = () => context;

  const addContexts = (con: Context) => context = con;

  const addContext = (con: Context) => context = { ...context, con };

  const addReqToContext = (con: Request) => context["Request"] = con;

  return {
    getContextModel,
    addContexts,
    addContext,
    addReqToContext,
  };
};
