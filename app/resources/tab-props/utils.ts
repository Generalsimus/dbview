import { TableTabs } from "@/app/components/table-tabs";
import { RowType } from "@/app/components/table/types";
import { ComponentProps, ReactNode } from "react";
import { getRouteProps } from "./routes";
import { getValidationProps } from "./validations";
import { InitialPropsTypes } from "./hooks";
import Link from "next/link";
import { getServicesProps } from "./services";

export const enum ResourceTabsEnum {
  Routes = "Routes",
  Validations = "Validations",
  Services = "Services",
}
export const resourceTabsEnums: ResourceTabsEnum[] = [
  ResourceTabsEnum.Routes,
  ResourceTabsEnum.Services,
  ResourceTabsEnum.Validations,
];

interface GetEmptyTablePropsArgs {
  titleRow: RowType;
  start: number;
  end: number;
  tab: ResourceTabsEnum;
  rightSideContent?: ReactNode; 
}
export const getEmptyTableProps = ({
  titleRow,
  start,
  end,
  tab,
  rightSideContent,
}: GetEmptyTablePropsArgs): ComponentProps<typeof TableTabs> => {
  const pagination = {
    collSize: titleRow.columns.length,
    start: start,
    end: end,
    onPagination: () => {},
    rowsPerPageOptions: [1],
    rowsPerPage: 0,
    maxRowCount: 0,
  };

  return {
    tab: tab,
    tabs: resourceTabsEnums,
    getTabProps: (tab) => {
      return {
        href: `/resources/?tab=${tab}`,
        component: Link,
        label: tab,
        value: tab,
      };
    },
    rightSideContent: rightSideContent,
    rows: [],
    header: {
      sticky: true,
      titleRow: titleRow,
      // content: {

      // }
      // content?: Content,
      //         titleRow?: RowType
    },
    footer: {
      sticky: true,
      pagination: pagination,
    },
  };
};

export const getTableProps = (
  tab: ResourceTabsEnum,
  start: number,
  end: number,
  setTableProps: (newValue: InitialPropsTypes) => void
) => {
  switch (tab) {
    case ResourceTabsEnum.Routes:
      return getRouteProps(start, end, setTableProps);
    case ResourceTabsEnum.Services:
      return getServicesProps(start, end, setTableProps);
    case ResourceTabsEnum.Validations:
      return getValidationProps(start, end, setTableProps);
  }
  return getRouteProps(start, end, setTableProps);
};
