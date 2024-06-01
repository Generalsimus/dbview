import { Table } from "@/app/components/table";
import React, { ComponentProps, useState } from "react";
import { ServicesTable } from "./table";
import { Pagination } from "@/app/components/pagination";

interface IProps
  extends Pick<ComponentProps<typeof Pagination>, "start" | "end"> { }
export const ModelsPage: React.FC<IProps> = React.memo(({ start, end }) => {
  return (
    <>
      <ServicesTable start={start} end={end} />
    </>
  );
});
