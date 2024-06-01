"use client";
import { Table } from "@/app/components/table";
import React, { ComponentProps } from "react";
import {    useServiceTableBodyRows, useServiceTablePagination } from "./hooks";
import { Pagination } from "@/app/components/pagination";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import { Button, Paper, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";

const cellProps = {
  colSpan: 1,
  sx: {
    fontWeight: "bold",
    width: `calc(100% / 3)`,
  },
};
export const servicesColumns = [
  { name: "name", content: "Name", cellProps: cellProps },
  { name: "description", content: "Description", cellProps: cellProps },
  { name: "methods", content: "Methods", cellProps: cellProps },
] as const;

interface IProps
  extends Pick<ComponentProps<typeof Pagination>, "start" | "end"> {}
export const ServicesTable: React.FC<IProps> = React.memo(({ start, end }) => {
  const bodyRows = useServiceTableBodyRows({ start: start, end: end });

  const paginationRow = useServiceTablePagination({
    start: start,
    end: end,
    maxRowCount: bodyRows?.maxRowCount ?? 0,
  });

  const router = useRouter();
  const onStartCreate = useMemoCall(() => {
    router.push("/resources/services/save");
  });
  return (
    <>
      <Paper elevation={3}>
        <Stack
          sx={{ p: 1 }}
          direction="row"
          useFlexGap
          justifyContent={"flex-end"}
        >
          <Button
            variant="contained"
            startIcon={<LocalHospitalOutlinedIcon />}
            onClick={onStartCreate}
            size="small"
          >
            Create
          </Button>
        </Stack>
        <Table
          header={{
            rows: [{ columns: servicesColumns }],
          }}
          footer={{
            rows: [paginationRow],
          }}
          body={bodyRows}
        />
      </Paper>
    </>
  );
});
