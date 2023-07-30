/** @jsx h */
import { h, useContext } from "../reactDeps.ts";
import { LesanContext, LesanProvider } from "./context/provider.tsx";

const useLesan = () => {
  const context = useContext(LesanContext);
  if (context === undefined) {
    console.warn(`useLesan must be used within a LesanProvider`);
  }
  return context;
};

const ManagedLesanContext = (props: { children: h.JSX.Element }) => {
  const { children } = props;

  return <LesanProvider>{children}</LesanProvider>;
};

export { ManagedLesanContext, useLesan };
