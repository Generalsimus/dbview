"use client";
import { DeleteRouteDoc, SaveRouteDoc, getRouteDocs } from "./server"
import { Route } from "@/basic/models/route/route"
import { ResourceTabsEnum } from "../utils";
import { AddRouteButton } from "./save/add-button";
import { EditRouteView } from "./save/edit-route-view";
import { ResourceData } from "../hooks";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { getRouteIndexedDBStorage } from "./save/utils";

const cellProps = {
    colSpan: 1,
    sx: {
        fontWeight: "bold",
        width: "calc(100% / 4)"
    }
}
const columns = [
    { name: "name", content: "Name", cellProps: cellProps },
    { name: "method", content: "Method", cellProps: cellProps },
    { name: "path", content: "Path", cellProps: cellProps },
    { name: "description", content: "Description", cellProps: cellProps },
]


export const useRouteResource = (
    start: number,
    end: number,
    tab: ResourceTabsEnum,
): ResourceData<Route> | undefined => {
    const router = useRouter()
    const routeStorage = useMemo(getRouteIndexedDBStorage, [])

    const content = useMemo(() => {
        return <>
            <EditRouteView
                saveRouteDoc={SaveRouteDoc}
                deleteRouteDoc={DeleteRouteDoc}
            />
            <AddRouteButton
                saveRouteDoc={SaveRouteDoc}
                deleteRouteDoc={DeleteRouteDoc}
            />
        </>
    }, [])
    return useMemo(() => {
        if (tab !== ResourceTabsEnum.Routes) return
        const routeDocs = getRouteDocs(start, end);


        return {
            start: start,
            end: end,
            resource: routeDocs,
            columns: columns,
            content: content,
            updateRows: ({ docs, maxDocsCount }, setTableData) => {
                const rows = docs.map((doc) => {

                    return {
                        columns: columns.map(column => {
                            return {
                                content: doc[column.name],
                            } as const
                        }),
                        rowProps: {
                            hover: true,
                            sx: { cursor: "pointer" },
                            role: "checkbox",
                            tabIndex: -1,
                            onClick: async () => {
                                const searchParams = new URLSearchParams(window.location.search);
                                const savedDoc = await routeStorage.add({ ...doc })
                                searchParams.set("form", `${savedDoc.INDEXED_DB_ROUTE_ID}`)
                                router.push(`${window.location.pathname}?${searchParams}`)
                            }
                        }
                    }
                });


                setTableData((curr) => {

                    return {
                        ...curr,
                        maxRowCount: maxDocsCount,
                        rows: rows,
                    }
                });
            }
        }

    }, [tab, start, end])
}
