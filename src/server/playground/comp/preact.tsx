/** @jsx h */
import { Fragment, h, useEffect, useState } from "../reactDeps.ts";
import { signal, batch } from "../reactDeps.ts";
import { createNestedObjectsFromKeys } from "../utils/createNestedObjectsFromKeys.ts";
import { generateFormData } from "../utils/generateFormData.ts";
import { MODAL_TYPES } from "./context/actionType.ts";
import DocumentIcon from "./icon/DocumentIcon.tsx";
import HistoryIcon from "./icon/HistoryIcon.tsx";
import ReFetchIcon from "./icon/ReFetchIcon.tsx";
import SchemaIcon from "./icon/SchemaIcon.tsx";
import SettingIcon from "./icon/SettingIcon.tsx";
import TestIcon from "./icon/TestIcon.tsx";
import { Main } from "./Main.tsx";
import { useLesan } from "./ManagedLesanContext.tsx";
import Modal from "./Modal.tsx";
import { useOutsideClick } from "./hooks/useOutsideClick.ts";

const getSchemasAPI = ({ baseUrl }: { baseUrl: string }) =>
  fetch(`${baseUrl}playground/static/get/schemas`).then((res) => res.json());

// Create signals for global state
const showSignal = signal("");
const mediaShowSignal = signal(false);
const urlAddressSignal = signal("");

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

  const [modalContent, setModalContent] = useState<h.JSX.Element | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const parsedWindowUrl = () => {
    return window && window.location
      ? `${new URL(window.location.href).origin}/`
      : "http://localhost:1366/";
  };

  const handleClickOutside = () => {
    mediaShowSignal.value = false;
  };
  const ref: any = useOutsideClick(handleClickOutside);

  useEffect(() => {
    configUrl(parsedWindowUrl());

    const localHistory = JSON.parse(localStorage.getItem("localHistory")!);
    if (localHistory) setHistory(localHistory);
  }, []);

  const configUrl = (address?: string) => {
    if (address) {
      urlAddressSignal.value = address;
    }

    batch(() => {
      setService({ data: "", index: activeTab });
      setSchema({ data: "", index: activeTab });
      resetGetFields(activeTab);
      resetPostFields(activeTab);
      setFormData({ data: {}, index: activeTab });
    });

    getSchemasAPI({ baseUrl: address ? address : urlAddressSignal.value }).then(
      ({ schemas, acts }) => {
        batch(() => {
          setActsObj(acts);
          setSchemasObj(schemas);
        });

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
    batch(() => {
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
    });

    toggleModal();
  };

  // Load modal content dynamically - with stable dependencies
  useEffect(() => {
    // If no modal, return early
    if (!modal) {
      setModalContent(null);
      setIsLoading(false);
      return;
    }

    // Store current modal to compare in cleanup function
    const currentModal = modal;

    // Set loading state
    setIsLoading(true);
    let isMounted = true;

    // Use setTimeout to prevent browser from hanging
    const timeoutId = setTimeout(async () => {
      try {
        // Skip loading if component unmounted or modal changed
        if (!isMounted || currentModal !== modal) return;

        // Load content just once
        let content: h.JSX.Element | null = null;

        switch (currentModal) {
          case MODAL_TYPES.HISTORY:
            const { History } = await import("./History.tsx");
            content = <History setFormFromHistory={setFormFromHistory} />;
            break;
          case MODAL_TYPES.SETTING:
            const { Setting } = await import("./Setting.tsx");
            content = <Setting configUrl={configUrl} />;
            break;
          case MODAL_TYPES.E2E_TEST:
            const { E2E } = await import("./E2E.tsx");
            content = <E2E baseUrl={urlAddressSignal.value} />;
            break;
          case MODAL_TYPES.SCHEMA:
            const { Schema } = await import("./Schema.tsx");
            content = <Schema />;
            break;
          case MODAL_TYPES.ACT:
            const { Act } = await import("./Act.tsx");
            content = <Act />;
            break;
        }

        // Only update state if component is still mounted and modal hasn't changed
        if (isMounted && currentModal === modal) {
          setModalContent(content);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error loading modal content:", error);
        if (isMounted && currentModal === modal) {
          setModalContent(<div>Error loading content</div>);
          setIsLoading(false);
        }
      }
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [modal]); // Only depend on modal type

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
              {" "}
              <span
                title={
                  tabsData[index].act
                    ? `${tabsData[index].schema} | ${tabsData[index].act}`
                    : tabsData[index].schema
                    ? `${tabsData[index].service} | ${tabsData[index].schema}`
                    : tabsData[index].service
                    ? tabsData[index].service
                    : `Tab ${index}`
                }
              >
                {" "}
                {tabsData[index].act
                  ? `${tabsData[index].schema} | ${tabsData[index].act}`
                  : tabsData[index].schema
                  ? `${tabsData[index].service} | ${tabsData[index].schema}`
                  : tabsData[index].service
                  ? tabsData[index].service
                  : `Tab ${index}`}
              </span>
              <span
                className={` tab-close ${
                  activeTab === index ? "active-tab-close" : ""
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  closeTab(index);
                }}
                title="Close tab"
              >
                x
              </span>
            </div>
          </Fragment>
        ))}
        <span
          className="add-tab"
          title="Open a new tab"
          onClick={() => {
            addTab(null);
            localStorage.setItem("localTabsData", JSON.stringify(tabsData));
          }}
        >
          +
        </span>
      </div>
      <Main urlAddress={urlAddressSignal.value} />

      {/* under 768px heigh button */}
      <button
        ref={ref}
        className="media--main-btn-wrapper "
        onClick={() => {
          mediaShowSignal.value = !mediaShowSignal.value;
        }}
      >
        menu
      </button>
      {/*  */}

      <div
        className="main-btn-wrapper"
        data-show={mediaShowSignal.value === true}
      >
        <span className="btn btn-modal " onClick={() => configUrl()}>
          <span className="btn-modal-title">Refetch</span>
          <ReFetchIcon />
        </span>
        <span
          className="btn btn-modal "
          onClick={() => setModal(MODAL_TYPES.SETTING)}
        >
          <span className="btn-modal-title">Setting</span>
          <SettingIcon />
        </span>
        <span
          className="btn btn-modal"
          onClick={() => setModal(MODAL_TYPES.HISTORY)}
        >
          <span className="btn-modal-title">History</span>
          <HistoryIcon />
        </span>
        <span
          className="btn btn-modal"
          onClick={() => setModal(MODAL_TYPES.E2E_TEST)}
        >
          <span className="btn-modal-title">E2E Test</span>
          <TestIcon />
        </span>
        <span
          className="  btn-modal-document"
          data-show={showSignal.value === "document"}
        >
          <span
            className="btn-modal-document--title"
            data-show={showSignal.value === "document"}
          >
            Document
          </span>
        </span>
        <span
          className="btn btn-modal btn-doc"
          onClick={() => setModal(MODAL_TYPES.SCHEMA)}
          onMouseEnter={() => (showSignal.value = "document")}
          onMouseLeave={() => (showSignal.value = "")}
        >
          <span className="btn-modal-title">Schema</span>
          <SchemaIcon />
        </span>
        <span
          className="btn btn-modal btn-doc "
          onClick={() => setModal(MODAL_TYPES.ACT)}
          onMouseEnter={() => (showSignal.value = "document")}
          onMouseLeave={() => (showSignal.value = "")}
        >
          <span className="btn-modal-title">Act</span>
          <DocumentIcon />
        </span>
      </div>

      {modal !== null && (
        <Modal toggle={toggleModal} title={modal}>
          {isLoading ? (
            <div className="modal-loading">Loading...</div>
          ) : (
            modalContent
          )}
        </Modal>
      )}
    </div>
  );
};
