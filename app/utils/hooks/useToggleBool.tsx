import { SetStateAction, useCallback, useRef, useState } from "react";

export const useToggleBool = (initialValue: boolean) => {
    const [value, setValue] = useState(initialValue);
    const callSaveRef = useRef<Record<string, () => void>>({});


    return [value, useCallback((neValue?: SetStateAction<boolean>) => {
        return (callSaveRef.current[neValue + ""] ||= () => {
            if (neValue == undefined) {
                setValue(e => !e);
            } else {
                setValue(neValue);
            }
        });
    }, []), setValue] as const;
}
