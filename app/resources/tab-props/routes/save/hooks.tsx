// import { useSetProps } from "@/utils/hooks/useSetProps";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Route } from "@/basic/models/route/route";
import { INDEXED_DB_STORY_ROUTE_KEY_ID, getBasicRouteDoc, routeStorage } from "./utils";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSetProps } from "@/app/resources/utils/hooks/useSetProps";

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
    useEffect(() => {
        if (formId) {
            routeStorage.put({
                [INDEXED_DB_STORY_ROUTE_KEY_ID]: formId,
                ...form.value.doc
            })
        }
    }, [form.value.doc])
    useEffect(() => {
        if (formId) {
            const routePromise = routeStorage.get(Number(formId));

            routePromise.then((route) => {
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


