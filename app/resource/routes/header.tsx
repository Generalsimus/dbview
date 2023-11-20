"use client"
import React, { useState } from "react";
import { ResourceTabsEnum } from "../resources-tabs";
import { AddRouteButton } from "./save/add-button";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema"; 
import { ResourcesHeaderContent } from "../resources-header";
import { Route } from "@/basic/models/route/route";

interface IProps {
    saveRouteDoc: (value: MakeCreateOrUpdate<Route>) => Promise<void>
    deleteRouteDoc: (ids: number) => Promise<void>
}
export const Header: React.FC<IProps> = React.memo(({ saveRouteDoc, deleteRouteDoc }) => {

    return <ResourcesHeaderContent
        tab={ResourceTabsEnum.Routes}
        rightSideContent={<AddRouteButton
            saveRouteDoc={saveRouteDoc}
            deleteRouteDoc={deleteRouteDoc}
        />}
    />;
});
