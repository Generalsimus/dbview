import React, { ComponentProps, ReactNode } from "react";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import { TableBody, TableFooter, TableHead, TableRow } from "@mui/material";

export interface ColumnType {
  content?: ReactNode;
  cellProps?: ComponentProps<typeof TableCell>;
}

export interface RowType {
  columns: ColumnType[];
  rowProps?: ComponentProps<typeof TableRow>;
  //   collapseProps?: ComponentProps<typeof Collapse>;
}

interface Content<Container extends React.FC> {
  containerProps?: ComponentProps<Container>;
  rows?: RowType[];
}

export interface HeaderType extends Content<typeof TableHead> {}
export interface BodyType extends Content<typeof TableBody> {}
export interface FooterType extends Content<typeof TableFooter> {}
