import { validate } from "@/utils";
import { AnySchema, ValidationResult } from "joi";
import { NewRefCacheType } from "./create-set-prop-controller";
import { JoiSchemaValue } from "@/basic/generics";
import { get, isEqual } from "lodash";


export interface Validator<V> {
    getIfValid: (showError?: boolean) => V | undefined
    getError: (...errorPaths: PropertyKey[]) => ({
        error: true,
        helperText: string | undefined,
    } | {
        error: false,
        helperText: undefined,
    })
}


export type ValidateRefCacheType<T extends any> = {
    cache?: Validator<T>,
    validateResult: ValidationResult,
}


export const createValidationController =
    <schemaType extends AnySchema>(
        stateRefCache: NewRefCacheType<any>,
        schema: schemaType,
        showErrorAfterChange: boolean
    ): Validator<JoiSchemaValue<schemaType>> => {
        const stateValue = stateRefCache.cache?.state;
        let refCache = stateRefCache.validationCache ||= {
            cache: undefined,
            validateResult: validate(stateValue, schema, { abortEarly: false })
        };

        // refCache.prevStateValue = stateValue;
        refCache.validateResult = validate(stateValue, schema, { abortEarly: false });

        if (refCache.cache) {
            return { ...refCache.cache }
        }

        const isKeyChangeEffect: Record<any, boolean> = {};

        return refCache.cache ||= {

            getIfValid(showError = false) {
                const stateController = stateRefCache.cache;
                const stateValue = stateRefCache.cache?.state;
                let validationResult = refCache.validateResult;

                if (validationResult.error) {

                    if (showError) {
                        showErrorAfterChange = false;
                        stateController?.setState((v: any): any => {
                            if (typeof v === "object") {
                                if (v instanceof Array) {
                                    return [...v]
                                } else {
                                    return { ...v }
                                }
                            }
                            return v
                        });

                    }
                } else {
                    return validationResult.value
                }

            },
            getError(...errorPaths) {
                let validationResult = refCache.validateResult;

                if (validationResult?.error) {
                    const key = errorPaths.join("|");
                    if (showErrorAfterChange && !isKeyChangeEffect[key]) {
                        if (isEqual(
                            get(stateValue, errorPaths),
                            get(stateRefCache.cache?.state, errorPaths)
                        )) {

                            return {
                                error: false,
                                helperText: undefined,
                            } as const
                        } else {
                            isKeyChangeEffect[key] = true;
                        }

                    }
                    const { error: { details } } = validationResult;

                    detailsLoop: for (const detail of details) {
                        indexingLoop: for (let index = 0; index < errorPaths.length; index++) {
                            const pathName = errorPaths[index];
                            if (pathName != detail.path[index]) {
                                continue detailsLoop;
                                break indexingLoop;
                            }
                        }

                        return {
                            error: true,
                            helperText: detail.message,
                        } as const
                    }
                }

                return {
                    error: false,
                    helperText: undefined,
                } as const
            }
        }
    }
