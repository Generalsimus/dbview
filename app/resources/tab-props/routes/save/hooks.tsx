"use client";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Route } from "@/basic/models/route/route";
import { INDEXED_DB_STORY_ROUTE_KEY_ID, getBasicRouteDoc, getRouteIndexedDBStorage } from "./utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useSetProps } from "@/app/utils/hooks/useSetProps";
// import { SaveRoute } from "@/basic/models/route/types";

interface FormType {
    open: boolean,
    doc: MakeCreateOrUpdate<Route>
}
// const routesStorage = getRouteIndexedDBStorage()
export const useRouteFormController = () => {
    const form = useSetProps<FormType>(() => ({
        open: false,
        doc: getBasicRouteDoc()
    }));
    const routeStorage = useMemo(getRouteIndexedDBStorage, [])

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


