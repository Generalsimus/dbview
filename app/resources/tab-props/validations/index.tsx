"use client"
import { Dispatch, SetStateAction } from "react"
import { InitialPropsTypes } from ".."
import { AddValidationButton } from "./save/add-button"
import { DeleteValidationDoc, SaveValidationDoc, getValidations } from "./server"
import { map } from "lodash"
// import { DeleteRouteDoc, SaveRouteDoc, getRouteDocs } from "./server"

export const getValidationProps = (start: number, end: number, setTableProps: (newValue: InitialPropsTypes) => void) => {
    const validationDocs = getValidations(start, end);

    const staticProps = {
        rightSideContent: <AddValidationButton
            saveValidationDoc={SaveValidationDoc}
            deleteValidationDoc={DeleteValidationDoc}
        />
    }
    const columns = [
        { field: 'name', headerName: 'name' },
        { field: 'description', headerName: 'description' },
        { field: 'properties', headerName: 'properties' },
    ];

    validationDocs.then((validationDocs) => {
        const rows = validationDocs.docs.map(el => {
            return {
                name: el.name,
                description: el.description,
                properties: map(el.validations, "property").join(", "),
                rowCellProps: {
                    sx: { cursor: "pointer" },
                    onClick: () => {
                        // onViewModal(el)
                    }
                }
            }
        })

        const awaitedProps = {
            ...staticProps,
            rows: rows,
            columns: columns,
            maxRowCount: validationDocs.maxDocsCount,
        };
        setTableProps(awaitedProps);
    });

    setTableProps({ ...staticProps, isLoading: true })
}