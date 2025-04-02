/** @jsx h */
import { h, useState } from "../reactDeps.ts";
import FullScreenExit from "./icon/Fullscreen-exit.tsx";
import FullScreen from "./icon/Fullscreen.tsx";
import DeleteIcon from "./icon/DeleteIcon.tsx";

interface ModalType {
  children?: h.JSX.Element;
  toggle: () => void;
  title: string;
}

// Optimized Modal component with minimal functionality
const Modal = (props: ModalType) => {
  // Use local state instead of signal to reduce complexity
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="modal-overlay" onClick={props.toggle}>
      <div
        className={isFullscreen ? "modal-box-fullscreen" : "modal-box"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="action-modal">
          <span className="modal-close" onClick={props.toggle}>
            <DeleteIcon />
          </span>
          <span
            className="modal-fullscreen"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <FullScreenExit /> : <FullScreen />}
          </span>
          <span className="modal-title">{props.title}</span>
        </div>
        <div className="modal-content" id="modal">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
