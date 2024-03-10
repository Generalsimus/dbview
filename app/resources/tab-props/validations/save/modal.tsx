import { Stack } from "@mui/material";
import React from "react";
import { Validation, ValidationSchema } from "@/basic/models/validation/validation";
import { MakeCreateOrUpdate, getCreateOrUpdateSchema } from "@/basic/db-basic-schema";
import { Form } from "./form";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useRouter } from "next/navigation";
import { PartialKeys } from "@/basic/generics";
import { PropertyType } from "@/app/components/object-input/types";
import { useValidationFormController_V2 } from "./hooks";
import { FullScreenDialogController } from "@/app/components/full-screen-dialog-controller";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
import { getBasicValidationsDoc } from "./utils";



type ExtendsControllers = ReturnType<typeof useValidationFormController_V2>
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