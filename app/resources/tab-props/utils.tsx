"use client";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
// import { TableTabs } from "@/app/components/table-tabs";
import { getRouteResource } from "./routes";
import { ColumnType, RowType } from "@/app/components/table/types";
import { getServiceResource } from "./services";
import { Service } from "@/basic/models/services/services";
import { Route } from "@/basic/models/route/route";
import { TableTataType } from "./hooks";
import { getValidationResource } from "./validations";

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

// interface GetEmptyTablePropsArgs {
//   titleRow: RowType;
//   start: number;
//   end: number;
//   tab: ResourceTabsEnum;
//   rightSideContent?: ReactNode;
//   tabCellProps: ColumnType["cellProps"];
// }
// export const getEmptyTableProps = ({
//   titleRow,
//   start,
//   end,
//   tab,
//   rightSideContent,
// }: GetEmptyTablePropsArgs): ComponentProps<typeof Table> => {
//   const pagination = {
//     collSize: titleRow.columns.length,
//     start: start,
//     end: end,
//     onPagination: () => { },
//     rowsPerPageOptions: [1],
//     rowsPerPage: 0,
//     maxRowCount: 0,
//   };

//   return {
//     // tab: tab,
//     // getTabProps: (tab) => {
//     //   return 
//     // },
//     rightSideContent: <Stack
//       direction="row"
//       justifyContent="space-between"
//       alignItems="baseline"
//       spacing={2}
//       padding="10px"
//     >
//       <Tabs
//         value={tab}
//         variant="scrollable"
//         scrollButtons="auto"
//         allowScrollButtonsMobile
//         aria-label="scrollable auto tabs example"
//       >
//         {resourceTabsEnums.map((tab) => {
//           return <Tab
//             key={tab}
//             href={`/resources/?tab=${tab}`}
//             component={Link}
//             label={tab}
//             value={tab}
//           />
//         })}
//       </Tabs>
//     </Stack>,
//     rows: [],
//     header: {
//       sticky: true,
//       titleRow: titleRow,
//       // content: {

//       // }
//       // content?: Content,
//       //         titleRow?: RowType
//     },
//     footer: {
//       sticky: true,
//       pagination: pagination,
//     },
//   };
// };

// export const getTableProps = (
//   tab: ResourceTabsEnum,
//   start: number,
//   end: number,
//   setTableProps: (newValue: InitialPropsTypes) => void
// ) => {
//   switch (tab) {
//     case ResourceTabsEnum.Routes:
//       return getRouteProps(start, end, setTableProps);
//     case ResourceTabsEnum.Services:
//       return getServicesProps(start, end, setTableProps);
//     case ResourceTabsEnum.Validations:
//       return getValidationProps(start, end, setTableProps);
//   }
//   return getRouteProps(start, end, setTableProps);
// };

// const getBasicHeaderContent = (): HeaderType => {
//   return {
//     sticky: true,

//     // titleRow: {
//     //   sticky: true
//     //   content?: Content,
//     //   titleRow?: RowType
//     // }
//     // content: {

//     // }
//     // content?: Content,
//     //         titleRow?: RowType
//   }
// }
export interface ResourceData<DOC extends Record<PropertyKey, undefined | any>, RES = { docs: DOC[], maxDocsCount: number }> {
  start: number,
  end: number,
  resource: Promise<RES>,
  columns: ColumnType[],
  updateRows: (res: RES, setData: Dispatch<SetStateAction<TableTataType>>) => void,
  tabsRightContent?: ReactNode
}
export const getResourceData = (
  tab: ResourceTabsEnum,
  start: number,
  end: number,
) => {
  switch (tab) {
    case ResourceTabsEnum.Routes:
      return getRouteResource(start, end);
    case ResourceTabsEnum.Services:
      return getServiceResource(start, end);
    case ResourceTabsEnum.Validations:
      return getValidationResource(start, end);
  };

  return getRouteResource(start, end);
}