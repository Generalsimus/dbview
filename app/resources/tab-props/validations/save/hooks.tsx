// import { useSetProps } from "@/utils/hooks/useSetProps";
import { INDEXED_DB_STORY_VALIDATION_KEY_ID, getBasicValidationsDoc, validationStorage } from "./utils";
import { StateValueType } from "./form";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSetProps } from "@/app/resources/utils/hooks/useSetProps";

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
            validationStorage.put({
                [INDEXED_DB_STORY_VALIDATION_KEY_ID]: formId,
                ...form.value.doc
            })
        }
    }, [form.value.doc])
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
