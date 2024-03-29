import { useRef } from "react";
import { useMemoCall } from "./useMemoCall";

export const useRunOnceAndWaitToEnd = <ARGS extends any[], FN extends ((...args: ARGS) => any)>(value: FN) => {
    const runCaChe = useRef<{
        process?: ReturnType<FN>
    } | undefined>();

    return useMemoCall((...args: ARGS): ReturnType<FN> | undefined => {
        if (!runCaChe.current) {
            const val = value(...args);
            runCaChe.current = { process: val };
            (async () => {
                await val;
                runCaChe.current = undefined;
            })();
        }

        return runCaChe.current.process;
    })
}