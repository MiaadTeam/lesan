/** @jsx h */
import { createContext, h } from "https://esm.sh/preact@10.5.15";
import {
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "https://esm.sh/preact@10.5.15/hooks";

// A generic Type to handle customized Objects
interface TObjectArray<T> {
  [key: string]: T;
}

/* --------------------------- Action Types Start --------------------------- */
enum ACTION_TYPE {
  SET_SERVICE = "SET_SELECTED_SERVICE",
  SET_METHOD = "SET_SELECTED_METHOD",
  SET_SCHEMA = "SET_SCHEMA",
  SET_ACT = "SET_ACT",
  SET_POST_FIELDS = "SET_POST_FIELDS",
  RESET_POST_FIELDS = "RESET_POST_FIELDS",
  SET_GET_FIELDS = "SET_GET_FIELDS",
  RESET_GET_FIELDS = "RESET_GET_FIELDS",
  SET_FORM_DATA = "SET_FORM_DATA",
  SET_HEADER = "SET_HEADER",
  SET_HISTORY = "ADD_HISTORY",
  SET_RESPONSE = "SET_RESPONSE",
}
/* --------------------------- Action Types End --------------------------- */

/* ------------------------- Type Definitions Start ------------------------- */
export type TRequest = {
  method: "POST";
  headers: {
    "Content-Type": "application/json";
    [key: string]: any;
  };
  body: string;
};

type TResponse = {
  body: Record<string, any> | Record<string, any>[];
  success: boolean;
};

type THistory = {
  request: TRequest;
  response: TResponse;
  id: string;
};

// TODO: The any Types have to remove and fix
interface IState {
  service: string;
  method: string;
  schema: string;
  act: string;
  postFields: any;
  getFields: any;
  formData: any;
  headers: TObjectArray<string>;
  history: THistory[];
  response: TResponse | null;
  setService: (payload: string) => void;
  setMethod: (payload: string) => void;
  setSchema: (payload: string) => void;
  setAct: (payload: string) => void;
  setPostFields: (payload: string) => void;
  resetPostFields: () => void;
  setGetFields: (payload: string) => void;
  resetGetFields: () => void;
  setFormData: (payload: any) => void;
  setHeader: (payload: TObjectArray<string>) => void;
  setHistory: (payload: THistory[]) => void;
  setResponse: (payload: TResponse) => void;
}

type TAction =
  | {
    type: ACTION_TYPE.SET_SERVICE;
    payload: string;
  }
  | {
    type: ACTION_TYPE.SET_METHOD;
    payload: string;
  }
  | {
    type: ACTION_TYPE.SET_SCHEMA;
    payload: string;
  }
  | {
    type: ACTION_TYPE.SET_ACT;
    payload: string;
  }
  | {
    type: ACTION_TYPE.SET_POST_FIELDS;
    payload: string;
  }
  | {
    type: ACTION_TYPE.RESET_POST_FIELDS;
    payload: string;
  }
  | {
    type: ACTION_TYPE.SET_GET_FIELDS;
    payload: string;
  }
  | {
    type: ACTION_TYPE.RESET_GET_FIELDS;
    payload: string;
  }
  | {
    type: ACTION_TYPE.SET_FORM_DATA;
    payload: string;
  }
  | {
    type: ACTION_TYPE.SET_HEADER;
    payload: TObjectArray<string>;
  }
  | {
    type: ACTION_TYPE.SET_HISTORY;
    payload: THistory[];
  }
  | {
    type: ACTION_TYPE.SET_RESPONSE;
    payload: TResponse;
  };
/* -------------------------- Type Definitions End -------------------------- */

// TODO: Have to Find Someway to Prevent from Rewriting Function Types
const initialState: IState = {
  service: "",
  method: "",
  schema: "",
  act: "",
  postFields: {},
  getFields: {},
  formData: {},
  headers: { Authorization: "" },
  history: [],
  response: null,
  setService: () => ({}),
  setMethod: () => ({}),
  setSchema: () => ({}),
  setAct: () => ({}),
  setPostFields: () => ({}),
  resetPostFields: () => ({}),
  setGetFields: () => ({}),
  resetGetFields: () => ({}),
  setFormData: () => ({}),
  setHeader: () => ({}),
  setHistory: () => ({}),
  setResponse: () => ({}),
};

const LesanContext = createContext<IState>(initialState);

function lesanReducer(state: IState, action: TAction): IState {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPE.SET_SERVICE: {
      return {
        ...state,
        service: payload,
      };
    }
    case ACTION_TYPE.SET_METHOD: {
      return {
        ...state,
        method: payload,
      };
    }
    case ACTION_TYPE.SET_SCHEMA: {
      return {
        ...state,
        schema: payload,
      };
    }
    case ACTION_TYPE.SET_ACT: {
      return {
        ...state,
        act: payload,
      };
    }
    case ACTION_TYPE.SET_POST_FIELDS: {
      return {
        ...state,
        postFields: payload,
      };
    }
    case ACTION_TYPE.RESET_POST_FIELDS: {
      return {
        ...state,
        postFields: {},
      };
    }
    case ACTION_TYPE.SET_GET_FIELDS: {
      return {
        ...state,
        getFields: payload,
      };
    }
    case ACTION_TYPE.RESET_GET_FIELDS: {
      return {
        ...state,
        getFields: {},
      };
    }
    case ACTION_TYPE.SET_FORM_DATA: {
      return {
        ...state,
        formData: payload,
      };
    }
    case ACTION_TYPE.SET_HEADER: {
      return {
        ...state,
        headers: payload,
      };
    }
    case ACTION_TYPE.SET_HISTORY: {
      return {
        ...state,
        history: payload,
      };
    }
    case ACTION_TYPE.SET_RESPONSE: {
      return {
        ...state,
        response: payload,
      };
    }
    default:
      throw new Error(`Unhandled action type`);
  }
}

