
import React from 'react';
import { RoutesPage, RouteTableParams } from '.';
import { getRouteDocs } from './server';



interface IProps {
    searchParams?: Partial<Pick<RouteTableParams, "start" | "end">>
}
export default async ({ searchParams }: IProps) => {
    let start = Number(searchParams?.start) || 0;
    let end = Number(searchParams?.end) || 15;

    const data = await getRouteDocs(start, end);

    return <>
        <RoutesPage start={start} end={end} {...data} />
    </>
}