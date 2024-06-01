// import { Table } from "@mui/material";
import { Table } from "@/app/components/table";
import React, { ComponentProps, useState } from "react";
import { ModelsTable } from "./table";
import { Pagination } from "@/app/components/pagination";

interface IProps
  extends Pick<ComponentProps<typeof Pagination>, "start" | "end"> {}
export const ModelsPage: React.FC<IProps> = React.memo(({ start, end }) => {
  return (
    <>
      <ModelsTable start={start} end={end} />
    </>
  );
});