const LesanProvider = (props: any) => {
  const [state, dispatch] = useReducer(lesanReducer, initialState);

  const setService = useCallback(
    (payload: string) => dispatch({ type: ACTION_TYPE.SET_SERVICE, payload }),
    [dispatch],
  );

  const setMethod = useCallback(
    (payload: string) => dispatch({ type: ACTION_TYPE.SET_METHOD, payload }),
    [dispatch],
  );

  const setSchema = useCallback(
    (payload: string) => dispatch({ type: ACTION_TYPE.SET_SCHEMA, payload }),
    [dispatch],
  );

  const setAct = useCallback(
    (payload: string) => dispatch({ type: ACTION_TYPE.SET_ACT, payload }),
    [dispatch],
  );

  const setPostFields = useCallback(
    (payload: string) =>
      dispatch({ type: ACTION_TYPE.SET_POST_FIELDS, payload }),
    [dispatch],
  );

  const resetPostFields = useCallback(
    (payload: string) =>
      dispatch({ type: ACTION_TYPE.RESET_POST_FIELDS, payload }),
    [dispatch],
  );

  const setGetFields = useCallback(
    (payload: string) =>
      dispatch({ type: ACTION_TYPE.SET_GET_FIELDS, payload }),
    [dispatch],
  );

  const resetGetFields = useCallback(
    (payload: string) =>
      dispatch({ type: ACTION_TYPE.RESET_GET_FIELDS, payload }),
    [dispatch],
  );
  const setFormData = useCallback(
    (payload: any) => dispatch({ type: ACTION_TYPE.SET_FORM_DATA, payload }),
    [dispatch],
  );

  const setHeader = useCallback(
    (payload: TObjectArray<string>) =>
      dispatch({ type: ACTION_TYPE.SET_HEADER, payload }),
    [dispatch],
  );

  const setHistory = useCallback(
    (payload: THistory[]) =>
      dispatch({ type: ACTION_TYPE.SET_HISTORY, payload }),
    [dispatch],
  );

  const setResponse = useCallback(
    (payload: TResponse) =>
      dispatch({ type: ACTION_TYPE.SET_RESPONSE, payload }),
    [dispatch],
  );

  const value = useMemo(
    () => ({
      ...state,
      setService,
      setMethod,
      setSchema,
      setAct,
      setPostFields,
      resetPostFields,
      setGetFields,
      resetGetFields,
      setFormData,
      setHeader,
      setHistory,
      setResponse,
    }),
    [state],
  );

  return <LesanContext.Provider value={value} {...props} />;
};

const useLesan = () => {
  const context = useContext(LesanContext);
  if (context === undefined) {
    console.warn(`useLesan must be used within a LesanProvider`);
  }
  return context;
};

const ManagedLesanContext = (props: { children: h.JSX.Element }) => {
  const { children } = props;

  return <LesanProvider>{children}</LesanProvider>;
};

export { ManagedLesanContext, useLesan };
