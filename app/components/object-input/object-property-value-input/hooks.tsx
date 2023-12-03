import { useMemo } from "react";
import { PropertyNameViews, PropertyNameViewsValue } from "../types";




export const useSafeArgValues = <O extends PropertyNameViews>(valueOption: O, value?: PropertyNameViewsValue<O>) => {
    return useMemo(() => {
        if (value) {
            const { name } = value;
            const { argValues, filterArgProperties } = valueOption[name];
            const safeArgValuesBeforeFilter = argValues instanceof Function ? argValues() : argValues;

            if (!safeArgValuesBeforeFilter || safeArgValuesBeforeFilter instanceof Array || !filterArgProperties) return safeArgValuesBeforeFilter;

            const safePropertiesValue = { ...safeArgValuesBeforeFilter };

            // for (const key in safePropertiesValue) {
            //     if (!(key in valueOption)) {
            //         delete safePropertiesValue[key];
            //     }
            // }

            // if (typeof name === "string") {
            //     delete safePropertiesValue[name]
            // }
            return safePropertiesValue;
        }
    }, [value, valueOption])

}

export const useSafeProperties = <O extends PropertyNameViews>(valueOption: O, value?: PropertyNameViewsValue<O>) => {
    return useMemo(() => {
        if (value) {
            const { name } = value;
            const { properties, dentFilterProperties } = valueOption[name];
            const safePropertiesBeforeFilter = properties instanceof Function ? properties() : properties;
            if (!safePropertiesBeforeFilter || dentFilterProperties) return safePropertiesBeforeFilter;

            const safePropertiesValue = { ...safePropertiesBeforeFilter };

            for (const key in safePropertiesValue) {
                if (!(key in valueOption)) {
                    delete safePropertiesValue[key];
                }
            }

            if (typeof name === "string") {
                delete safePropertiesValue[name];
            }

            return safePropertiesValue;
        }
    }, [value, valueOption]);

}