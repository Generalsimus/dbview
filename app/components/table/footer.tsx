"use client"
import { Paper, TableBody, Table as TableMaterialUi, TableContainer, TableHead, TablePagination, TableRow, TableCell, Stack, SxProps, TableFooter } from '@mui/material';
import React, { ReactNode, useState } from "react";
// import { useMemoCall } from '../utils/hooks';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { useMemoCall } from '../../utils/hooks/useMemoCall';
import { Header } from './header';
import { FooterType } from './types';
import { Pagination } from './pagination';
import { RowLine } from './row-line';
// import { RowOrColumn } from './row-line';


// type TablePaginationProps = React.ComponentProps<typeof TablePagination>

interface IProps extends FooterType {
    // sticky?: boolean
    // content?: ReactNode
    // columns: RowOrColumn[],
    // start: number,
    // end: number,
    // onPagination: (start: number, end: number) => void,
    // rowsPerPageOptions: TablePaginationProps["rowsPerPageOptions"]
    // maxRowCount: TablePaginationProps["count"]
    // rowCount: number
}
export const Footer: React.FC<IProps> = React.memo(({
    sticky,
    content,
    pagination
}) => {
    const stickyFooterSx = sticky ? { position: "sticky", bottom: 0 } : {}

    const theme = useTheme();

    return <>
        <TableFooter sx={{ ...stickyFooterSx, bgcolor: theme.palette.background.paper, width: "100%" }}>
            {pagination && <Pagination {...pagination} />}
            {content && <RowLine  {...content} />}
        </TableFooter>
    </>;
});
