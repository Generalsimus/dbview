"use client"
import { Paper, TableBody, Table as TableMaterialUi, TableContainer, TableHead, TablePagination, TableRow, TableCell, Stack, SxProps, TableFooter } from '@mui/material';
import React, { ReactNode, useState } from "react";
import { useMemoCall } from '../utils/hooks';
import { useTheme } from '@mui/material/styles';
type TablePaginationProps = React.ComponentProps<typeof TablePagination>
type TableCellProps = React.ComponentProps<typeof TableCell>

type IProps<O extends Record<any, ReactNode>> = {
    columns: { headerName: ReactNode, field: keyof O | string }[]
    rows: O[]

    rowsPerPageOptions: TablePaginationProps["rowsPerPageOptions"]
    start: number,
    end: number,
    maxRowCount: TablePaginationProps["count"]
    onPagination: (start: number, end: number) => void

    stickyHeader?: boolean
    stickyFooter?: boolean
    headerContent?: ReactNode
    footerContent?: ReactNode

    headerColumnProps?: TableCellProps
    rowColumnProps?: TableCellProps
    // onPageChange: TablePaginationProps["onPageChange"]
    // onRowsPerPageChange: TablePaginationProps["onRowsPerPageChange"]

}
export const Table = <O extends Record<any, any>>(props: IProps<O>) => {
    const {
        columns,
        rows,
        maxRowCount,
        start,
        end,
        rowsPerPageOptions,
        onPagination,
        stickyFooter,
        stickyHeader,
        headerContent,
        footerContent,
        headerColumnProps = {},
        rowColumnProps = {},
    } = props;
    const page = Math.floor(start / (end - start))
    // console.log({ page })

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
    // console.log({ theme })
    const stickyHeaderSx = stickyFooter ? { position: "sticky", top: 0 } : {}
    const stickyFooterSx = stickyHeader ? { position: "sticky", bottom: 0 } : {}

    return <>
        <TableMaterialUi aria-label="table" sx={{ bgcolor: theme.palette.background.paper, }}>
            <TableHead sx={{ ...stickyHeaderSx, bgcolor: theme.palette.background.paper, width: "100%" }}>
                {headerContent && <TableRow>
                    <TableCell colSpan={columns.length} padding="none">
                        {headerContent}
                    </TableCell>
                </TableRow>}
                <TableRow>
                    {columns.map(({ headerName }) => {
                        return <TableCell {...headerColumnProps} >
                            {headerName}
                        </TableCell>
                    })}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map(row => {
                    return <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map(column => {
                            return <TableCell {...rowColumnProps}>
                                {row[column.field]}
                            </TableCell>
                        })}
                    </TableRow>
                })}
            </TableBody>
            <TableFooter sx={{ ...stickyFooterSx, bgcolor: theme.palette.background.paper, width: "100%" }}>
                <TableRow >
                    <TableCell colSpan={columns.length} padding="none">
                        <TablePagination
                            rowsPerPageOptions={rowsPerPageOptions}
                            component="div"
                            count={maxRowCount}
                            rowsPerPage={rows.length + 1}
                            page={page}
                            onPageChange={onPageChange}
                            onRowsPerPageChange={onRowsPerPageChange}
                        />
                    </TableCell>
                </TableRow>
                {footerContent && <TableRow >
                    <TableCell colSpan={columns.length} padding="none">
                        {footerContent}
                    </TableCell>
                </TableRow>}
            </TableFooter>
        </TableMaterialUi >
        {/* <Paper>
            <TableContainer>
                <TableMaterialUi stickyHeader aria-label="sticky table" sx={{ position: "sticky", top: 0 }}>
                    <TableHead >
                        <TableRow>
                            {columns.map((column) => {
                                return <TableCell align={column.align || "left"} >
                                    {column.headerName}
                                </TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => {
                            return <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map(column => {
                                    return <TableCell align={column.align || "left"}>
                                        {row[column.field]}
                                    </TableCell>
                                })}
                            </TableRow>
                        })}
                    </TableBody>
                </TableMaterialUi>
            </TableContainer>
            <TablePagination
                // sx={{ direction: "row", justifyContent: "flex-end", position: "sticky", bottom: 0, zIndex: 2, bgcolor: "white" }}
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={maxRowCount}
                rowsPerPage={rows.length + 1}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </Paper> */}
    </>
}
