import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { useToggleBool } from "@/app/utils/hooks/useToggleBool";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Service } from "@/basic/models/services/services";

export const useServiceFormViewController = (initialOpenValue: boolean = false) => {

    const [status, setModalStatus, setModalStatusValue] = useToggleBool(initialOpenValue)


    const onOpen = setModalStatus(true);
    const onClose = setModalStatus(false);

    return {
        open: status,
        onOpen: onOpen,
        onClose: onClose,
    }
}

const basicState = () => {
    return {
        name: "",
        description: "",
        methods: []
    }
}

export const useServiceFormController = (initialStateValue?: MakeCreateOrUpdate<Service>) => {
    const setProsRes = useSetProps<MakeCreateOrUpdate<Service>>(initialStateValue || basicState);

    return {
        ...setProsRes,
        clearState: useMemoCall(() => {
            setProsRes.setValue(basicState)

        })
    }
}