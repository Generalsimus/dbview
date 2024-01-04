import { TextField } from "@mui/material";
import React, { useState } from "react";
import { NameInput } from "./name-input";
import { Service } from "@/basic/models/services/services";
import { InputProps } from "@/basic/generics";
import { Validator } from "@/app/utils/hooks/useSetProps/create=validation-controller";
import { DescriptionInput } from "./description-input";
import { MethodsInput } from "./methods-input";

interface IProps extends InputProps<Service> {
    validator: Validator<Service>
}
export const ServiceForm: React.FC<IProps> = React.memo(({ value = {}, validator, initSetProps, getPropState }) => {
    const { name, description } = value

    return <>
        <NameInput
            {...getPropState("name")}
            validator={validator}
        />
        <DescriptionInput
            {...getPropState("description")}
            validator={validator}
        />
        <MethodsInput
            {...getPropState("methods")}
            validator={validator}
        />
    </>;
});
