import { CreateObjectWithValue, GetObjectNestedValue } from "@/basic/generics"
import { validate } from "@/utils"
import Joi, { AnySchema, ValidationResult } from "joi"
import { Dispatch, SetStateAction } from "react"
import { IndexedDBController } from "../../indexedDb"

// interface State {
//   //   validation;
//   getError: (...path: strin[]) => void;
// }
export interface SetPropsRes<S> {
    value: S
    setValue: (newValueOrAction: SetStateAction<S>) => S,
    // setDefault: (defaultValue: SetStateAction<S>) => void

    getValidation: (schema: AnySchema<S>) => {
        getIfValid: (viewErrors?: boolean) => undefined | S,
        getError: <InitialKeys extends PropertyKey[]>(...path: InitialKeys) => string | undefined,
    },
    connectIndexDb: () => void
    // getError: <InitialKeys extends PropertyKey[]>(...path: InitialKeys) => string | undefined,
    setProps: <SetPropKeys extends Parameters<SetPropsRes<S>["getPropState"]>>(...setPropKeys: SetPropKeys) => (newValue: SetStateAction<GetObjectNestedValue<S, SetPropKeys>>) => void
    initSetProps: <InitialKeys extends PropertyKey[]>(
        ...initialValueKeys: InitialKeys
    ) => <SetPropKeys extends Parameters<SetPropsRes<S>["getPropState"]>>(
        ...setPropKeys: SetPropKeys
    ) => (insiderObj: CreateObjectWithValue<InitialKeys, SetStateAction<GetObjectNestedValue<S, SetPropKeys>>>) => void
    getPropState: <KEYS extends PropKeysGeneric<S>>(...propertyKeys: KEYS) => SetPropsRes<GetObjectNestedValue<S, KEYS>>
    // getPropState: <K extends keyof S>(propertyKey: K, ...propertyKeys: PropKeysGeneric<S[K]>) => SetPropsRes<GetObjectNestedValue<S, [K, ...PropKeysGeneric<S[K]>]>>;
    // getPropState: <P extends keyof S, ChildKeys extends any[]>(propertyKeysL: P, ...propertyKeys: ChildKeys) => SetPropsRes<GetObjectNestedValue<S, [P, ...ChildKeys]>>;
    // getPropState: <K extends keyof S>(propertyKey: K, ...propertyKeys: PropKeysGeneric<S[K]>) => SetPropsRes<GetObjectNestedValue<S, [K, ...PropKeysGeneric<S[K]>]>>
    // getPropState: <KEYS extends PropKeysGeneric<S>, PropKey extends keyof S>(...propertyKeys: KEYS) => SetPropsRes<GetObjectNestedValue<S, PropertyKey>>
}
// ;
// type PropKeysGeneric<O extends any> = O extends Record<any, any> ? readonly {}: never[]
type PropKeysGeneric<O extends any> = O extends object ? ({ [K in keyof O]: [K, ...PropKeysGeneric<O[K]>] | [K] | [] }[keyof O]) : any[]

// type ss<S, P extends keyof S> = Parameters<GetPropStateType<S[P]>>
// interface GetPropStateTypeadsadas<S, P extends keyof S> extends Parameters<GetPropStateTypeadsadas<S, P>> {

// }
// interface CIrcl<S, P extends keyof S, ChildKeys = CIrcl<S[P], keyof S[P]> | []> {

// }

// type GetPropStateType<S> = <P extends keyof S, ChildKeys extends Parameters<GetPropStateType<S[P]>> | []> (propertyKeysL: P, ...propertyKeys: ChildKeys) => SetPropsRes<GetObjectNestedValue<S, [P, ...ChildKeys]>>;
// GetObjectNestedValue<S, KEYS>
// [K, ...PropKeysGeneric<O[K]>] | [K] | []
const createErrorGetter = <V, P extends PropertyKey[]>(
    paths: P,
    schema: AnySchema<V>,
) => {

    return () => {
        getError: () => {

        }

    }
}
export const createSetPropController = <S extends any>(
    state: S,
    onChangeState: (newSTate: S) => void,
    prevController?: SetPropsRes<S>,
) => {
    if (prevController) {
        prevController.value = state;
        return prevController;
    }

    const childPropControllers: { [K in keyof S]?: SetPropsRes<S[K]> } = {};

    let validation: ReturnType<SetPropsRes<S>["getValidation"]>
    let needRefreshValidation = false;

    const controller: SetPropsRes<S> = {
        value: state,
        setValue: (newValueOrAction) => {
            let newValue = newValueOrAction instanceof Function ? newValueOrAction(controller.value) : newValueOrAction;

            if (newValue instanceof Array) {
                newValue = [...newValue] as S;
            } else if (typeof newValue === "object") {
                newValue = { ...newValue };
            }
            onChangeState(newValue);
            needRefreshValidation = true;
            return newValue;
        },
        getValidation: (schema) => {
            // validateSchema = schema;
            if (validation) {
                return validation
            }
            const validationState = {
                getError: (...paths) => {
                    return undefined
                },
                getIfValid: (viewErrors = true) => {
                    if (viewErrors) {
                        needRefreshValidation = true;
                        controller.setValue(controller.value);
                    }
                    if (!validationState.getError()) {
                        return controller.value
                    }
                    return undefined
                }
            }
            return validation = validationState;
        },
        setProps(...setPropKeys) {
            return controller.getPropState(...setPropKeys).setValue
        },
        initSetProps(...initialValueKeys) {

            return (...setPropKeys) => {

                return (insiderObj) => {
                    let newValue: any = insiderObj;
                    for (const key of initialValueKeys) {
                        newValue = newValue[key];
                    }


                    controller.setProps(...setPropKeys)(newValue);
                }
            }
        },
        getPropState: (...propertyKeys: any[]): SetPropsRes<any> => {
            if (propertyKeys.length === 0) return controller;

            const [propertyKey, ...childProperties] = propertyKeys;
            const propertyController = createSetPropController(controller.value[propertyKey], (newValue) => {
                controller.value[propertyKey] = newValue;

                controller.setValue(controller.value);

                return newValue
            }, childPropControllers[propertyKey]);

            childPropControllers[propertyKey] = propertyController;

            if (childProperties.length) {
                return propertyController.getPropState(...childProperties)

            }
            return propertyController;
        }
    }


    return controller;
};
