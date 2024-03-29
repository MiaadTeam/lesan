/** @jsx h */
import { h } from "../../reactDeps.ts";

export default function Up2Icon() {
  return (
    <svg
      width={25}
      height={25}
      fill="#000000"
      viewBox="0 0 24 24"
      id="up-direction"
      data-name="Line Color"
      xmlns="http://www.w3.org/2000/svg"
      class="icon line-color"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          id="secondary"
          d="M10,9.66V20a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V9.66"
          style="fill: none; stroke: darkred; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"
        ></path>
        <path
          id="primary"
          d="M14,9.66l3.4,2.92,2.6-3-7.35-6.3a1,1,0,0,0-1.3,0L4,9.54l2.6,3L10,9.66"
          style="fill: none; stroke: darkred; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"
        ></path>
      </g>
    </svg>
  );
}
