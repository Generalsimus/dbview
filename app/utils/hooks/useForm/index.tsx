import { useRef, useState } from "react"
import { SetPropsRes, createSetPropController } from "./create-form-controller"
import { createValidationController } from "./create-validation-controller"

export const useForm = <S extends any>(initialValue: S | (() => S)) => {
    const controllerRef = useRef<SetPropsRes<S> | undefined>()
    const [state, setState] = useState(initialValue)

    return controllerRef.current = createSetPropController(state, setState, controllerRef.current);
}