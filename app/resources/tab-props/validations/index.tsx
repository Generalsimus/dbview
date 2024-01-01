"use client"

import { Service } from "@/basic/models/services/services";
import { ResourceData, ResourceTabsEnum } from "../utils";
import { RowType } from "@/app/components/table/types";
import { DeleteValidationDoc, SaveValidationDoc, getValidations } from "./server";
import { EditValidationsEffectView } from "./save/edit-Validationas-effect-view";
import { Validation } from "@/basic/models/validation/validation";
import { AddValidationButton } from "./save/add-button";



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
export const getValidationResource = (
    start: number,
    end: number): ResourceData<Validation> => {
    const validationDocs = getValidations(start, end);
    const tabsRightContent = <AddValidationButton
        saveValidationDoc={SaveValidationDoc}
        deleteValidationDoc={DeleteValidationDoc}
    />;
    
    return {
        start: start,
        end: end,
        resource: validationDocs,
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
                                        <EditValidationsEffectView
                                            saveValidationDoc={SaveValidationDoc}
                                            deleteValidationDoc={DeleteValidationDoc}
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
// // export const getValidationProps = (start: number, end: number, setTableProps: (newValue: InitialPropsTypes) => void) => {
// //     // const validationDocs = getValidations(start, end);

// //     // const staticProps = {
// //     //     rightSideContent: <AddValidationButton
// //     //         saveValidationDoc={SaveValidationDoc}
// //     //         deleteValidationDoc={DeleteValidationDoc}
// //     //     />
// //     // }
// //     // const columns = [
// //     //     { field: 'name', headerName: 'name' },
// //     //     { field: 'description', headerName: 'description' },
// //     //     { field: 'properties', headerName: 'properties' },
// //     // ];

// //     // validationDocs.then((validationDocs) => {
// //     //     const rows = validationDocs.docs.map(obj => {
// //     //         return {
// //     //             name: obj.name,
// //     //             description: obj.description,
// //     //             properties: map(obj.validations, "propertyName").join(", "),
// //     //             rowCellProps: {
// //     //                 sx: { cursor: "pointer" },
// //     //                 onClick: () => {
// //     //                     setTableProps({
// //     //                         ...awaitedProps,
// //     //                         rightSideContent: <>
// //     //                             {awaitedProps.rightSideContent}
// //     //                             <EditValidationsEffectView
// //     //                                 saveValidationDoc={SaveValidationDoc}
// //     //                                 deleteValidationDoc={DeleteValidationDoc}
// //     //                                 initialValue={{ ...obj }}
// //     //                             />
// //     //                         </>
// //     //                     })
// //     //                 }
// //     //             }
// //     //         }
// //     //     })

// //     //     const awaitedProps = {
// //     //         ...staticProps,
// //     //         rows: rows,
// //     //         columns: columns,
// //     //         maxRowCount: validationDocs.maxDocsCount,
// //     //     };
// //     //     setTableProps(awaitedProps);
// //     // });

// //     // setTableProps({ ...staticProps, isLoading: true })
// // }


// export const getValidationProps = (start: number, end: number, setTableProps: (newValue: InitialPropsTypes) => void) => {
//     const validationDocs = getValidations(start, end);
//     const cellProps = {
//         colSpan: 1,
//         sx: {
//             fontWeight: "bold",
//             fontSize: "medium"
//         }
//     };
//     const columnContent = [
//         { name: "name", content: "Name", cellProps: cellProps },
//         { name: "description", content: "Description", cellProps: cellProps },
//         { name: "properties", content: "Properties", cellProps: cellProps },
//     ];
//     const staticProps = getEmptyTableProps({
//         titleRow: {
//             columns: columnContent,
//         },
//         start: start,
//         end: end,
//         tab: ResourceTabsEnum.Validations,
//         tabCellProps: {
//             colSpan: columnContent.length * 2,
//             padding: "none"
//         },
//         rightSideContent: <AddValidationButton
//             saveValidationDoc={SaveValidationDoc}
//             deleteValidationDoc={DeleteValidationDoc}
//         />
//     });

//     validationDocs.then(({ docs, maxDocsCount }) => {
//         const awaitedContentProps = {
//             ...staticProps,

//             maxRowCount: maxDocsCount,
//             rows: docs.map((doc) => {
//                 return {
//                     columns: columnContent.map(column => {
//                         const returnValue = {
//                             content: doc[column.name],
//                             cellProps: {
//                                 colSpan: 1,
//                             }
//                         }
//                         if (column.name === "properties") {
//                             returnValue.content = map(doc.validations, "propertyName").join(", ")
//                         }
//                         return returnValue
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
//                                     <EditValidationsEffectView
//                                         saveValidationDoc={SaveValidationDoc}
//                                         deleteValidationDoc={DeleteValidationDoc}
//                                         initialValue={{ ...doc }}
//                                     />,
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
