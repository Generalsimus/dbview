"use client"
import React, { useState } from "react";
import { ResourcesHeaderContent } from "../resources-header";
import { ResourceTabsEnum } from "../resources-tabs";
import { AddValidationButton } from "./save/add-button";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Validation } from "@/basic/models/validation/validation";
import { ValidationFormModal } from "./save/modal";

interface IProps {
    saveValidationDoc: (value: MakeCreateOrUpdate<Validation>) => Promise<void>
    deleteValidationDoc: (ids: number) => Promise<void>
}
export const Header: React.FC<IProps> = React.memo(({ saveValidationDoc, deleteValidationDoc }) => {

    return <>
        <ResourcesHeaderContent
            tab={ResourceTabsEnum.Validations}
            rightSideContent={<AddValidationButton
                saveValidationDoc={saveValidationDoc}
                deleteValidationDoc={deleteValidationDoc}
            />}
        />
    </>;
}); 