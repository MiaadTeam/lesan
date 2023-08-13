/* --------------------------- Action Types Start --------------------------- */
export enum ACTION_TYPE {
  SET_SERVICE = "SET_SELECTED_SERVICE",
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

  SET_TABS_DATA = "SET_TABS_DATA",
  DELETE_ITEM_HISTORY = "DELETE_ITEM_HISTORY",

  SET_ACTS_OBJ = "SET_ACTS_OBJ",
  SET_SCHEMAS_OBJ = "SET_SCHEMAS_OBJ",

  SET_E2E_FORMS = "SET_E2E_FORMS",
  ADD_E2E_FORM = "ADD_E2E_FORM",

  OPEN_MODAL = "OPEN_MODAL",

  SET_ACTIVE_TAB = "SET_ACTIVE_TAB",
  ADD_TAB = "ADD_TAB",
  CLOSE_TAB = "CLOSE_TAB",
}
/* --------------------------- Action Types End --------------------------- */

/* ------------------------- Type Definitions Start ------------------------- */
// A generic Type to handle customized Objects
export interface TObjectArray<T> {
  [key: string]: T;
}

export type TRequest = {
  method: "POST";
  headers: {
    "Content-Type": "application/json";
    [key: string]: any;
  };
  body: string;
};

export type TResponse = {
  body: Record<string, any> | Record<string, any>[];
  success: boolean;
  tookTime: number;
};

export type THistory = {
  request: TRequest;
  reqDate: any;
  response: TResponse;
  id: string;
};

export type TTabsData = {
  service: string;
  schema: string;
  act: string;
  response: TResponse | null;
  postFields: any;
  getFields: any;
  formData: any;
};

export interface E2eForm {
  id: string;
  bodyHeaders: string;
  repeat: number;
  captures: { key: string; value: string }[];
}

export enum MODAL_TYPES {
  HISTORY = "HISTORY",
  ACT = "ACT",
  SETTING = "SETTING",
  E2E_TEST = "E2E TEST",
  SCHEMA = "SCHEMA",
}

// TODO: The any Types have to remove and fix
export interface IState {
  tabsData: TTabsData[];

  setTabsData: (payload: TTabsData[]) => void;
  deleteItemHistory: (payload: number) => void;

  e2eForms: E2eForm[];
  setE2eForms: (payload: E2eForm[]) => void;
  addE2eForm: (payload: E2eForm) => void;

  modal: MODAL_TYPES | null;
  setModal: (payload: MODAL_TYPES | null) => void;

  setService: (payload: { data: string; index: number }) => void;
  setMethod: (payload: { data: string; index: number }) => void;
  setSchema: (payload: { data: string; index: number }) => void;
  setAct: (payload: { data: string; index: number }) => void;
  setPostFields: (payload: { data: string; index: number }) => void;
  setGetFields: (payload: { data: string; index: number }) => void;
  setFormData: (payload: { data: any; index: number }) => void;
  setResponse: (payload: {
    data: TResponse | null;
    index: number | null;
  }) => void;

  resetPostFields: (payload: number) => void;
  resetGetFields: (payload: number) => void;

  activeTab: number;
  setActiveTab: (payload: number) => void;
  addTab: (payload: null) => void;
  closeTab: (payload: number) => void;

  actsObj: Record<string, any>;
  schemasObj: Record<string, any>;
  headers: TObjectArray<string>;
  history: THistory[];
  setSchemasObj: (payload: Record<string, any>) => void;
  setActsObj: (payload: Record<string, any>) => void;
  setHeader: (payload: TObjectArray<string>) => void;
  setHistory: (payload: THistory[] | {}) => void;
}

export type TAction =
  | {
      type: ACTION_TYPE.SET_SERVICE;
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
      type: ACTION_TYPE.SET_TABS_DATA;
      payload: TTabsData[];
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
      type: ACTION_TYPE.CLOSE_TAB;
      payload: number;
    }
  | {
      type: ACTION_TYPE.SET_ACTS_OBJ;
      payload: Record<string, any>;
    }
  | {
      type: ACTION_TYPE.SET_E2E_FORMS;
      payload: E2eForm[];
    }
  | {
      type: ACTION_TYPE.ADD_E2E_FORM;
      payload: E2eForm;
    }
  | {
      type: ACTION_TYPE.OPEN_MODAL;
      payload: MODAL_TYPES | null;
    }
  | {
      type: ACTION_TYPE.DELETE_ITEM_HISTORY;
      payload: number;
    };
/* -------------------------- Type Definitions End -------------------------- */
