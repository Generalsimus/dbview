
import React from 'react';
// import { SaveRouteForm } from '../../tab-props/routes/save';
import { GetServiceDoc } from '../server';
import { SaveServiceForm } from '.';
// import { ResourceTable } from './table';
// import { ResourceTabsEnum, resourceTabsEnums } from './tab-props/utils';
// import { PickOnTopContent } from '../components/pick-on-top/pick-on-top-content';
// import { RoutesPage } from '.';
// import { Pagination } from '@/app/components/pagination';



// export type RoutePaginationParams = 

interface IProps {
    searchParams?: { id?: String }
}
export default async ({ searchParams }: IProps) => {
    const routeId = Number(searchParams?.id)

    const routeDoc = typeof routeId === "number" ? await GetServiceDoc(routeId) : undefined
    const title = typeof routeDoc?.id === "number" ? `Edit Service "${routeDoc.name}"` : "Create Service"
    return <>
        <SaveServiceForm title={title} initialValue={routeDoc} />
    </>
}