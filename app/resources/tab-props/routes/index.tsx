"use client"
import { Dispatch, SetStateAction } from "react"
import { InitialPropsTypes } from ".."
import { AddRouteButton } from "./save/add-button"
import { DeleteRouteDoc, SaveRouteDoc, getRouteDocs } from "./server"
import { SaveRouteForm } from "./save"
import { EditRouteEffectView } from "./save/edit-route-effect-view"

export const getRouteProps = (start: number, end: number, setTableProps: (newValue: InitialPropsTypes) => void) => {
    const routeDocs = getRouteDocs(start, end);

    const staticProps = {
        rightSideContent: <AddRouteButton
            saveRouteDoc={SaveRouteDoc}
            deleteRouteDoc={DeleteRouteDoc}
        />,
    }
    const columns = [
        { field: 'name', headerName: 'name' },
        { field: 'method', headerName: 'method' },
        { field: 'path', headerName: 'path' },
        { field: 'description', headerName: 'description' },
    ];

    routeDocs.then((routeDocs) => {

        const rows = routeDocs.docs.map((obj) => {
            return {
                ...obj,
                rowCellProps: {
                    sx: { cursor: "pointer" },
                    onClick: () => {
                        setTableProps({
                            ...awaitedProps,
                            rightSideContent: <>
                                {awaitedProps.rightSideContent}
                                <EditRouteEffectView
                                    saveRouteDoc={SaveRouteDoc}
                                    deleteRouteDoc={DeleteRouteDoc}
                                    initialValue={{ ...obj }}
                                />
                            </>
                        })
                    }
                }
            }
        });
        const awaitedProps = {
            ...staticProps,
            rows: rows,
            columns: columns,
            maxRowCount: routeDocs.maxDocsCount,
        };
        setTableProps({ ...awaitedProps })
    });

    setTableProps({ ...staticProps, isLoading: true })
}