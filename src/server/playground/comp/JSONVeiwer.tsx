/** @jsx h */
import {
  Fragment,
  FunctionalComponent,
  h,
} from "https://esm.sh/preact@10.5.15";
import { cutify } from "./cutify.ts";
import * as styles from "./styles.ts";

interface JSONViewerProps {
  jsonData: any;
}

export const JSONViewer: FunctionalComponent<JSONViewerProps> = ({
  jsonData,
}) => {
  const cutifiedJson = cutify(jsonData);
  return (
    <Fragment>
      <pre
        style={styles.pre}
        dangerouslySetInnerHTML={{ __html: cutifiedJson }}
      />
    </Fragment>
  );
};
