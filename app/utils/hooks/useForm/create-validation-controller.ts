import { AnySchema } from "joi"





interface ValidationController {
    getError: () => string | undefined
}
export const createValidationController = <V>(schema?: AnySchema<V>) => {
    const getController = (...paths: PropertyKey[]) => {

        return {
            getError: () => {

            },
            getIfValid: () => {

            }
        }

    }
    return getController()
}