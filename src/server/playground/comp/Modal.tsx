/** @jsx h */
import { h } from "../reactDeps.ts";

interface ModalType {
  children?: h.JSX.Element;
  toggle: () => void;
  title: string;
}

const Modal = (props: ModalType) => (
  <div className="modal-overlay" onClick={props.toggle}>
    <div
      className="modal-box"
      onClick={(e) =>
        e.stopPropagation()}
    >
      <span className="modal-title">{props.title}</span>
      <div className="modal-content">{props.children}</div>
    </div>
  </div>
);

export default Modal;
