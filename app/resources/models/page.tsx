
import React from 'react';
import { ModelsPage, ModelTableParams } from '.';
import { getModelDocs } from './server';




interface IProps {
    searchParams?: Partial<Pick<ModelTableParams, "start" | "end">>
}
export default async ({ searchParams }: IProps) => {
    let start = Number(searchParams?.start) || 0;
    let end = Number(searchParams?.end) || 15;

    const data = await getModelDocs(start, end)

    return <>
        <ModelsPage start={start} end={end} {...data} />
    </>
}