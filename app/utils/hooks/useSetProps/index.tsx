import { CreateObjectWithValue, GetObjectNestedValue, JoiSchemaValue } from "@/basic/generics"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import { useMemoCall } from "../useMemoCall"
import { AnySchema, ValidationResult } from "joi"
import { validate } from "@/utils"
import { NewRefCacheType, createSetPropController } from "./create-set-prop-controller"



export const useInitialSetProps = <S extends any>(
    staveValue: S,
    setValue: Dispatch<SetStateAction<S>>,
) => {
    const refCache = useRef<NewRefCacheType<S>>({
        cache: undefined,
        childRefCache: {}
    }).current;
    const controller = refCache.cache ||= createSetPropController(staveValue, setValue, refCache);
    controller.value = staveValue;
    return controller;
}




export const useChangeSetProps = <S extends any>(
    staveValue: S,
    onChange: (newValue: S) => void,
) => {
    const setValue: Dispatch<SetStateAction<S>> = useMemoCall((newValue) => {
        onChange(newValue instanceof Function ? newValue(staveValue) : newValue)
    })

    return useInitialSetProps(staveValue, setValue)
}




export const useSetProps = <S extends any>(initialValue: S | (() => S)) => {
    return useInitialSetProps(...useState(initialValue))
}

