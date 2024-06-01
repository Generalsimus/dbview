import React from "react";
import { NameInput } from "./name-input"; 
import { InputProps } from "@/basic/generics";
import { DescriptionInput } from "./description-input";
import { MethodsInput } from "./methods-input";
import { Service } from "@/db/types";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { SaveServiceArgs } from "../../server";

interface IProps extends InputProps<MakeCreateOrUpdate<SaveServiceArgs>> {
}

export const Form: React.FC<IProps> = React.memo(({ value = {}, initSetProps, getPropState }) => {

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
