import { IconButton, styled, touchRippleClasses } from "@mui/material";
import React, { Component, ComponentProps, useState } from "react";

interface IProps extends ComponentProps<typeof IconButton> {
}
export const SmallIconButton: React.FC<IProps> = React.memo(styled(IconButton)(({ theme }) => {
    // console.log({ touchRippleClasses }).
    return ({
        // [`& .${touchRippleClasses.root}`]: {
        // bgColor: "red"
        // },
        [`& `]: {
            padding: 0
        },
        [`& svg`]: {
            // width: ".5em",
            // height: ".5em"
        },
        // [`& .${iconButtonClasses.root}`]: {
        //     padding: 5
        // },
        // "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        //     WebkitAppearance: "none",
        //     display: "none",
        // },
        // "& input[type=number]": {
        //     MozAppearance: "textfield",
        // },
        // [`& .${formControlClasses.root}, & .${formControlClasses.root} *`]: {
        //     position: "absolute",
        //     boxSizing: "border-box",
        //     padding: 0,
        //     margin: 0,
        //     top: 0,
        //     bottom: 0,
        //     left: 0,
        //     right: 0,
        //     maxWidth: "100%",
        //     maxHeight: "100%",
        //     width: "100%",
        //     height: "100%",
        //     textAlign: "center"
        // },
    })
}))