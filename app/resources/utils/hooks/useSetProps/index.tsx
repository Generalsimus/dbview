import { useRef, useState } from "react"
import { SetPropsRes, createSetPropController } from "./create-set-prop-controller"
// import { createValidationController } from "./create-set-prop-controller"

export const useSetProps = <S extends any>(initialValue: S | (() => S)) => {
    const controllerRef = useRef<SetPropsRes<S> | undefined>()
    const [state, setState] = useState(initialValue)

    // console.log("START_useSetProps")
    return controllerRef.current = createSetPropController(state, setState, "DS", controllerRef.current);
}


