"use client"
import React, { ComponentProps } from "react";
import { ServicesTable } from "./table";
import { Pagination } from "@/app/components/pagination";
import { getServiceDocs } from "./server";



export type ServiceTableParams = Pick<ComponentProps<typeof Pagination>, "start" | "end"> & Awaited<ReturnType<typeof getServiceDocs>>

interface IProps extends ServiceTableParams { }
export const ServicesPage: React.FC<IProps> = React.memo((params) => {

  return (
    <>
      <ServicesTable {...params} />
    </>
  );
});
