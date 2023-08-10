/** @jsx h */
import { Fragment, h, useEffect, useState } from "../reactDeps.ts";
import { createNestedObjectsFromKeys } from "../utils/createNestedObjectsFromKeys.ts";
import { generateFormData } from "../utils/generateFormData.ts";
import Act from "./Act.tsx";
import { MODAL_TYPES } from "./context/actionType.ts";
import { E2E } from "./E2E.tsx";
import { History } from "./History.tsx";
import DocumentIcon from "./icon/DocumentIcon.tsx";
import HistoryIcon from "./icon/HistoryIcon.tsx";
import ReFetchIcon from "./icon/ReFetchIcon.tsx";
import SchemaIcon from "./icon/SchemaIcon.tsx";
import SettingIcon from "./icon/SettingIcon.tsx";
import TestIcon from "./icon/TestIcon.tsx";
import { Main } from "./Main.tsx";
import { useLesan } from "./ManagedLesanContext.tsx";
import Modal from "./Modal.tsx";
import { Schema } from "./Schema.tsx";
import { Setting } from "./Setting.tsx";

const getSchemasAPI = ({ baseUrl }: { baseUrl: string }) =>
  fetch(`${baseUrl}playground/static/get/schemas`).then((res) => res.json());

export const Page = () => {
  const {
    tabsData,
    setTabsData,
    activeTab,
    actsObj,
    addTab,
    setActiveTab,
    setService,
    setSchema,
    setAct,
    setPostFields,
    setGetFields,
    setFormData,
    setHistory,
    setResponse,
    resetGetFields,
    closeTab,
    resetPostFields,
    setSchemasObj,
    setActsObj,
    setModal,
    modal,
  } = useLesan();

  const parsedWindowUrl = () => {
    return window && window.location
      ? `${new URL(window.location.href).origin}/`
      : "http://localhost:1366/";
  };

  const [urlAddress, setUrlAddress] = useState("");

  useEffect(() => {
    configUrl(parsedWindowUrl());

    const localHistory = JSON.parse(localStorage.getItem("localHistory")!);
    if (localHistory) setHistory(localHistory);
  }, []);

  const configUrl = (address?: string) => {
    address && setUrlAddress(address);

    setService({ data: "", index: activeTab });
    setSchema({ data: "", index: activeTab });
    resetGetFields(activeTab);
    resetPostFields(activeTab);
    setFormData({ data: {}, index: activeTab });

    getSchemasAPI({ baseUrl: address ? address : urlAddress }).then(
      ({ schemas, acts }) => {
        setActsObj(acts);
        setSchemasObj(schemas);

        let localTabsData = localStorage.getItem("localTabsData");

        if (localTabsData) {
          localTabsData = JSON.parse(localTabsData);

          const parsedLocalTabData: any[] = [];

          const proccessTabData = (tab: any) => {
            parsedLocalTabData.pop();

            // form data section --- begin
            const parsedFromData = createNestedObjectsFromKeys(tab.formData);

            // set fileds section --- begin
            for (const setKeys in parsedFromData.set) {
              if (
                acts[tab.service][tab.schema][tab.act].validator.schema.set
                  .schema[setKeys] === undefined
              ) {
                delete parsedFromData.set[setKeys];
              }
            }
            // TODO : we need to check field type also in set fields inside acts[tab.service][tab.schema][tab.act].validator.schema.set.schema[setKeys].type

            // set fileds section --- end

            // get fileds section --- begin
            for (const getKey in parsedFromData.get) {
              if (
                acts[tab.service][tab.schema][tab.act].validator.schema.get
                  .schema[getKey] === undefined
              ) {
                delete parsedFromData.get[getKey];
              }
            }
            // get fileds section --- end

            const newGeneratedFormData = generateFormData(
              parsedFromData,
              {},
              ""
            );
            // form data section --- end

            // set fileds section --- begin
            tab.postFields =
              acts[tab.service][tab.schema][
                tab.act
              ].validator.schema.set.schema;
            // set fileds section --- end

            // get fileds section --- begin
            tab.getFields =
              acts[tab.service][tab.schema][
                tab.act
              ].validator.schema.get.schema;
            // get fileds section --- end

            parsedLocalTabData.push({
              ...tab,
              formData: newGeneratedFormData,
            });
          };

          for (const tab of localTabsData as any) {
            if (tab.service && tab.service in acts) {
              parsedLocalTabData.push(tab);
            }

            if (tab.schema && !(tab.schema in acts[tab.service])) {
              parsedLocalTabData.pop();
            }

            if (tab.act && !(tab.act in acts[tab.service][tab.schema])) {
              parsedLocalTabData.pop();
            }

            if (
              tab.service &&
              tab.schema &&
              tab.act &&
              tab.act in acts[tab.service][tab.schema]
            ) {
              proccessTabData(tab);
            }
          }
          if (parsedLocalTabData.length < 1) {
            parsedLocalTabData.push({
              service: "",
              schema: "",
              act: "",
              postFields: {},
              getFields: {},
              formData: {},
              response: null,
            });
          }
          setTabsData(parsedLocalTabData);
        }
      }
    );
  };

  const toggleModal = () => {
    setModal(null);
  };

  const setFormFromHistory = (request: any) => {
    setService({ data: request.body.service, index: activeTab });
    setSchema({ data: request.body.model, index: activeTab });
    setAct({ data: request.body.act, index: activeTab });

    const actObj = (actsObj as any)[request.body.service][request.body.model][
      request.body.act
    ]["validator"]["schema"];

    setGetFields({ data: actObj["get"]["schema"], index: activeTab });
    setPostFields({ data: actObj["set"]["schema"], index: activeTab });

    setResponse({ data: null, index: activeTab });

    const historyFromData = generateFormData(request.body.details, {}, "");

    setFormData({ data: historyFromData, index: activeTab });

    toggleModal();
  };

  return (
    <div className="cnt">
      <div className="tabs-container" style={{ display: "flex" }}>
        {tabsData.map((tab, index) => (
          <Fragment>
            <div
              className="tab-name"
              data-tab={activeTab === index}
              onClick={() => {
                setActiveTab(index);
              }}
            >
              {tabsData[index].act
                ? `${tabsData[index].schema} | ${tabsData[index].act}`
                : tabsData[index].schema
                ? `${tabsData[index].service} | ${tabsData[index].schema}`
                : tabsData[index].service
                ? tabsData[index].service
                : `Tab ${index}`}
              <span
                className={` tab-close ${
                  activeTab === index ? "active-tab-close" : ""
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  closeTab(index);
                }}
              >
                x
              </span>
            </div>
          </Fragment>
        ))}
        <span
          className="add-tab"
          onClick={() => {
            addTab(null);
            localStorage.setItem("localTabsData", JSON.stringify(tabsData));
          }}
        >
          +
        </span>
      </div>
      <Main urlAddress={urlAddress} />

      <div className="main-btn-wrapper">
        <span
          className="btn btn-modal btn-setting"
          onClick={() => setModal(MODAL_TYPES.SETTING)}
        >
          <span className="btn-modal-title">Setting</span>
          <SettingIcon />
        </span>

        <span
          className="btn btn-modal btn-history"
          onClick={() => setModal(MODAL_TYPES.HISTORY)}
        >
          <span className="btn-modal-title">History</span>
          <HistoryIcon />
        </span>

        <span
          className="btn btn-modal btn-e2e"
          onClick={() => setModal(MODAL_TYPES.E2E_TEST)}
        >
          <span className="btn-modal-title">E2E Test</span>
          <TestIcon />
        </span>

        <span
          className="btn btn-modal btn-graph"
          onClick={() => setModal(MODAL_TYPES.SCHEMA)}
        >
          <span className="btn-modal-title">Schema</span>
          <SchemaIcon />
        </span>

        <span
          className="btn btn-modal btn-doc "
          onClick={() => setModal(MODAL_TYPES.ACT)}
        >
          <span className="btn-modal-title">Act</span>
          <DocumentIcon />
        </span>

        <span className="btn btn-modal btn-refetch" onClick={() => configUrl()}>
          <span className="btn-modal-title">Refetch</span>
          <ReFetchIcon />
        </span>
      </div>

      {modal !== null && (
        <Modal toggle={toggleModal} title={modal}>
          {modal === MODAL_TYPES.HISTORY ? (
            <History setFormFromHistory={setFormFromHistory} />
          ) : modal === MODAL_TYPES.SETTING ? (
            <Setting configUrl={configUrl} />
          ) : modal === MODAL_TYPES.E2E_TEST ? (
            <E2E baseUrl={urlAddress} />
          ) : modal === MODAL_TYPES.SCHEMA ? (
            <Schema />
          ) : modal === MODAL_TYPES.ACT ? (
            <Act />
          ) : (
            <Fragment></Fragment>
          )}
        </Modal>
      )}
    </div>
  );
};
