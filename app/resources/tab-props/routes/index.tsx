"use client"
import { RowType } from "@/app/components/table/types";
import { DeleteRouteDoc, SaveRouteDoc, getRouteDocs } from "./server"
import { Route } from "@/basic/models/route/route"
import { ResourceData, ResourceTabsEnum } from "../utils";
import { Box } from "@mui/material";
import { AddRouteButton } from "./save/add-button";
import { EditRouteEffectView } from "./save/edit-route-effect-view";

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
): ResourceData<Route> => {
    const routeDocs = getRouteDocs(start, end);
    const tabsRightContent = <AddRouteButton
        saveRouteDoc={SaveRouteDoc}
        deleteRouteDoc={DeleteRouteDoc}
    />
    return {
        start: start,
        end: end,
        resource: routeDocs,
        columns: columns,
        tabsRightContent: tabsRightContent,
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
                        onClick: () => {
                            setTableData((curr) => {
                                return {
                                    ...curr,
                                    tabsRightContent: <>
                                        {tabsRightContent}
                                        <EditRouteEffectView
                                            saveRouteDoc={SaveRouteDoc}
                                            deleteRouteDoc={DeleteRouteDoc}
                                            initialValue={{ ...doc }}
                                        />
                                    </>
                                }
                            });
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
