"use client"
import { Paper, TableBody, Table as TableMaterialUi, TableContainer, TableHead, TablePagination, TableRow, TableCell, Stack, SxProps, TableFooter } from '@mui/material';
import React, { ReactNode, useState } from "react";
// import { useMemoCall } from '../utils/hooks';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { useMemoCall } from '../../utils/hooks/useMemoCall';
import { Header } from './header';
import { RowOrColumn } from './row-line';


type TablePaginationProps = React.ComponentProps<typeof TablePagination>

interface IProps {
    sticky?: boolean
    content?: ReactNode
    columns: RowOrColumn[],
    start: number,
    end: number,
    onPagination: (start: number, end: number) => void,
    rowsPerPageOptions: TablePaginationProps["rowsPerPageOptions"]
    maxRowCount: TablePaginationProps["count"]
    rowCount: number
}
export const Footer: React.FC<IProps> = React.memo(({
    sticky,
    content,
    columns,
    start,
    end,
    rowsPerPageOptions,
    maxRowCount,
    rowCount,
    onPagination
}) => {
    const stickyFooterSx = sticky ? { position: "sticky", bottom: 0 } : {}

    const theme = useTheme();
    const page = Math.floor(start / (end - start))

    const onPageChange = useMemoCall((event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {

        const pageDiff = newPage - page;
        const pagDocSize = (end - start) * pageDiff;


        onPagination(start + pagDocSize, end + pagDocSize);
    })

    const onRowsPerPageChange = useMemoCall((event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value)
        onPagination(start, start + newRowsPerPage)
    })
    return <>

        <TableFooter sx={{ ...stickyFooterSx, bgcolor: theme.palette.background.paper, width: "100%" }}>
            <TableRow >
                <TableCell colSpan={columns.length} padding="none">
                    <TablePagination
                        rowsPerPageOptions={rowsPerPageOptions}
                        component="div"
                        count={maxRowCount}
                        rowsPerPage={rowCount + 1}
                        page={page}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={onRowsPerPageChange}
                    />
                </TableCell>
            </TableRow>
            {content && <TableRow >
                <TableCell colSpan={columns.length} padding="none">
                    {content}
                </TableCell>
            </TableRow>}
        </TableFooter>
    </>;
});
