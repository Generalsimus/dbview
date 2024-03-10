// import { useForm } from "@/app/utils/hooks/useSetProps";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { useToggleBool } from "@/app/utils/hooks/useToggleBool";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Route } from "@/basic/models/route/route";
import { clear } from "console";
import { getBasicRouteDoc, getRouteIndexedDBStorage, routeStorage } from "./utils";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
// import { Route } from "next";
interface FormType {
    open: boolean,
    doc: MakeCreateOrUpdate<Route>
}
// const routesStorage = getRouteIndexedDBStorage()
export const useRouteFormController_V2 = () => {
    // useForm
    // console.log(" useSetProps<FormType>(()")
    // const params = useParams()

    const form = useSetProps<FormType>(() => ({
        open: false,
        doc: getBasicRouteDoc()
    }));

    const searchParams = useSearchParams();
    const formId = searchParams.get('form');
    console.log({ formId })
    useEffect(() => {
        if (formId) {
            const routePromise = routeStorage.get(Number(formId));

            routePromise.then((route) => {
                console.log({ route });
                if (route) {
                    form.setValue({
                        open: true,
                        doc: route
                    });
                }
            })
        } else {
            form.setProps("open")(false)
        }
    }, [formId]);

    return form
}


