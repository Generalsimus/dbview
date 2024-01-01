"use client"

import { Service } from "@/basic/models/services/services";
import { ResourceData, ResourceTabsEnum } from "../utils";
import { getServiceDocs } from "./server";
import { RowType } from "@/app/components/table/types";



const columns = [
    // {
    //     name: "CollSpan",
    //     content: "OWN",
    //     cellProps: {
    //         colSpan: 1,
    //     }
    // },
    { name: "name", content: "Name", },
    { name: "description", content: "Description" },
    { name: "properties", content: "Properties" },
]
export const getServiceResource = (
    start: number,
    end: number): ResourceData<Service> => {
    const serviceDocs = getServiceDocs(start, end);
    const tabsRightContent = <div />
    return {
        start: start,
        end: end,
        resource: serviceDocs,
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
            })
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
// export const getServicesProps = (start: number, end: number, setTableProps: (newValue: InitialPropsTypes) => void) => {
//     const servicesDocs = getServiceDocs(start, end);
//     const cellProps = {
//         // colSpan: 1,
//         colSpan: 4,
//         align: "left",
//         sx: {
//             fontWeight: "bold",
//             fontSize: "medium"
//         }
//     } as const;
//     const columnContent = [
//         {
//             name: "CollSpan",
//             content: "OWN",
//             cellProps: {
//                 colSpan: 1,
//             }
//         },
//         { name: "name", content: "Name", cellProps: cellProps },
//         { name: "description", content: "Description", cellProps: cellProps },
//         { name: "properties", content: "Properties", cellProps: cellProps },
//     ];
//     const staticProps = getEmptyTableProps({
//         titleRow: {
//             columns: columnContent,
//         },
//         tabCellProps: {},
//         start: start,
//         end: end,
//         tab: ResourceTabsEnum.Services,
//         rightSideContent: <>
//             ADD SERVICE
//         </>
//     });

//     servicesDocs.then(({ docs, maxDocsCount }) => {
//         const awaitedContentProps = {
//             ...staticProps,
//             maxRowCount: maxDocsCount,
//             rows: docs.map((doc) => {
//                 const columns: RowType["columns"] = columnContent.map(column => {
//                     if (column.name === "CollSpan") {
//                         return {
//                             content: <IconButton
//                                 aria-label="expand row"
//                                 size="small"
//                                 onClick={() => { }}
//                             >
//                                 <KeyboardArrowUpIcon />
//                                 {/* {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
//                             </IconButton>,
//                             cellProps: {
//                                 align: "left",
//                                 colSpan: column.cellProps.colSpan,
//                                 sx: { paddingTop: 0, paddingBottom: 0 }
//                             }
//                         }
//                     } else {
//                         return {
//                             content: doc[column.name],
//                             cellProps: {
//                                 colSpan: 2
//                             }
//                         }
//                     }

//                 })


//                 return {
//                     columns: columns,
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
//                                     <></>

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