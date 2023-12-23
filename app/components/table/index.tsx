"use client"
import { Paper, TableBody, Table as TableMaterialUi, TableContainer, TableHead, TablePagination, TableRow, TableCell, Stack, SxProps, TableFooter } from '@mui/material';
import React, { ReactNode, useState } from "react";
// import { useMemoCall } from '../utils/hooks';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { useMemoCall } from '../../utils/hooks/useMemoCall';
import { RowOrColumn } from './row-line';
import { Footer } from './footer';
import { Header } from './header';
type TablePaginationProps = React.ComponentProps<typeof TablePagination>
type TableCellProps = React.ComponentProps<typeof TableCell>

type IProps<O extends Record<any, ReactNode>> = {
    columns?: RowOrColumn[]
    rows?: RowOrColumn[]

    rowsPerPageOptions: TablePaginationProps["rowsPerPageOptions"]
    maxRowCount?: TablePaginationProps["count"]
    start?: number,
    end?: number,
    onPagination: (start: number, end: number) => void

    stickyHeader?: boolean
    stickyFooter?: boolean
    headerContent?: ReactNode
    footerContent?: ReactNode
    isLoading?: boolean

    // headerColumnProps?: TableCellProps
    // rowColumnProps?: TableCellProps
    // onPageChange: TablePaginationProps["onPageChange"]
    // onRowsPerPageChange: TablePaginationProps["onRowsPerPageChange"]

}
export const Table = <O extends Record<any, any>>(props: IProps<O>) => {
    const {
        columns = [],
        rows = [],
        maxRowCount = 0,
        start = 0,
        end = 0,
        rowsPerPageOptions,
        onPagination,
        stickyFooter,
        stickyHeader,
        headerContent,
        footerContent,
        isLoading
    } = props;
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

    const theme = useTheme()

    const stickyHeaderSx = stickyFooter ? { position: "sticky", top: 0 } : {}
    const stickyFooterSx = stickyHeader ? { position: "sticky", bottom: 0 } : {}

    return <>
        <TableMaterialUi aria-label="table" sx={{ bgcolor: theme.palette.background.paper }}>
            <Header sticky={stickyHeader} content={headerContent} columns={columns} />
            <TableBody sx={{ borderCollapse: "collapse" }}>
                {isLoading ? <TableRow role="checkbox">
                    <TableCell colSpan={columns.length} padding="none"  >
                        <Stack display={"flex"} flex={1} justifyContent={"center"} alignItems={"center"} padding={15}>
                            <CircularProgress color="inherit" size={100} />
                        </Stack>
                    </TableCell>
                </TableRow> : rows.map((row, index) => {
                    return <TableRow key={index} hover role="checkbox" tabIndex={-1} >
                        {columns.map(column => {
                            return <TableCell key={column.field} {...(row.cellProps || {})}>
                                {row[column.field]}
                            </TableCell>
                        })}
                    </TableRow>
                })}
            </TableBody>
            <Footer
                sticky={stickyFooter}
                content={footerContent}
                columns={columns}
                start={start}
                end={start}
                onPagination={onPagination}
                rowsPerPageOptions={rowsPerPageOptions}
                rowCount={rows.length}
                maxRowCount={maxRowCount}
            />
        </TableMaterialUi >
    </>
}
