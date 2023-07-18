/** @jsx h */
import { useEffect, EffectCallback, useRef } from "../../reactDeps.ts";

type useNonInitialEffectReturn = void | (() => void | undefined);

export const useNonInitialEffect = (
  effect: EffectCallback,
  deps?: any
): useNonInitialEffectReturn => {
  const initialRender = useRef(true);

  useEffect(() => {
    let effectReturns: any = () => {
      /* Empty Return fallback */
    };

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effectReturns = effect();
    }

    if (effectReturns && typeof effectReturns === "function") {
      return effectReturns;
    }
  }, deps);
};
