import { useMemo, useState } from "react";
import { useMemoCall } from "./useMemoCall";

export const useSignalRefresh = <FN extends () => any>(callback: FN) => {
  const [inc, setInc] = useState(0);
  const ret: ReturnType<FN> = useMemo(callback, [inc]);
  const signal = useMemoCall(() => {
    setInc(inc + 1);
  });
  return [ret, signal] as const;
};
