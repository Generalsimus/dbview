"use client";
import { ComponentProps, useMemo } from "react";
import { resourceTabsEnums } from "./tab-props/utils";
import { Table } from "@/app/components/table";
import { Stack, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { Pagination } from "@/app/components/pagination";
import { TableTataType } from "./tab-props/hooks";

export type InitialPropsTypes = ComponentProps<typeof Table>;

const useHeaderTabsContent = ({ currentTab, tabsRightContent }: TableTataType) => {
  const tabNamesContent = useMemo(() => resourceTabsEnums.map((tab) => {
    return <Tab
      key={tab}
      href={`/resources/?tab=${tab}`}
      component={Link}
      label={tab}
      value={tab}
    />
  }), []);

  return useMemo(() => {
    return <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="baseline"
      spacing={2}
      padding="10px"
      // width={"100%"}
    >
      <Tabs
        value={currentTab}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="scrollable auto tabs example"
      >
        {tabNamesContent}
      </Tabs>
      {tabsRightContent}
    </Stack>
  }, [currentTab, tabsRightContent])
}

export const useTableHeader = (resource: TableTataType) => {
  const { columns } = resource;
  const headerTabsContent = useHeaderTabsContent(resource)
  return {
    rows: [
      {
        columns: [
          {
            content: headerTabsContent,
            cellProps: {
              padding: "none" as const,
              sx: {
                width: "100%"
              },
              colSpan: columns.length
            }
          }
        ],
      },
      {
        columns: columns
      }
    ],
  };
};





const rowsPerPageOptions = [5, 20, 50, 70, 100]

export const useTableFooter = ({ maxRowCount, columns, start, end }: TableTataType) => {


  return useMemo(() => {
    return {
      rows: [
        {
          columns: [
            {
              content: <Pagination
                start={start}
                end={end}
                onPagination={(start, end) => { }}
                rowsPerPageOptions={rowsPerPageOptions}
                maxRowCount={maxRowCount}
                rowsPerPage={start - end}
              />,
              cellProps: {
                padding: "none" as const,
                align: "right" as const,
                colSpan: columns.length
              }
            }
          ],
          // rowProps: {
          //   colSpan: columns.length
          // }
        }
      ]
    }
  }, [columns, maxRowCount])
}





export const useTableBody = ({ rows }: TableTataType) => {


  return useMemo(() => {
    return {
      rows: rows
    }
  }, [rows])
}