/** @jsx h */
import { Fragment, h } from "https://esm.sh/preact@10.5.15";
import { useEffect, useState } from "https://esm.sh/preact@10.5.15/hooks";
import { E2E } from "./E2E.tsx";
import { History } from "./History.tsx";
import { Main } from "./Main.tsx";
import { useLesan } from "./ManagedLesanContext.tsx";
import Modal from "./Modal.tsx";
import { Setting } from "./Setting.tsx";
import useModal from "./useModal.tsx";

const getSchemasAPI = ({ baseUrl }: { baseUrl: string }) =>
  fetch(`${baseUrl}static/get/schemas`).then((res) => res.json());

enum MODAL_TYPES {
  HISTORY = "HISTORY",
  GRAPH = "GRAPH",
  SETTING = "SETTING",
  E2E_TEST = "E2E_TEST",
}

export const Page = () => {
  const { isOpen, toggleModal } = useModal();

  const {
    tabsData,
    activeTab,
    actsObj,
    addTab,
    setActiveTab,
    setService,
    setMethod,
    setSchema,
    setAct,
    setPostFields,
    setGetFields,
    setFormData,
    setHistory,
    setResponse,
    resetGetFields,
    resetPostFields,
    setSchemasObj,
    setActsObj,
  } = useLesan();

  const [active, setActive] = useState("");

  const [urlAddress, setUrlAddress] = useState(
    window && window.location ? window.location.href : "http://localhost:1366"
  );

  useEffect(() => {
    const localHistory = localStorage.getItem("localHistory");
    if (localHistory) setHistory(JSON.parse(localHistory));
  }, []);

  const configUrl = (address?: string) => {
    address && setUrlAddress(address);

    setService({ data: "", index: activeTab });
    setMethod({ data: "", index: activeTab });
    setSchema({ data: "", index: activeTab });
    resetGetFields(activeTab);
    resetPostFields(activeTab);
    setFormData({ data: {}, index: activeTab });

    getSchemasAPI({ baseUrl: address ? address : urlAddress }).then(
      ({ schemas, acts }) => {
        setActsObj(acts);
        setSchemasObj(schemas);
      }
    );
  };

  const setFormFromHistory = (request: any) => {
    setService({ data: request.body.service, index: activeTab });
    setMethod({ data: request.body.contents, index: activeTab });
    setSchema({ data: request.body.wants.model, index: activeTab });
    setAct({ data: request.body.wants.act, index: activeTab });

    const actObj = (actsObj as any)[request.body.service][
      request.body.contents
    ][request.body.wants.model][request.body.wants.act]["validator"]["schema"];

    setGetFields({ data: actObj["get"]["schema"], index: activeTab });
    setPostFields({ data: actObj["set"]["schema"], index: activeTab });

    setResponse({ data: null, index: activeTab });
    const generateFormData = (
      formData: Record<string, any>,
      returnFormData: Record<string, any>,
      keyname: string
    ) => {
      for (const key in formData) {
        typeof formData[key] === "object"
          ? generateFormData(
              formData[key],
              returnFormData,
              keyname ? `${keyname}.${key}` : key
            )
          : (returnFormData[`${keyname}.${key}`] = formData[key]);
      }
      return returnFormData;
    };

    const historyFromData = generateFormData(request.body.details, {}, "");

    setFormData({ data: historyFromData, index: activeTab });

    toggleModal();
  };

  useEffect(() => {
    configUrl(window.location.href);
  }, []);

  const modalBtnClickHandler = (type: MODAL_TYPES) => {
    setActive(type);
    toggleModal();
  };

  return (
    <div className="cnt">
      {tabsData.map((tab, index) => (
        <Fragment>
          <div
            onClick={() => {
              setActiveTab(index);
            }}
          >
            Tab {index}
          </div>
          <span
            onClick={() => {
              addTab(null);
            }}
          >
            +
          </span>
        </Fragment>
      ))}
      <Main />

      <div className="sidebar__btns-wrapper">
        <button
          className="btn btn-modal"
          onClick={() => modalBtnClickHandler(MODAL_TYPES.HISTORY)}
        >
          History
        </button>
        <button
          className="btn btn-modal btn-modal--2"
          onClick={() => modalBtnClickHandler(MODAL_TYPES.SETTING)}
        >
          Setting
        </button>
        <button
          className="btn btn-modal btn-modal--3"
          onClick={() => modalBtnClickHandler(MODAL_TYPES.GRAPH)}
        >
          Graph
        </button>
        <button
          className="btn btn-modal btn-modal--4"
          onClick={() => modalBtnClickHandler(MODAL_TYPES.E2E_TEST)}
        >
          E2E Test
        </button>
      </div>

      {isOpen && (
        <Modal toggle={toggleModal} title={active}>
          {active === MODAL_TYPES.HISTORY ? (
            <History setFormFromHistory={setFormFromHistory} />
          ) : active === MODAL_TYPES.SETTING ? (
            <Setting configUrl={configUrl} />
          ) : active === MODAL_TYPES.E2E_TEST ? (
            <E2E configUrl={configUrl} />
          ) : (
            <Fragment></Fragment>
          )}
        </Modal>
      )}
    </div>
  );
};
