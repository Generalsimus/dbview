import React from 'react';
import { ServicesPage, ServiceTableParams } from '.';
import { getServiceDocs } from './server';



interface IProps {
    searchParams?: Partial<Pick<ServiceTableParams, "start" | "end">>
}
export default async ({ searchParams }: IProps) => {
    let start = Number(searchParams?.start) || 0;
    let end = Number(searchParams?.end) || 15;

    const data = await getServiceDocs(start, end);

    return <>
        <ServicesPage start={start} end={end} {...data} />
    </>
}