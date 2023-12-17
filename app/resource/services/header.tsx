"use client"
import React, { useState } from "react";
import { ResourceTabsEnum } from "../resources-tabs";
// import { AddRouteButton } from "./save/add-button";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema"; 
import { ResourcesHeaderContent } from "../resources-header";
import { Route } from "@/basic/models/route/route";
import { Service } from "@/basic/models/services/services";

interface IProps {
    
    saveServiceDoc: (value: MakeCreateOrUpdate<Service>) => Promise<void>
    deleteServiceDoc: (ids: number) => Promise<void>
}
export const Header: React.FC<IProps> = React.memo(({ saveServiceDoc, deleteServiceDoc }) => {

    return <ResourcesHeaderContent
        tab={ResourceTabsEnum.Services}
        rightSideContent={<div/>}
    />;
});
