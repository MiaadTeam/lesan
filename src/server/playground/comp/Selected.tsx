/** @jsx h */
import { h, useState, useEffect } from "../reactDeps.ts";

export function Selected({
  items,
  onClickItem,
  incomeActiveItem,
}: {
  items: string[];
  onClickItem: (item: string) => void;
  incomeActiveItem?: string | null;
}) {
  const [show, setShow] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    setActiveItem(incomeActiveItem || "");
  }, [incomeActiveItem]);

  return (
    <div>
      <div className="select">
        <span className="select--empty" onClick={() => setShow(!show)}>
          {activeItem}
        </span>
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
