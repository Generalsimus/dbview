// import { useForm } from "@/app/utils/hooks/useSetProps";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { useToggleBool } from "@/app/utils/hooks/useToggleBool";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Route } from "@/basic/models/route/route";
import { clear } from "console";
import { getBasicRouteDoc } from "./utils";
// import { Route } from "next";
interface FormType {
    open: boolean,
    doc: MakeCreateOrUpdate<Route>
}
export const useRouteFormController_V2 = () => {
    // useForm
    const form = useSetProps<FormType>(() => ({
        open: false,
        doc: getBasicRouteDoc()
    }));
    return form
    // return {
    //     ...form,
    //     getBasicRouteDoc
    // }
}


