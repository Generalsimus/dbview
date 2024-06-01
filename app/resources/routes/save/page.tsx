
import React from 'react';
import { GetRouteDoc } from '../server';
import { SaveRouteForm } from '.';


interface IProps {
    searchParams?: { id?: String }
}
export default async ({ searchParams }: IProps) => {
    const routeId = Number(searchParams?.id)

    const routeDoc = typeof routeId === "number" ? await GetRouteDoc(routeId) : undefined
    const title = typeof routeDoc?.id === "number" ? `Edit Route "${routeDoc.name}"` : "Create Route"
    return <>
        <SaveRouteForm title={title} initialValue={routeDoc} />
    </>
}