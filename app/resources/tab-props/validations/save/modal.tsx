import { Stack } from "@mui/material";
import React from "react";
import { ValidationSchema } from "@/basic/models/validation/validation";
import { MakeCreateOrUpdate, getCreateOrUpdateSchema } from "@/basic/db-basic-schema";
import { Form } from "./form";
import { useRouter } from "next/navigation";
import { useValidationFormController } from "./hooks";
import { FullScreenDialogController } from "@/app/components/full-screen-dialog-controller";
import { getBasicValidationsDoc } from "./utils";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { Validation } from "@/db/types";



type ExtendsControllers = ReturnType<typeof useValidationFormController>
interface IProps extends ExtendsControllers {
    title: string
    saveValidationDoc: (value: MakeCreateOrUpdate<Validation>) => Promise<void>
    deleteValidationDoc: (ids: number) => Promise<void>
}
export const ValidationFormModal: React.FC<IProps> = React.memo((props) => {
    const {
        title,
        getPropState,
        getValidation,
        value,
        setValue,
        setProps,
        saveValidationDoc,
        deleteValidationDoc
    } = props;
    const { open } = value

    const onClose = useMemoCall(() => {
        setValue({
            open: false,
            doc: getBasicValidationsDoc()
        })
    });
    const onOpen = useMemoCall(() => {
        setProps("open")(true);
    });
    const { getIfValid, getError } = getPropState("doc").getValidation(getCreateOrUpdateSchema(ValidationSchema));


    const router = useRouter();

    const onSaveData = useMemoCall(async () => {
        const validDoc = getIfValid(true);
        if (validDoc) {
            await saveValidationDoc(validDoc)
        }
    })
    const onDelete = useMemoArgCall(deleteValidationDoc)

    return <>
        <FullScreenDialogController
            open={open}
            onClose={onClose}
            onOpen={onOpen}
            title={title}
            onCancel={onClose}
            onSave={onSaveData}
            onDelete={value && "id" in value ? onDelete(value.id) : undefined}
        >
            {open && <Stack display={"flex"} flexDirection={"column"} gap={3} padding={"0px 30px"}>
                <Form  {...getPropState("doc")} />
            </Stack>}
        </FullScreenDialogController>
    </>;
});