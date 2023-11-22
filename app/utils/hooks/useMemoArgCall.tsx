import { useEffect, useMemo } from "react";
import { useMemoCall } from "./useMemoCall";
import { isEqual } from "lodash";

export const useMemoArgCall = <FN extends ((...args: any[]) => any)>(callBackFn: FN): (...args: Parameters<FN>) => () => ReturnType<FN> => {
    const refArgMap = useMemo(() => new Map<Parameters<FN>, () => ReturnType<FN>>(), [])


    const callFn = useMemoCall(callBackFn);

    return (...args) => {
        for (const [argsKey, value] of refArgMap) {
            if (isEqual(argsKey, args)) {
                return value
            }
        }
        const callFnForMap = (): ReturnType<FN> => {
            return callFn(...args);
        };
        refArgMap.set(args, callFnForMap);
        return callFnForMap;
    }
}