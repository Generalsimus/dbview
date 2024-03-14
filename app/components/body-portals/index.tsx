"use client"
import React, { ReactNode } from "react";

interface IProps {
    children: ReactNode
}
export const BodyContents: React.FC<IProps> = React.memo(({ children }) => {

    return <>
        {children}
    </>;
});

