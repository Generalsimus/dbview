import { useRef } from "react";

export const useMemoCall = <FN extends ((...args: any[]) => any)>(value: FN): FN => {
    const callSaveRef = useRef<FN>(value);
    callSaveRef.current = value;
    return useRef((...args: Parameters<FN>): ReturnType<FN> => {
        return callSaveRef.current(...args);
    }).current as FN
}
