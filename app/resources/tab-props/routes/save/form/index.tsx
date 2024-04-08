import { Stack } from "@mui/material";
import React, { useState } from "react";
import { NameInput } from "./name-input";
import { MethodInput } from "./method-input";
import { PathInput } from "./path-input";
import { DescriptionInput } from "./description-input";
import { SetPropsRes, ValidationRes } from "@/app/utils/hooks/useSetProps/create-set-prop-controller";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Route } from "@/basic/models/route/route";


interface IProps {
    validation: ValidationRes<MakeCreateOrUpdate<Route>>
    getPropState: SetPropsRes<MakeCreateOrUpdate<Route>>["getPropState"]
}
export const Form: React.FC<IProps> = React.memo(({ validation, getPropState }) => {

    return <>
        <Stack display={"flex"} flexDirection={"column"} gap={3} padding={"0px 30px"}>
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
        </Stack>
    </>;
});
