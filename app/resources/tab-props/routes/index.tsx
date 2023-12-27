"use client"
import React, { } from "react"
import { InitialPropsTypes } from "../hooks"
import { AddRouteButton } from "./save/add-button"
import { DeleteRouteDoc, SaveRouteDoc, getRouteDocs } from "./server"
import { ResourceTabsEnum, getEmptyTableProps } from "../utils"
import { EditRouteEffectView } from "./save/edit-route-effect-view"


export const getRouteProps = (start: number, end: number, setTableProps: (newValue: InitialPropsTypes) => void) => {
    const routeDocs = getRouteDocs(start, end);
    const cellProps = {
        colSpan: 1
    };
    const columnContent = [
        { content: "name", cellProps: cellProps },
        { content: "method", cellProps: cellProps },
        { content: "path", cellProps: cellProps },
        { content: "description", cellProps: cellProps },
    ];
    const staticProps = getEmptyTableProps({
        titleRow: {
            columns: columnContent,
        },
        start: start,
        end: end,
        tab: ResourceTabsEnum.Routes,
        rightSideContent: <AddRouteButton
            saveRouteDoc={SaveRouteDoc}
            deleteRouteDoc={DeleteRouteDoc}
        />,
    });

    routeDocs.then(({ docs, maxDocsCount }) => {
        const awaitedContentProps = {
            ...staticProps,
            maxRowCount: maxDocsCount,
            rows: docs.map((doc) => {
                return {
                    columns: columnContent.map(column => {
                        return {
                            content: doc[column.content],
                            cellProps: column.cellProps
                        } as const
                    }),
                    tableRowProps: {
                        hover: true,
                        sx: { cursor: "pointer" },
                        role: "checkbox",
                        tabIndex: -1,
                        onClick: () => {
                            setTableProps({
                                ...awaitedContentProps,
                                rightSideContent: <>
                                    {awaitedContentProps.rightSideContent}
                                    <EditRouteEffectView
                                        saveRouteDoc={SaveRouteDoc}
                                        deleteRouteDoc={DeleteRouteDoc}
                                        initialValue={{ ...doc }}
                                    />
                                </>
                            });
                        }
                    }
                } as const
            }),
        }

        setTableProps({ ...awaitedContentProps })
    });

    return { ...staticProps }
}