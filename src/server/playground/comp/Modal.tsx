/** @jsx h */
import { h, useState, useRef } from "../reactDeps.ts";
import FullScreenExit from "./icon/Fullscreen-exit.tsx";
import FullScreen from "./icon/Fullscreen.tsx";
import Up2Icon from "./icon/Up2Icon.tsx";
import DeleteIcon from "./icon/DeleteIcon.tsx";

interface ModalType {
  children?: h.JSX.Element;
  toggle: () => void;
  title: string;
}

const Modal = (props: ModalType) => {
  const [showBtn, setShowBtn] = useState("myBtn none");
  const [toggleFullScreen, setToggleFullScreen] = useState<boolean>(false);

  const divRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    divRef.current!.scroll;
    document.getElementById("modal")?.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = (event: any) => {
    event.currentTarget.scrollTop > 20
      ? setShowBtn("myBtn")
      : setShowBtn("none");
  };

  return (
    <div className="modal-overlay" onClick={props.toggle}>
      <div
        className={toggleFullScreen ? "modal-box-fullscreen" : "modal-box"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="action-modal">
          <span className="modal-close" onClick={props.toggle}>
            <DeleteIcon />
          </span>
          <span
            className="modal-fullscreen"
            onClick={() => setToggleFullScreen(!toggleFullScreen)}
          >
            {toggleFullScreen ? <FullScreenExit /> : <FullScreen />}
          </span>
          <span className="modal-title">{props.title}</span>
        </div>
        <div
          className="modal-content"
          id="modal"
          ref={divRef}
          onScroll={handleScroll}
        >
          {props.children}
          <div className={showBtn}>
            <button
              className="myBtn-active tooltip"
              onClick={() => scrollToTop()}
            >
              <Up2Icon />
              <span className="tooltip-text">Go To Top</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
