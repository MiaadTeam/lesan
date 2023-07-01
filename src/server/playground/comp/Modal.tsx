/** @jsx h */
import { h } from "https://esm.sh/preact@10.5.15";
import { Fragment } from "https://esm.sh/preact@10.5.15";

interface ModalType {
  children?: any;
  toggle: () => void;
  title: string
}

export default function Modal(props: ModalType) {
  return (
    <div className="modal-overlay" onClick={props.toggle}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <span className="modal-title">{props.title}</span>
        <div className="modal-content">{props.children}</div>
      </div>
    </div>
  );
}
