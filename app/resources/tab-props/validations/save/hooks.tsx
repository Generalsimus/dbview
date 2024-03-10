import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { getBasicValidationsDoc, validationStorage } from "./utils";
import { StateValueType } from "./form";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface FormType {
    open: boolean,
    doc: StateValueType
}
export const useValidationFormController_V2 = () => {
    const form = useSetProps<FormType>(() => ({
        open: false,
        doc: getBasicValidationsDoc()
    }));

    const searchParams = useSearchParams();
    const formId = searchParams.get('form');
    useEffect(() => {
        if (formId) {
            const servicePromise = validationStorage.get(Number(formId));

            servicePromise.then((doc) => {
                if (doc) {
                    form.setValue({
                        open: true,
                        doc: doc
                    });
                }
            })
        } else {
            form.setProps("open")(false)
        }
    }, [formId]);
    return form
}
