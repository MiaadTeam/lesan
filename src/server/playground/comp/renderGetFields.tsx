/** @jsx h */
import { h, useState } from "../reactDeps.ts";
import { useLesan } from "./ManagedLesanContext.tsx";
import ChevronDownIcon from "./icon/ChevronDownIcon.tsx";

export default function renderGetFields({
  getField,
  keyName,
  margin,
}: {
  getField: any;
  keyName: string;
  margin: number;
}) {
  const [show, setShow] = useState(false);

  const { activeTab, tabsData, setFormData } = useLesan();

  return (
    <div
      style={{ marginLeft: `${margin + 1}px` }}
      className="sidebar__section_container"
      key={`${activeTab}.${keyName}`}
    >
      <div
        className="sidebar__section-heading--subfields sidebar__section-heading--subfields--new"
        onClick={() => {
          setShow(!show);
          console.log(show);
        }}
      >
        <span style={{ overflowWrap: "anywhere", padding: "7px 0" }}>
          {keyName}
        </span>
        <ChevronDownIcon className="chevron-down" data-rotate={show} />
      </div>

      {show && (
        <div
          className="ss"
          style={{ borderTop: "1px solid slategray", padding: "10px 0 0 0" }}
        >
          {Object.keys(getField["schema"]).map((item, index) =>
            getField["schema"][item].type === "enums" ? (
              <div
                className="input-cnt get-items"
                key={`${activeTab}.${item}-${index}`}
              >
                <label htmlFor={item}>
                  <span style={{ overflowWrap: "anywhere" }}>
                    {keyName}.{item}:
                  </span>
                </label>
                <div className="get-values">
                  <span
                    onClick={() => {
                      const copy = { ...tabsData[activeTab].formData };
                      delete copy[`get.${keyName}.${item}`];
                      setFormData({ data: copy, index: activeTab });
                    }}
                  ></span>
                  <span
                    className={
                      tabsData[activeTab].formData[`get.${keyName}.${item}`] ===
                      0
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      setFormData({
                        index: activeTab,
                        data: {
                          ...tabsData[activeTab].formData,
                          [`get.${keyName}.${item}`]: 0,
                        },
                      });
                    }}
                  >
                    0
                  </span>
                  <span
                    className={
                      tabsData[activeTab].formData[`get.${keyName}.${item}`] ===
                      1
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      setFormData({
                        data: {
                          ...tabsData[activeTab].formData,
                          [`get.${keyName}.${item}`]: 1,
                        },
                        index: activeTab,
                      });
                    }}
                  >
                    1
                  </span>
                </div>
              </div>
            ) : (
              renderGetFields({
                getField: getField["schema"][item],
                keyName: `${keyName}.${item}`,
                margin: margin + 1,
              })
            )
          )}
        </div>
      )}
    </div>
  );
}
