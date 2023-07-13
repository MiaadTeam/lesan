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

  SET_ACTS_OBJ = "SET_ACTS_OBJ",
  SET_SCHEMAS_OBJ = "SET_SCHEMAS_OBJ",

  SET_ACTIVE_TAB = "SET_ACTIVE_TAB",
  ADD_TAB = "ADD_TAB",
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
  reqTime: any;
  response: TResponse;
  id: string;
};

// TODO: The any Types have to remove and fix
interface IState {
  tabsData: {
    service: string;
    method: string;
    schema: string;
    act: string;
    response: TResponse | null;
    postFields: any;
    getFields: any;
    formData: any;
  }[];
  setService: (payload: { data: string; index: number }) => void;
  setMethod: (payload: { data: string; index: number }) => void;
  setSchema: (payload: { data: string; index: number }) => void;
  setAct: (payload: { data: string; index: number }) => void;
  setPostFields: (payload: { data: string; index: number }) => void;
  setGetFields: (payload: { data: string; index: number }) => void;
  setFormData: (payload: { data: any; index: number }) => void;
  setResponse: (
    payload: { data: TResponse | null; index: number | null },
  ) => void;

  resetPostFields: (payload: number) => void;
  resetGetFields: (payload: number) => void;

  activeTab: number;
  setActiveTab: (payload: number) => void;
  addTab: (payload: null) => void;

  actsObj: Record<string, any>;
  schemasObj: Record<string, any>;
  headers: TObjectArray<string>;
  history: THistory[];
  setSchemasObj: (payload: Record<string, any>) => void;
  setActsObj: (payload: Record<string, any>) => void;
  setHeader: (payload: TObjectArray<string>) => void;
  setHistory: (payload: THistory[] | {}) => void;
}

type TAction =
  | {
    type: ACTION_TYPE.SET_SERVICE;
    payload: { data: string; index: number };
  }
  | {
    type: ACTION_TYPE.SET_METHOD;
    payload: { data: string; index: number };
  }
  | {
    type: ACTION_TYPE.SET_SCHEMA;
    payload: { data: string; index: number };
  }
  | {
    type: ACTION_TYPE.SET_ACT;
    payload: { data: string; index: number };
  }
  | {
    type: ACTION_TYPE.SET_POST_FIELDS;
    payload: { data: string; index: number };
  }
  | {
    type: ACTION_TYPE.RESET_POST_FIELDS;
    payload: number;
  }
  | {
    type: ACTION_TYPE.SET_GET_FIELDS;
    payload: { data: string; index: number };
  }
  | {
    type: ACTION_TYPE.RESET_GET_FIELDS;
    payload: number;
  }
  | {
    type: ACTION_TYPE.SET_FORM_DATA;
    payload: { data: any; index: number };
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
    payload: { data: TResponse | null; index: number };
  }
  | {
    type: ACTION_TYPE.SET_SCHEMAS_OBJ;
    payload: Record<string, any>;
  }
  | {
    type: ACTION_TYPE.SET_ACTIVE_TAB;
    payload: number;
  }
  | {
    type: ACTION_TYPE.ADD_TAB;
    payload: null;
  }
  | {
    type: ACTION_TYPE.SET_ACTS_OBJ;
    payload: Record<string, any>;
  };
/* -------------------------- Type Definitions End -------------------------- */

