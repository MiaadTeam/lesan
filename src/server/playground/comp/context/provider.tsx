/** @jsx h */
import { h, useMemo } from "../../reactDeps.ts";
import { createContext } from "../../reactDeps.ts";
import { useCallback } from "../../reactDeps.ts";
import { useReducer } from "../../reactDeps.ts";
import { E2eForm, IState, MODAL_TYPES } from "./actionType.ts";
import { TObjectArray } from "./actionType.ts";
import { THistory } from "./actionType.ts";
import { TTabsData } from "./actionType.ts";
import { ACTION_TYPE } from "./actionType.ts";
import { initialState } from "./initials.ts";
import { lesanReducer } from "./reducer.ts";

export const LesanContext = createContext<IState>(initialState);

export const LesanProvider = (props: any) => {
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

  const closeTab = useCallback(
    (payload: number) => dispatch({ type: ACTION_TYPE.CLOSE_TAB, payload }),
    [dispatch],
  );

  const deleteItemHistory = useCallback(
    (payload: number) =>
      dispatch({ type: ACTION_TYPE.DELETE_ITEM_HISTORY, payload }),
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

  const setTabsData = useCallback(
    (payload: TTabsData[]) =>
      dispatch({ type: ACTION_TYPE.SET_TABS_DATA, payload }),
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

  const setE2eForms = useCallback(
    (payload: E2eForm[]) =>
      dispatch({ type: ACTION_TYPE.SET_E2E_FORMS, payload }),
    [dispatch],
  );

  const addE2eForm = useCallback(
    (payload: E2eForm) => dispatch({ type: ACTION_TYPE.ADD_E2E_FORM, payload }),
    [dispatch],
  );
  const setModal = useCallback(
    (payload: MODAL_TYPES | null) =>
      dispatch({ type: ACTION_TYPE.OPEN_MODAL, payload }),
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
      setTabsData,
      setResponse,
      setActsObj,
      setSchemasObj,
      setActiveTab,
      addTab,
      closeTab,
      deleteItemHistory,
      setE2eForms,
      addE2eForm,
      setModal,
    }),
    [state],
  );

  return <LesanContext.Provider value={value} {...props} />;
};
