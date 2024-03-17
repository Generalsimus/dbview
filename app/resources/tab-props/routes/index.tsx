"use client"
import { DeleteRouteDoc, SaveRouteDoc, getRouteDocs } from "./server"
import { Route } from "@/basic/models/route/route"
import { ResourceData } from "../utils";
import { AddRouteButton } from "./save/add-button";
import { routeStorage } from "./save/utils";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { EditRouteView } from "./save/edit-route-view";

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


export const getRouteResource = (
    start: number,
    end: number,
    router: AppRouterInstance
): ResourceData<Route> => {
    const routeDocs = getRouteDocs(start, end);
    const content = <>
        <EditRouteView
            saveRouteDoc={SaveRouteDoc}
            deleteRouteDoc={DeleteRouteDoc}
        />
        <AddRouteButton
            saveRouteDoc={SaveRouteDoc}
            deleteRouteDoc={DeleteRouteDoc}
        />
    </>

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

}
