import React, { useState } from "react";
import { PaginationType } from "./types";
import { Paper, TableBody, Table as TableMaterialUi, TableContainer, TableHead, TablePagination, TableRow, TableCell, Stack, SxProps, TableFooter } from '@mui/material';
// import { useMemoCall } from '../utils/hooks';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { useMemoCall } from '../../utils/hooks/useMemoCall';
// import { RowOrColumn } from './row-line';
import { Footer } from './footer';
import { Header } from './header';

interface IProps extends PaginationType {
}
export const Pagination: React.FC<IProps> = React.memo(({
    collSize,
    rowsPerPageOptions,
    maxRowCount,
    start,
    end,
    rowsPerPage,
    onPagination
}) => {
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
        <TableRow >
            <TableCell colSpan={collSize} padding="none">
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={maxRowCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                />
            </TableCell>
        </TableRow>
    </>;
});
