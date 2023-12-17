import React, { useState } from "react";
import { Header } from "./header";
import { ServicesTable } from "./services-table";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Service } from "@/basic/models/services/services";

interface IProps {
    searchParams?: {
      start: string;
      end: string;
    }
  }
  export default async ({ searchParams }: IProps) => {
    let start = Number(searchParams?.start) || 0;
    let end = Number(searchParams?.end) || 15;
  
    async function saveServiceDoc(value: MakeCreateOrUpdate<Service>): Promise<void> {
        'use server'

    }
    async function deleteServiceDoc(id: number): Promise<void> {
        'use server'
    }
    return <>
    <ServicesTable
      headerContent={
        <Header
        saveServiceDoc={saveServiceDoc}
        deleteServiceDoc={deleteServiceDoc}
        />
      }
      services={[]}
      start={start}
      end={end}
      saveServiceDoc={saveServiceDoc}
      deleteServiceDoc={deleteServiceDoc}
      maxRowSize={15}
    />
    </>;
};
