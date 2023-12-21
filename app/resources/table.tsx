"use client"
import React, { } from "react";
import { TableTabs } from "../components/table-tabs";
import { useMemoCall } from "../utils/hooks/useMemoCall";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useResourceProps } from "./tab-props";



export const enum ResourceTabsEnum {
    Routes = "Routes",
    Validations = "Validations",
    Services = "Services",
}
export const resourceTabsEnums: ResourceTabsEnum[] = [ResourceTabsEnum.Routes, ResourceTabsEnum.Services, ResourceTabsEnum.Validations];


interface IProps {
    start: number;
    end: number;
    tab: ResourceTabsEnum;
}

export const ResourceTable: React.FC<IProps> = React.memo(({ start, end, tab }) => {

    const router = useRouter()

    const onPagination = useMemoCall((start: number, end: number) => {

        router.push(`/resources/?start=${start}&end=${end}&tab=${tab}`);
    });

    const resource = useResourceProps(tab, start, end)

    // console.log(resource)
    // // const maxRowCount = 26;
    return <>
        <TableTabs
            {...resource}
            tabs={resourceTabsEnums}
            tab={tab}
            getTabProps={(tab) => {
                return {
                    href: `/resources/?tab=${tab}`,
                    component: Link,
                    label: tab,
                    value: tab,
                }
            }}
            rowsPerPageOptions={[5, 10, 30, 60, 100, 120]}
            onPagination={onPagination}
            stickyHeader={true}
            stickyFooter={true}
            start={start}
            end={end}
        />
    </>;
});
