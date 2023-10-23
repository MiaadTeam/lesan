/** @jsx h */
import { h } from "../../reactDeps.ts";

export default function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={25}
      height={25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M12 17V11"
          stroke="#fff"
          //   stroke="#1C274C"
          stroke-width="1.5"
          stroke-linecap="round"
        ></path>{" "}
        <circle
          cx="1"
          cy="1"
          r="1"
          transform="matrix(1 0 0 -1 11 9)"
          //   fill="#1C274C"
          fill="#fff"
        ></circle>{" "}
        <path
          opacity="0.5"
          d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
          //   stroke="#1C274C"
          stroke="#fff"
          stroke-width="1.5"
        ></path>{" "}
      </g>
    </svg>
  );
}
