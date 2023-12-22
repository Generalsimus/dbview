"use client"
import React, { useEffect } from "react";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
// import { Route } from "@/basic/models/route/route";
import { useValidationsFormController, useValidationsFormViewController } from "./hooks";
import { ValidationFormModal } from "./modal";
import { Validation } from "@/basic/models/validation/validation";

interface IProps {
    saveValidationDoc: (value: MakeCreateOrUpdate<Validation>) => Promise<void>
    deleteValidationDoc: (ids: number) => Promise<void>
    initialValue?: MakeCreateOrUpdate<Validation>
}
export const EditValidationsEffectView: React.FC<IProps> = React.memo(({ saveValidationDoc, deleteValidationDoc, initialValue }) => {
    const formViewController = useValidationsFormViewController()
    const formController = useValidationsFormController()
    useEffect(() => {
        if (initialValue) {
            formController.setValue(initialValue)
            formViewController.onOpen();
        }
    }, [initialValue])
    return <>
        <ValidationFormModal
            title="Edit Validation"
            {...formViewController}
            {...formController}

            saveValidationDoc={saveValidationDoc}
            deleteValidationDoc={deleteValidationDoc}
        />
    </>
});
