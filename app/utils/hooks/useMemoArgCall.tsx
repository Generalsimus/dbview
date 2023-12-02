import { useEffect, useMemo } from "react";
import { useMemoCall } from "./useMemoCall";
import { isEqual } from "lodash";

type OmitFirstParams<FN extends (...args: any[]) => any, Params extends any[]> = Parameters<FN> extends [...Params, ...infer ARGS2] ? ARGS2 : never


export const useMemoArgCall = <
    FN extends (...args: any[]) => any,
    ARGS1 extends any[],
>(
    callBackFn: FN
) => {
    const refArgMap = useMemo(() => new Map<ARGS1, <ArgsMap extends ARGS1>(...args2: OmitFirstParams<FN, ArgsMap>) => ReturnType<FN>>(), [])

    const callFn = useMemoCall(callBackFn);

    return <ARGS2 extends ARGS1>(...args1: ARGS2): (...args2: OmitFirstParams<FN, ARGS2>) => ReturnType<FN> => {


        for (const [argsKey, value] of refArgMap) {
            if (isEqual(argsKey, args1)) {
                return value
            }
        }
        const callFnForMap = <A extends ARGS1>(...args2: OmitFirstParams<FN, A>): ReturnType<FN> => {
            return callFn(...args1, ...args2);
        };

        refArgMap.set(args1, callFnForMap);
        return callFnForMap;
    }
}


