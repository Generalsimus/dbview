import { FullScreenDialogController } from "@/app/components/full-screen-dialog-controller";
import { useToggleBool } from "@/app/utils/hooks/useToggleBool";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Service } from "@/basic/models/services/services";
import React, { useState } from "react";

interface IProps {
    saveRouteDoc: (value: MakeCreateOrUpdate<Service>) => Promise<void>;
    deleteRouteDoc: (id: number) => Promise<void>;
    title: string;
}
export const EditServiceFormModal: React.FC<IProps> = React.memo(({ title }) => {
    const [] = useToggleBool(false)

    return <FullScreenDialogController
        open={open}
        // onClose={onClose}
        // onOpen={onOpen}
        title={title}
    // onCancel={onClose}
    // onSave={onSave}
    // isDisabled={isSavingProcess}
    // onDelete={value && "id" in value ? onDelete(value.id) : undefined}
    >

    </FullScreenDialogController>;
});
