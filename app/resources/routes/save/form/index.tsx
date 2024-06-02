import { Stack } from "@mui/material";
import React, { useState } from "react";
import { NameInput } from "./name-input";
import { MethodInput } from "./method-input";
import { PathInput } from "./path-input";
import { DescriptionInput } from "./description-input";
import { SetPropsRes, ValidationRes } from "@/app/utils/hooks/useSetProps/create-set-prop-controller";
import { MakeCreateOrUpdate } from "@/utils/db-basic-schema";
import { AddValidationsInput } from "./add-validations-input";
import { Route } from "@/db/types";
import { SaveRouteArgs } from "../../schema";



interface IProps {
    validation: ValidationRes<MakeCreateOrUpdate<SaveRouteArgs>>
    getPropState: SetPropsRes<MakeCreateOrUpdate<SaveRouteArgs>>["getPropState"]
}
export const Form: React.FC<IProps> = React.memo(({ validation, getPropState }) => {

    return <>
        <Stack display={"flex"} flexDirection={"column"} gap={3}  >
            <NameInput
                {...getPropState("name")}
                validation={validation}
            />
            <MethodInput
                {...getPropState("method")}
                validation={validation}
            />
            <PathInput
                {...getPropState("path")}
                validation={validation}
            />
            <DescriptionInput
                {...getPropState("description")}
                validation={validation}
            />
            <AddValidationsInput
                {...getPropState("validations")}
                validation={validation}
            />
        </Stack>
    </>;
});
