import { useMemo } from "react";
import { ArgValueType, ArgValueTypeGen, PropertyNameViews, PropertyNameViewsValue, ValueTypes } from "../types";
// import { InputValue } from "./input-view";
import { DeepUnion } from "@/basic/generics";



interface typeValue<T extends ValueTypes> {
    type: T["type"],
    value?: ArgValueTypeGen<T>,
    optionalValue: T
}
// InputValue<ValueTypes>
export const useSafeArgValues = <O extends PropertyNameViews>(valueOption: O, value?: PropertyNameViewsValue<O>) => {
    return {
        argInputValues: useMemo((): ValueTypes[] | undefined => {
            if (value) {
                const { name } = value;
                const { argValues } = valueOption[name] || {};
                const safeArgValue = argValues instanceof Function ? argValues() : argValues;
                const savedArgValues = value.argValues;


                return safeArgValue?.map(<El extends ValueTypes>(el: El, index) => {
                    const savedArgValue: ArgValueTypeGen<El> | undefined = savedArgValues?.[index];
                    if (savedArgValue && el.type === savedArgValue.type) {
                        return { ...el, value: savedArgValue.value ?? el.value };
                    }

                    return el;
                });
            }
        }, [value, valueOption]),
        argProperties: useMemo(() => {
            if (value) {
                const { name } = value;
                const { argProperties, filterArgProperties } = valueOption[name] || {};
                const safeArgValuesBeforeFilter = argProperties instanceof Function ? argProperties() : argProperties;

                if (!safeArgValuesBeforeFilter || !filterArgProperties) return safeArgValuesBeforeFilter;

                const safePropertiesValue = { ...safeArgValuesBeforeFilter };


                return safePropertiesValue;
            }
        }, [value, valueOption]),
    }

}

export const useSafeProperties = <O extends PropertyNameViews>(valueOption: O, value?: PropertyNameViewsValue<O>) => {
    return useMemo(() => {
        if (value) {
            const { name } = value;
            const { properties, dentFilterProperties, dentFilterAfterChoose } = valueOption[name];
            const safePropertiesBeforeFilter = properties instanceof Function ? properties() : properties;
            if (!safePropertiesBeforeFilter || dentFilterProperties) return safePropertiesBeforeFilter;

            const safePropertiesValue = { ...safePropertiesBeforeFilter };

            for (const key in safePropertiesValue) {
                if (!(key in valueOption)) {
                    delete safePropertiesValue[key];
                }
            }

            if (typeof name === "string" && !dentFilterAfterChoose) {
                delete safePropertiesValue[name];
            }

            return safePropertiesValue;
        }
    }, [value, valueOption]);

}





