/// context type ----
export interface Context {
  [key: string]: any
}
export let context: Context = {};

export const getContextModel = () => context;

export const addContexts = (con:Context) => {
  context=con
};

export const addContext =(con:Context)=>{
  context={...context,con}
}

export const addReqToContext = (con:Request)=>{
  context["Request"]=con
}
