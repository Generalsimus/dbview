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
            // return {
            //     columns: columnContent.map(column => {
            //         return {
            //             content: doc[column.name],
            //         } as const
            //     }),
            //     rowProps: {
            //         hover: true,
            //         sx: { cursor: "pointer" },
            //         role: "checkbox",
            //         tabIndex: -1,
            //     }
            // }
        }
    }

}

// export const getRouteProps = (start: number, end: number, setTableProps: (newValue: InitialPropsTypes) => void) => {
//     const routeDocs = getRouteDocs(start, end);
//     const cellProps = {
//         colSpan: 1,
//         sx: {
//             fontWeight: "bold",
//             fontSize: "medium"
//         }
//     };
//     const columnContent = [
//         { name: "name", content: "Name", cellProps: cellProps },
//         { name: "method", content: "Method", cellProps: cellProps },
//         { name: "path", content: "Path", cellProps: cellProps },
//         { name: "description", content: "Description", cellProps: cellProps },
//     ];



//     const staticProps = getEmptyTableProps({
//         titleRow: {
//             columns: columnContent,
//         },
//         start: start,
//         end: end,
//         tab: ResourceTabsEnum.Routes,
//         tabCellProps: {},
//         rightSideContent: <AddRouteButton
//             saveRouteDoc={SaveRouteDoc}
//             deleteRouteDoc={DeleteRouteDoc}
//         />,
//     });

//     routeDocs.then(({ docs, maxDocsCount }) => {
//         const awaitedContentProps = {
//             ...staticProps,
//             maxRowCount: maxDocsCount,
//             rows: docs.map((doc) => {
//                 return {
//                     columns: columnContent.map(column => {
//                         return {
//                             content: doc[column.name],
//                             cellProps: {
//                                 colSpan: 1,
//                             }
//                         } as const
//                     }),
//                     tableRowProps: {
//                         hover: true,
//                         sx: { cursor: "pointer" },
//                         role: "checkbox",
//                         tabIndex: -1,
//                         onClick: () => {
//                             setTableProps({
//                                 ...awaitedContentProps,
//                                 rightSideContent: <>
//                                     {awaitedContentProps.rightSideContent}
//                                     <EditRouteEffectView
//                                         saveRouteDoc={SaveRouteDoc}
//                                         deleteRouteDoc={DeleteRouteDoc}
//                                         initialValue={{ ...doc }}
//                                     />
//                                 </>
//                             });
//                         }
//                     }
//                 } as const
//             }),
//         }

//         setTableProps({ ...awaitedContentProps })
//     });

//     return { ...staticProps }
// }