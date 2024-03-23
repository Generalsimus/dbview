import { useEffect, useState } from "react";
import { useMemoCall } from "./useMemoCall";

export const useSignalRefresh = <FN extends () => any>(callback: FN) => {
  const [res, setInc] = useState<Awaited<ReturnType<FN>> | undefined>(
    undefined
  );


  const signal = useMemoCall(() => {
    callback().then((r) => {
      setInc(r);
    });
  });
  useEffect(signal, []);
  return [res, signal] as const;
};
