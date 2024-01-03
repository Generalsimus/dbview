"use client"

import { Service } from "@/basic/models/services/services";
import { ResourceData, ResourceTabsEnum } from "../utils";
import { RowType } from "@/app/components/table/types";
import { DeleteValidationDoc, SaveValidationDoc, getValidations } from "./server";
import { EditValidationsEffectView } from "./save/edit-Validationas-effect-view";
import { Validation } from "@/basic/models/validation/validation";
import { AddValidationButton } from "./save/add-button";
import { map } from "lodash";



const cellProps = {
    colSpan: 1,
    sx: {
        fontWeight: "bold",
        width: "calc(100% / 3)"
    }
}
const columns = [
    { name: "name", content: "Name", cellProps: cellProps },
    { name: "description", content: "Description", cellProps: cellProps },
    { name: "properties", content: "Properties", cellProps: cellProps },
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
                        const returnValue = {
                            content: doc[column.name],
                        }
                        if (column.name === "properties") {
                            returnValue.content = map(doc.validations, "propertyName").join(", ")
                        }
                        return returnValue;
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
            });
        }
    }
} 