'use client';
import { ComponentProps, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { ResourceTabsEnum } from "../table";
import { TableTabs } from "@/app/components/table-tabs";
import { getRouteProps } from "./routes";
import { getValidationProps } from "./validations";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useParams, useRouter } from "next/navigation";

// const params = useParams<{ tag: string; item: string }>()
// import { NextRouter } from 'next/router';
// 
// import { useRouter } from 'next/router'


export type InitialPropsTypes = Pick<ComponentProps<typeof TableTabs>, "columns" | "rows" | "rightSideContent" | "maxRowCount" | "isLoading">
// export interface ResourceProps {
//     awaitProps: Promise<Partial<InitialPropsTypes>>
//     staticProps: Partial<InitialPropsTypes>
// }
export const useResourceProps = (tab: ResourceTabsEnum, start: number, end: number) => {
    const [resource, setResource] = useState<InitialPropsTypes>({});
    const params = useParams()


    const OnUpdateTableProps = () => {
        let isEjected = false;
        const setPropSafeEffect = (newValue) => {
            if (!isEjected) {
                setResource(newValue)
            }
        }

        switch (tab) {
            case ResourceTabsEnum.Routes:
                getRouteProps(start, end, setPropSafeEffect);
                break
            case ResourceTabsEnum.Services:

                setResource({})
                break
            case ResourceTabsEnum.Validations:
                getValidationProps(start, end, setPropSafeEffect);
                break
            default:
                setResource({})
        }
        return () => {
            isEjected = true;
        }
    }
    useEffect(OnUpdateTableProps, [params, tab, start, end]);

    return resource;
};

