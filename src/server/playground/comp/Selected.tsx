/** @jsx h */
import { h, useState, useEffect, Ref } from "../reactDeps.ts";
import { useOutsideClick } from "./hooks/useOutsideClick.ts";
import ChevronDownIcon from "./icon/ChevronDownIcon.tsx";

export function Selected({
  items,
  onClickItem,
  incomeActiveItem,
  canShow,
}: {
  items: string[];
  onClickItem: (item: string) => void;
  incomeActiveItem?: string | null;
  canShow?: boolean;
}) {
  const [show, setShow] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    setActiveItem(incomeActiveItem || "");
  }, [incomeActiveItem]);

  const handleClickOutside = () => {
    setShow(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div>
      <div className="select" disabled={canShow}>
        <div className="select--empty" ref={ref} onClick={() => setShow(!show)}>
          {" "}
          <span>{activeItem}</span>
          <ChevronDownIcon />
        </div>

        {show && (
          <div className="select--sub-buttons" data-show={show}>
            <div
              className="option"
              onClick={() => {
                setActiveItem("");
                onClickItem("");
                setShow(false);
              }}
            ></div>
            {items?.map((item, index) => (
              <div
                className="option"
                onClick={() => {
                  setActiveItem(item);
                  onClickItem(item);
                  setShow(false);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
