/** @jsx h */
import { h, useState } from "../reactDeps.ts";
import FullScreenExit from "./icon/Fullscreen-exit.tsx";
import FullScreen from "./icon/Fullscreen.tsx";
import DeleteIcon from "./icon/deleteIcon.tsx";

interface ModalType {
  children?: h.JSX.Element;
  toggle: () => void;
  title: string;
}

const Modal = (props: ModalType) => {
  const [toggleFullScreen, setToggleFullScreen] = useState<boolean>(false);
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
        <div className="modal-content">{props.children}</div>
      </div>
    </div>
  );
};
export default Modal;
