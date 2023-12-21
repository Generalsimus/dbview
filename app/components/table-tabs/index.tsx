import React, { Component, ComponentProps, useState } from "react";
import { Table } from "../table";
import { TabsContent } from "./tabs";

type IProps = ComponentProps<typeof Table> & ComponentProps<typeof TabsContent>

export const TableTabs: React.FC<IProps> = React.memo((props) => {
    return <>
        <Table
            headerContent={<TabsContent  {...props} />}
            {...props}
        />
    </>;
});
