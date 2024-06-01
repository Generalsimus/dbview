// import { Table } from "@mui/material";
import { Table } from "@/app/components/table";
import React, { ComponentProps, useState } from "react";
import { RoutesTable } from "./table";
import { Pagination } from "@/app/components/pagination";

interface IProps extends Pick<ComponentProps<typeof Pagination>, "start" | "end"> {
}
export const RoutesPage: React.FC<IProps> = React.memo(({ start, end }) => {

    return <>
        <RoutesTable start={start} end={end} />
    </>;
});
