import { uid } from "../../utils/uid.ts";
import { IState } from "./actionType.ts";

const tabInitial = {
  tabsData: [
    {
      service: "",
      schema: "",
      act: "",
      postFields: {},
      getFields: {},
      formData: {},
      response: null,
    },
  ],
  activeTab: 0,
  setActiveTab: () => ({}),
  addTab: () => ({}),
  closeTab: () => ({}),
  setTabsData: () => ({}),
};

const schemaInitial = {
  schemasObj: {},
  actsObj: {},

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
  setResponse: () => ({}),
};

const historyInitial = {
  history: [],

  deleteItemHistory: () => ({}),

  setHistory: () => ({}),
};

const headerInitial = {
  headers: { Authorization: "" },
  setHeader: () => ({}),
};

export const e2eFirstInp = () => ({
  id: uid(),
  bodyHeaders: `
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": ""
  },
  "body": {
    "service": "main",
    "contents": "dynamic",
    "model": "",
    "act": "",
    "details": {
      "get": {
      },
    "set": {
    }
  }
}
}
            `,
  repeat: 1,
  captures: [],
});

const e2eInitial = {
  e2eForms: [e2eFirstInp()],

  setE2eForms: () => ({}),
  addE2eForm: () => ({}),
};

const modalInitial = {
  modal: null,
  setModal: () => ({}),
};

// TODO: Have to Find Someway to Prevent from Rewriting Function Types
export const initialState: IState = {
  ...tabInitial,
  ...schemaInitial,
  ...historyInitial,
  ...headerInitial,
  ...e2eInitial,
  ...modalInitial,
};
