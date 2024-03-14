import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Service } from "@/basic/models/services/services";
import { INDEXED_DB_STORY_SERVICE_KEY_ID, getBasicServiceDoc, serviceStorage } from "./utils";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";


interface FormType {
    open: boolean,
    doc: MakeCreateOrUpdate<Service>
}
export const useServiceFormController_V2 = () => {
    const form = useSetProps<FormType>(() => ({
        open: false,
        doc: getBasicServiceDoc()
    }));

    const searchParams = useSearchParams();
    const formId = searchParams.get('form');
    useEffect(() => {
        if (formId) {
            serviceStorage.put({
                [INDEXED_DB_STORY_SERVICE_KEY_ID]: formId,
                ...form.value.doc
            })
        }
    }, [form.value.doc])
    useEffect(() => {
        if (formId) {
            const servicePromise = serviceStorage.get(Number(formId));

            servicePromise.then((service) => {
                console.log({ service });
                if (service) {
                    form.setValue({
                        open: true,
                        doc: service
                    });
                }
            })
        } else {
            form.setProps("open")(false)
        }
    }, [formId]);

    return form
}

// export const useServiceFormViewController = (initialOpenValue: boolean = false) => {

//     const [status, setModalStatus, setModalStatusValue] = useToggleBool(initialOpenValue)


//     const onOpen = setModalStatus(true);
//     const onClose = setModalStatus(false);

//     return {
//         open: status,
//         onOpen: onOpen,
//         onClose: onClose,
//     }
// }

// const basicState = () => {
//     return {
//         name: "",
//         description: "",
//         methods: []
//     }
// }

// export const useServiceFormController = (initialStateValue?: MakeCreateOrUpdate<Service>) => {
//     const setProsRes = useSetProps<MakeCreateOrUpdate<Service>>(initialStateValue || basicState);

//     return {
//         ...setProsRes,
//         clearState: useMemoCall(() => {
//             setProsRes.setValue(basicState)

//         })
//     }
// }