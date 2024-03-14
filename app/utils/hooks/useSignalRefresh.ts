import { useEffect, useMemo, useState } from "react";
import { useMemoCall } from "./useMemoCall";
import { useForkRef } from "@mui/material";

export const useSignalRefresh = <FN extends () => any>(callback: FN) => {
  const [res, setInc] = useState<Awaited<ReturnType<FN>> | undefined>(
    undefined
  );
  // const ret: ReturnType<FN> = useMemo(callback, [inc]);

  const signal = useMemoCall(() => {
    callback().then((r) => {
      setInc(r);
    });
  });
  useEffect(signal, []);
  return [res, signal] as const;
};
