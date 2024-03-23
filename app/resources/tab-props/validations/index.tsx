"use client"

import { ResourceTabsEnum } from "../utils";
import { DeleteValidationDoc, SaveValidationDoc, getValidations } from "./server";
import { EditValidationsView } from "./save/edit-Validationas-view";
import { Validation } from "@/basic/models/validation/validation";
import { AddValidationButton } from "./save/add-button";
import { map } from "lodash";
import { useRouter } from "next/navigation";
import { ResourceData } from "../hooks";
import { useMemo } from "react";
import { getValidationIndexedDBStorage } from "./save/utils";



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
export const useValidationResource = (
    start: number,
    end: number,
    tab: ResourceTabsEnum
): ResourceData<Validation> | undefined => {
    const router = useRouter() 
    const validationStorage = useMemo(getValidationIndexedDBStorage, []);
    const content = useMemo(() => {
        return <>
            <EditValidationsView
                saveValidationDoc={SaveValidationDoc}
                deleteValidationDoc={DeleteValidationDoc}
            />
            <AddValidationButton
                saveValidationDoc={SaveValidationDoc}
                deleteValidationDoc={DeleteValidationDoc}
            />
        </>
    }, []);
    
    return useMemo(() => {
        if (tab !== ResourceTabsEnum.Validations) return
        const validationDocs = getValidations(start, end);


        return {
            start: start,
            end: end,
            resource: validationDocs,
            columns: columns,
            content: content,
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
                            onClick: async () => {
                                const searchParams = new URLSearchParams(window.location.search);
                                const savedDoc = await validationStorage.add({ ...doc });
                                searchParams.set("form", `${savedDoc.INDEXED_DB_Validation_ID}`);
                                router.push(`${window.location.pathname}?${searchParams}`);
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
    }, [tab, start, end])

} 