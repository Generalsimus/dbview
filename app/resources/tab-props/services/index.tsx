"use client"
import { Dispatch, SetStateAction } from "react"
import { InitialPropsTypes } from "../hooks"
import { map } from "lodash"
import { ResourceTabsEnum, getEmptyTableProps } from "../utils"
import { getServiceDocs } from "./server"



export const getServicesProps = (start: number, end: number, setTableProps: (newValue: InitialPropsTypes) => void) => {
    const servicesDocs = getServiceDocs(start, end);
    const cellProps = {
        colSpan: 1
    };
    const columnContent = [
        { content: "name", cellProps: cellProps },
        { content: "description", cellProps: cellProps },
        { content: "properties", cellProps: cellProps },
    ];
    const staticProps = getEmptyTableProps({
        titleRow: {
            columns: columnContent,
        },
        start: start,
        end: end,
        tab: ResourceTabsEnum.Services,
        rightSideContent: <>
        </>
        // <EditValidationsEffectView
        //     saveValidationDoc={SaveValidationDoc}
        //     deleteValidationDoc={DeleteValidationDoc}
        // />,
    });

    servicesDocs.then(({ docs, maxDocsCount }) => {
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
                                    <></>

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