// TODO: Have to Find Someway to Prevent from Rewriting Function Types
const initialState: IState = {
  tabsData: [{
    service: "",
    method: "",
    schema: "",
    act: "",
    postFields: {},
    getFields: {},
    formData: {},
    response: null,
  }],
  schemasObj: {},
  actsObj: {},
  headers: { Authorization: "" },
  history: [],

  activeTab: 0,
  setActiveTab: () => ({}),
  addTab: () => ({}),

  setService: () => ({}),
  setMethod: () => ({}),
  setSchema: () => ({}),
  setAct: () => ({}),
  setActsObj: () => ({}),
  setSchemasObj: () => ({}),
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
      const copyTabsData = [...state.tabsData];
      copyTabsData[payload.index] = {
        ...copyTabsData[payload.index],
        service: payload.data,
      };
      return {
        ...state,
        tabsData: [...copyTabsData],
      };
    }
    case ACTION_TYPE.SET_METHOD: {
      const copyTabsData = [...state.tabsData];
      copyTabsData[payload.index] = {
        ...copyTabsData[payload.index],
        method: payload.data,
      };
      return {
        ...state,
        tabsData: [...copyTabsData],
      };
    }
    case ACTION_TYPE.SET_SCHEMA: {
      const copyTabsData = [...state.tabsData];
      copyTabsData[payload.index] = {
        ...copyTabsData[payload.index],
        schema: payload.data,
      };
      return {
        ...state,
        tabsData: [...copyTabsData],
      };
    }
    case ACTION_TYPE.SET_ACT: {
      const copyTabsData = [...state.tabsData];
      copyTabsData[payload.index] = {
        ...copyTabsData[payload.index],
        act: payload.data,
      };
      return {
        ...state,
        tabsData: [...copyTabsData],
      };
    }
    case ACTION_TYPE.SET_POST_FIELDS: {
      const copyTabsData = [...state.tabsData];
      copyTabsData[payload.index] = {
        ...copyTabsData[payload.index],
        postFields: payload.data,
      };
      return {
        ...state,
        tabsData: [...copyTabsData],
      };
    }
    case ACTION_TYPE.RESET_POST_FIELDS: {
      const copyTabsData = [...state.tabsData];
      copyTabsData[payload] = { ...copyTabsData[payload], postFields: {} };
      return {
        ...state,
        tabsData: [...copyTabsData],
      };
    }
    case ACTION_TYPE.SET_GET_FIELDS: {
      const copyTabsData = [...state.tabsData];
      copyTabsData[payload.index] = {
        ...copyTabsData[payload.index],
        getFields: payload.data,
      };
      return {
        ...state,
        tabsData: [...copyTabsData],
      };
    }
    case ACTION_TYPE.RESET_GET_FIELDS: {
      const copyTabsData = [...state.tabsData];
      copyTabsData[payload] = { ...copyTabsData[payload], getFields: {} };
      return {
        ...state,
        tabsData: [...copyTabsData],
      };
    }
    case ACTION_TYPE.SET_FORM_DATA: {
      const copyTabsData = [...state.tabsData];
      copyTabsData[payload.index] = {
        ...copyTabsData[payload.index],
        formData: payload.data,
      };
      return {
        ...state,
        tabsData: [...copyTabsData],
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
      const copyTabsData = [...state.tabsData];
      copyTabsData[payload.index] = {
        ...copyTabsData[payload.index],
        response: payload.data,
      };
      return {
        ...state,
        tabsData: [...copyTabsData],
      };
    }
    case ACTION_TYPE.ADD_TAB: {
      return {
        ...state,
        tabsData: [...state.tabsData, {
          service: "",
          method: "",
          schema: "",
          act: "",
          postFields: {},
          getFields: {},
          formData: {},
          response: null,
        }],
        activeTab: state.tabsData.length,
      };
    }
    case ACTION_TYPE.SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: payload,
      };
    }
    case ACTION_TYPE.SET_ACTS_OBJ: {
      return {
        ...state,
        actsObj: payload,
      };
    }
    case ACTION_TYPE.SET_SCHEMAS_OBJ: {
      return {
        ...state,
        schemasObj: payload,
      };
    }
    default:
      throw new Error(`Unhandled action type`);
  }
}

const LesanProvider = (props: any) => {
  const [state, dispatch] = useReducer(lesanReducer, initialState);

  const setService = useCallback(
    (payload: { data: string; index: number }) =>
      dispatch({ type: ACTION_TYPE.SET_SERVICE, payload }),
    [dispatch],
  );

  const setMethod = useCallback(
    (payload: { data: string; index: number }) =>
      dispatch({ type: ACTION_TYPE.SET_METHOD, payload }),
    [dispatch],
  );

  const setSchema = useCallback(
    (payload: { data: string; index: number }) =>
      dispatch({ type: ACTION_TYPE.SET_SCHEMA, payload }),
    [dispatch],
  );

  const setAct = useCallback(
    (payload: { data: string; index: number }) =>
      dispatch({ type: ACTION_TYPE.SET_ACT, payload }),
    [dispatch],
  );

  const setPostFields = useCallback(
    (payload: { data: string; index: number }) =>
      dispatch({ type: ACTION_TYPE.SET_POST_FIELDS, payload }),
    [dispatch],
  );

  const resetPostFields = useCallback(
    (payload: number) =>
      dispatch({ type: ACTION_TYPE.RESET_POST_FIELDS, payload }),
    [dispatch],
  );

  const setGetFields = useCallback(
    (payload: { data: string; index: number }) =>
      dispatch({ type: ACTION_TYPE.SET_GET_FIELDS, payload }),
    [dispatch],
  );

  const resetGetFields = useCallback(
    (payload: number) =>
      dispatch({ type: ACTION_TYPE.RESET_GET_FIELDS, payload }),
    [dispatch],
  );

  const setFormData = useCallback(
    (payload: { data: any; index: number }) =>
      dispatch({ type: ACTION_TYPE.SET_FORM_DATA, payload }),
    [dispatch],
  );

  const setActiveTab = useCallback(
    (payload: number) =>
      dispatch({ type: ACTION_TYPE.SET_ACTIVE_TAB, payload }),
    [dispatch],
  );

  const addTab = useCallback(
    (payload: null) => dispatch({ type: ACTION_TYPE.ADD_TAB, payload }),
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
    (payload: { data: any; index: number }) =>
      dispatch({ type: ACTION_TYPE.SET_RESPONSE, payload }),
    [dispatch],
  );

  const setSchemasObj = useCallback(
    (payload: Record<string, any>) =>
      dispatch({ type: ACTION_TYPE.SET_SCHEMAS_OBJ, payload }),
    [dispatch],
  );
  const setActsObj = useCallback(
    (payload: Record<string, any>) =>
      dispatch({ type: ACTION_TYPE.SET_ACTS_OBJ, payload }),
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
      setActsObj,
      setSchemasObj,
      setActiveTab,
      addTab,
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
