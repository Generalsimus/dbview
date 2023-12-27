"use client"
import { Dispatch, SetStateAction } from "react"
import { InitialPropsTypes } from "../hooks"
import { AddValidationButton } from "./save/add-button"
import { DeleteValidationDoc, SaveValidationDoc, getValidations } from "./server"
import { map } from "lodash"
import { EditValidationsEffectView } from "./save/edit-Validationas-effect-view"
import { ResourceTabsEnum, getEmptyTableProps } from "../utils"

// export const getValidationProps = (start: number, end: number, setTableProps: (newValue: InitialPropsTypes) => void) => {
//     // const validationDocs = getValidations(start, end);

//     // const staticProps = {
//     //     rightSideContent: <AddValidationButton
//     //         saveValidationDoc={SaveValidationDoc}
//     //         deleteValidationDoc={DeleteValidationDoc}
//     //     />
//     // }
//     // const columns = [
//     //     { field: 'name', headerName: 'name' },
//     //     { field: 'description', headerName: 'description' },
//     //     { field: 'properties', headerName: 'properties' },
//     // ];

//     // validationDocs.then((validationDocs) => {
//     //     const rows = validationDocs.docs.map(obj => {
//     //         return {
//     //             name: obj.name,
//     //             description: obj.description,
//     //             properties: map(obj.validations, "propertyName").join(", "),
//     //             rowCellProps: {
//     //                 sx: { cursor: "pointer" },
//     //                 onClick: () => {
//     //                     setTableProps({
//     //                         ...awaitedProps,
//     //                         rightSideContent: <>
//     //                             {awaitedProps.rightSideContent}
//     //                             <EditValidationsEffectView
//     //                                 saveValidationDoc={SaveValidationDoc}
//     //                                 deleteValidationDoc={DeleteValidationDoc}
//     //                                 initialValue={{ ...obj }}
//     //                             />
//     //                         </>
//     //                     })
//     //                 }
//     //             }
//     //         }
//     //     })

//     //     const awaitedProps = {
//     //         ...staticProps,
//     //         rows: rows,
//     //         columns: columns,
//     //         maxRowCount: validationDocs.maxDocsCount,
//     //     };
//     //     setTableProps(awaitedProps);
//     // });

//     // setTableProps({ ...staticProps, isLoading: true })
// }


export const getValidationProps = (start: number, end: number, setTableProps: (newValue: InitialPropsTypes) => void) => {
    const validationDocs = getValidations(start, end);
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
        tab: ResourceTabsEnum.Validations,
        rightSideContent: <EditValidationsEffectView
            saveValidationDoc={SaveValidationDoc}
            deleteValidationDoc={DeleteValidationDoc}
        />,
    });

    validationDocs.then(({ docs, maxDocsCount }) => {
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
                                    <EditValidationsEffectView
                                        saveValidationDoc={SaveValidationDoc}
                                        deleteValidationDoc={DeleteValidationDoc}
                                        initialValue={{ ...doc }}
                                    />,
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