'use client';
import { ComponentProps, useEffect, useState } from "react";
import { TableTabs } from "@/app/components/table-tabs";
import { useParams } from "next/navigation";
import { ResourceTabsEnum, getTableProps } from "./utils";


export type InitialPropsTypes = ComponentProps<typeof TableTabs>

export const useResourceProps = (tab: ResourceTabsEnum, start: number, end: number) => {
    const [resource, setResource] = useState<InitialPropsTypes>(() => {
        return getTableProps(tab, start, end, (v) => {
            setResource(v)
        })
    });
    const params = useParams();
    useEffect(() => {
        setResource(getTableProps(tab, start, end, setResource))
    }, [params, tab, start, end])
    // console.log(resource)
    return resource;
};

