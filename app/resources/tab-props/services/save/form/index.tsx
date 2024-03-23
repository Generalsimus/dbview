import React from "react";
import { NameInput } from "./name-input";
import { Service } from "@/basic/models/services/services";
import { InputProps } from "@/basic/generics";
import { DescriptionInput } from "./description-input";
import { MethodsInput } from "./methods-input";

interface IProps extends InputProps<Service> {
}

export const ServiceForm: React.FC<IProps> = React.memo(({ value = {}, initSetProps, getPropState }) => {

    return <>
        <NameInput
            {...getPropState("name")}
        />
        <DescriptionInput
            {...getPropState("description")}
        />
        <MethodsInput
            {...getPropState("methods")}
        />
    </>;
});
