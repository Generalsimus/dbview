"use client"
import React, { useEffect } from "react";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
// import { Route } from "@/basic/models/route/route";
import { useValidationFormController_V2 } from "./hooks";
import { ValidationFormModal } from "./modal";
import { Validation } from "@/basic/models/validation/validation";

interface IProps {
    saveValidationDoc: (value: MakeCreateOrUpdate<Validation>) => Promise<void>
    deleteValidationDoc: (ids: number) => Promise<void>
}
export const EditValidationsView: React.FC<IProps> = React.memo(({ saveValidationDoc, deleteValidationDoc }) => {
    const from = useValidationFormController_V2()

    return <>
        <ValidationFormModal
            title="Edit Validation"
            saveValidationDoc={saveValidationDoc}
            deleteValidationDoc={deleteValidationDoc}
            {...from}
        />
    </>
});
