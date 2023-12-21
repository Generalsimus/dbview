import { MakeAsDbDoc, MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Validation } from "@/basic/models/validation/validation";
import React, { ReactNode, useState } from "react";
import { ValidationFormModal } from "./modal";
import { useToggleBool } from "@/app/utils/hooks/useToggleBool";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";

interface IProps {
    saveValidationDoc: (value: MakeCreateOrUpdate<Validation>) => Promise<void>
    deleteValidationDoc: (ids: number) => Promise<void>,
    getContent: (onOpenEdit: (value: MakeAsDbDoc<Validation>) => void) => void
}
export const EditValidationContainer: React.FC<IProps> = React.memo(({ saveValidationDoc, deleteValidationDoc, getContent }) => {
    const [isOpen, setIsOpen] = useState(false);
 

    const [initialValue, setInitialValue] = useState<MakeAsDbDoc<Validation> | undefined>()

    const onOpen = useMemoCall(() => {
        setIsOpen(true);
    })

    const onClose = useMemoCall(() => {
        setIsOpen(false);
        setInitialValue(undefined)
    })



    const onOpenModal = useMemoCall((value: MakeAsDbDoc<Validation>) => {
        onOpen();
        setInitialValue({ ...value });
    })
    return <>
        {getContent(onOpenModal)}
        {initialValue && <ValidationFormModal
            title="Edit Validation"
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            initialValue={initialValue}
            saveValidationDoc={saveValidationDoc}
            deleteValidationDoc={deleteValidationDoc}
        />}
    </>;
});
