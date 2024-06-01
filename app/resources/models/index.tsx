"use client"
import React, { ComponentProps, useState } from "react";
import { ModelsTable } from "./table";
import { Pagination } from "@/app/components/pagination";
import { getModelDocs } from "./server";


export type ModelTableParams = Pick<ComponentProps<typeof Pagination>, "start" | "end"> & Awaited<ReturnType<typeof getModelDocs>>

interface IProps extends ModelTableParams { }
export const ModelsPage: React.FC<IProps> = React.memo((params) => {

  return (
    <>
      <ModelsTable {...params} />
    </>
  );
});
