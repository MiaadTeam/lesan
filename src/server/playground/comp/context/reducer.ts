import { ACTION_TYPE, IState, TAction } from "./actionType.ts";

export function lesanReducer(state: IState, action: TAction): IState {
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

    case ACTION_TYPE.SET_TABS_DATA: {
      return {
        ...state,
        tabsData: payload,
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
        tabsData: [
          ...state.tabsData,
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
        activeTab: state.tabsData.length,
      };
    }
    case ACTION_TYPE.SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: payload,
      };
    }
    case ACTION_TYPE.CLOSE_TAB: {
      const copyTabsData = [...state.tabsData];
      copyTabsData.length > 1 && copyTabsData.splice(payload, 1);
      return {
        ...state,
        tabsData: [...copyTabsData],
        activeTab: copyTabsData.length >= 1 &&
            state.activeTab >= payload &&
            state.activeTab !== 0
          ? state.activeTab - 1
          : state.activeTab,
      };
    }

    case ACTION_TYPE.DELETE_ITEM_HISTORY: {
      return {
        ...state,
        history: state.history
          .slice(0, payload)
          .concat(state.history.slice(payload + 1)),
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
    case ACTION_TYPE.SET_E2E_FORMS: {
      return {
        ...state,
        e2eForms: payload,
      };
    }
    case ACTION_TYPE.ADD_E2E_FORM: {
      return {
        ...state,
        e2eForms: [...state.e2eForms, payload],
      };
    }
    case ACTION_TYPE.OPEN_MODAL: {
      return {
        ...state,
        modal: payload,
      };
    }
    default:
      throw new Error(`Unhandled action type`);
  }
}
