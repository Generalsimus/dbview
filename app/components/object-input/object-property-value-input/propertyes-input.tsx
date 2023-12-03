
import React, { useState } from "react";
import { PropertyNameViews, PropertyNameViewsValue } from "../types";

interface IProps<O extends PropertyNameViews> {
    value: PropertyNameViewsValue<O>,
    valueOption: O,
}
export const PropertiesInput = React.memo(<O extends PropertyNameViews>({ }: IProps<O>) => {

    return <>
    
    </>;
});
