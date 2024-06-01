"use client";
import { Table } from "@/app/components/table";
import React, { ComponentProps } from "react";
import { useModelTableBodyRows, useRouteTablePagination } from "./hooks";
import { Pagination } from "@/app/components/pagination";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import { Button, Paper, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";

const cellProps = {
  colSpan: 1,
  sx: {
    fontWeight: "bold",
    width: "calc(100% / 3)",
  },
};

export const modelColumns = [
  { name: "name", content: "Name", cellProps: cellProps },
  { name: "description", content: "Description", cellProps: cellProps },
  { name: "properties", content: "Properties", cellProps: cellProps },
];

interface IProps
  extends Pick<ComponentProps<typeof Pagination>, "start" | "end"> { }
export const ModelsTable: React.FC<IProps> = React.memo(({ start, end }) => {
  const bodyRows = useModelTableBodyRows({ start: start, end: end });

  const paginationRow = useRouteTablePagination({
    start: start,
    end: end,
    maxRowCount: bodyRows?.maxRowCount ?? 0,
  });

  const router = useRouter();
  const onStartCreate = useMemoCall(() => {
    router.push("/resources/models/save");
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
            rows: [{ columns: modelColumns }],
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
