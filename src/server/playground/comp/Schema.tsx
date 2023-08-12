/** @jsx h */
import { h, useState } from "../reactDeps.ts";
import { useLesan } from "./ManagedLesanContext.tsx";
import DownIcon from "./icon/DownIcon.tsx";
import Search from "./icon/Search.tsx";

export const Schema = () => {
  const [isShow, setIsShow] = useState<string>("");
  const [isShowInside, setIsShowInside] = useState<string>("");

  const { schemasObj } = useLesan();

  const proceedChildSchema = (childSchema: Record<string, any>) => {
    return Object.keys(childSchema).map((childItem: any) => (
      <div className="inside-schema">
        <div className="inside" onClick={() => setIsShowInside(childItem)}>
          <p>
            field name :
            <span>
              {childItem} : {childSchema[childItem]["type"]}
            </span>
          </p>
          <DownIcon />
        </div>
        {childSchema[childItem].type === "object" &&
          proceedChildSchema(childSchema[childItem].schema)}
      </div>
    ));
  };

  const proceedSchemas = (schemas: Record<string, any>) => {
    return Object.keys(schemas).map((schema: any) => (
      <div className="schema">
        <div className="schema-name" onClick={() => setIsShow(schema)}>
          <p>
            Schema name : <span>{schema}</span>
          </p>
          <DownIcon />
        </div>
        {proceedChildSchema(schemasObj[schema]["pure"])}
      </div>
    ));
  };

  return (
    <div className="schema-modal">
      <div className="search-box">
        <input className="search-input" type="text" placeholder="search..." />
        <span className="search-icon">
          <Search />
        </span>
      </div>
      <div className="schema-list">{proceedSchemas(schemasObj)}</div>
    </div>
  );
};
