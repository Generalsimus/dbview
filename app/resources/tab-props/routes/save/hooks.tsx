import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { useToggleBool } from "@/app/utils/hooks/useToggleBool";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Route } from "@/basic/models/route/route";
import { clear } from "console";
// import { Route } from "next";

export const useRouteFormViewController = (initialOpenValue: boolean = false) => {

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
        path: "",
        description: "",
        method: ""
    }
}

export const useRouteFormController = (initialStateValue?: MakeCreateOrUpdate<Route>) => {
    const setProsRes = useSetProps<MakeCreateOrUpdate<Route>>(initialStateValue || basicState);

    return {
        ...setProsRes,
        clearState: useMemoCall(() => {
            setProsRes.setValue(basicState)

        })
    }
}