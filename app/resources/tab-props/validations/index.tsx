"use client"
import { Dispatch, SetStateAction } from "react"
import { InitialPropsTypes } from ".."
import { AddValidationButton } from "./save/add-button"
import { DeleteValidationDoc, SaveValidationDoc, getValidations } from "./server"
import { map } from "lodash"
import { EditValidationsEffectView } from "./save/edit-Validationas-effect-view"

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
        const rows = validationDocs.docs.map(obj => {
            return {
                name: obj.name,
                description: obj.description,
                properties: map(obj.validations, "propertyName").join(", "),
                rowCellProps: {
                    sx: { cursor: "pointer" },
                    onClick: () => {
                        setTableProps({
                            ...awaitedProps,
                            rightSideContent: <>
                                {awaitedProps.rightSideContent}
                                <EditValidationsEffectView
                                    saveValidationDoc={SaveValidationDoc}
                                    deleteValidationDoc={DeleteValidationDoc}
                                    initialValue={{ ...obj }}
                                />
                            </>
                        })
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