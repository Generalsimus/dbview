import { Paper, TableBody, Table as TableMaterialUi, TableContainer, TableHead, TablePagination, TableRow, TableCell, Stack, SxProps, TableFooter } from '@mui/material';
import React, { Component, ComponentProps, ReactNode, useState } from "react";
// import { useMemoCall } from '../utils/hooks';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { useMemoCall } from '../../utils/hooks/useMemoCall';
import { RowOrColumn } from './row-line';



interface IProps {
    sticky?: boolean
    content?: ReactNode
    columns: RowOrColumn[]
}
export const Header: React.FC<IProps> = React.memo(({ sticky = true, content, columns }) => {

    const stickyHeaderSx = sticky ? { position: "sticky", top: 0 } : {}

    const theme = useTheme()

    return <>
        <TableHead sx={{ ...stickyHeaderSx, bgcolor: theme.palette.background.paper, width: "100%" }}>
            {content && <TableRow>
                <TableCell colSpan={columns.length} padding="none">
                    {content}
                </TableCell>
            </TableRow>}
            <TableRow>
                {columns.map(({ headerName, cellProps }) => {
                    return <TableCell  {...(cellProps || {})}>
                        {headerName}
                    </TableCell>
                })}
            </TableRow>
        </TableHead>
    </>;
});
