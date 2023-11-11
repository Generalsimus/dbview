"use client"
import { AddRouteModal } from "@/app/components/add-route-modal";
import { Stack } from "@mui/material";
import React, { useState } from "react";
import { useResourceTabs } from "../tabs";
import { ExtendDbKeys, PartialDbKeys } from "@/basic/db-basic-schema";
import { Route } from "@/basic/models/route";

interface IProps {
    createRouteDoc: (value: PartialDbKeys<ExtendDbKeys<Route>>) => Promise<void>
}
export const HeaderContent: React.FC<IProps> = React.memo(({ createRouteDoc }) => {
    const tabs = useResourceTabs()

    return <>
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            spacing={2}
            padding="10px"
        >
            {tabs}
            <AddRouteModal routePath="/" createRouteDoc={createRouteDoc} />
        </Stack>
    </>;
});
