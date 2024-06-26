import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";
import { ToastData } from "./types";
import { reducer, ToastAction } from "./reducer";

export const ToastContext = createContext<{
  toasts: ToastData[];
  dispatch: Dispatch<ToastAction>;
}>({
  toasts: [],
  dispatch: () => {},
});

export const ToastContextProvider = ({ children }: PropsWithChildren) => {
  const [toasts, toastsDispatch] = useReducer<typeof reducer>(reducer, []);

  return (
    <ToastContext.Provider value={{ toasts: toasts, dispatch: toastsDispatch }}>
      {children}
    </ToastContext.Provider>
  );
};
