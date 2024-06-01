import { FullScreenDialogController } from "@/app/components/full-screen-dialog-controller";
import { MakeCreateOrUpdate, getCreateOrUpdateSchema } from "@/basic/db-basic-schema";
// import { Service, ServiceSchema } from "@/basic/models/services/services";
import React from "react";
import { useServiceFormController_V2 } from "./hooks";
import { Stack } from "@mui/material";
import { ServiceForm } from "./form";
import { getBasicServiceDoc } from "./utils";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
import { Service } from "@/db/types";
import { ServiceSchema } from "@/basic/models/services/services";


type ExtendsControllers = ReturnType<typeof useServiceFormController_V2>

interface IProps extends ExtendsControllers {
    saveServiceDoc: (value: MakeCreateOrUpdate<Service>) => Promise<void>;
    deleteServiceDoc: (id: number) => Promise<void>;
    title: string;
}
export const EditServiceFormModal: React.FC<IProps> = React.memo((props) => {
    const {
        saveServiceDoc,
        deleteServiceDoc,
        title,
        value,
        setValue,
        initSetProps,
        setProps,
        getValidation,
        getPropState,
    } = props;

    const { open } = value


    const validator = getPropState("doc").getValidation(getCreateOrUpdateSchema(ServiceSchema));
    const { getIfValid, getError } = validator;
    const onClose = useMemoCall(() => {
        setValue({
            open: false,
            doc: getBasicServiceDoc()
        })
    });
    const onOpen = useMemoCall(() => {
        setProps("open")(true);
    });

    const onSave = useMemoCall(async () => {
        const validDoc = getIfValid(true);
        // console.log({ validDoc })
        if (validDoc) {
            await saveServiceDoc(validDoc);
        }
    });

    const onDelete = useMemoArgCall(deleteServiceDoc)


    return <FullScreenDialogController
        open={open}
        onClose={onClose}
        disableEffectClose={validator.hasError()}
        onOpen={onOpen}
        title={title}
        onSave={onSave}
        onCancel={onClose}
        onDelete={value && "id" in value ? onDelete(value.id) : undefined}
    >
        {open && <Stack display={"flex"} flexDirection={"column"} gap={3} padding={"0px 30px"}>
            <ServiceForm   {...getPropState("doc")} />
        </Stack>}
    </FullScreenDialogController>;
});
