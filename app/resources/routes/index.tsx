"use client"
import React, { ComponentProps } from "react";
import { RoutesTable } from "./table";
import { Pagination } from "@/app/components/pagination";
import { getRouteDocs } from "./server";


export type RouteTableParams = Pick<ComponentProps<typeof Pagination>, "start" | "end"> & Awaited<ReturnType<typeof getRouteDocs>>

interface IProps extends RouteTableParams { }
export const RoutesPage: React.FC<IProps> = React.memo((params) => {

    return (
        <>
            <RoutesTable {...params} />
        </>
    );
});
