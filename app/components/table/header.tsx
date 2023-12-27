import { Paper, TableBody, Table as TableMaterialUi, TableContainer, TableHead, TablePagination, TableRow, TableCell, Stack, SxProps, TableFooter } from '@mui/material';
import React, { Component, ComponentProps, ReactNode, useState } from "react";
// import { useMemoCall } from '../utils/hooks';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { useMemoCall } from '../../utils/hooks/useMemoCall';
// import { RowOrColumn } from './row-line';
import { HeaderType } from './types';
import { RowLine } from './row-line';


// sticky?: boolean
//     content?: Content,
//     titleRow?: RowType
interface IProps extends HeaderType {
}
export const Header: React.FC<IProps> = React.memo(({ sticky = true, content, titleRow }) => {

    const stickyHeaderSx = sticky ? { position: "sticky", top: 0 } : {}

    const theme = useTheme()
    // console.log({ sticky, content, titleRow })
    return <>
        <TableHead sx={{ ...stickyHeaderSx, bgcolor: theme.palette.background.paper, width: "100%" }}>
            {content && <RowLine  {...content} />}
            {titleRow && <RowLine  {...titleRow} />}
            {/* {titleRow && <TableRow>
                <TableCell colSpan={headerContent.rowSize} padding="none">
                    {headerContent.content}
                </TableCell>
            </TableRow>} */}
            {/* {titleRow && <TableRow {...(titleRow.tableRowProps || {})}>
                {titleRow.columns.map(({ headerName, cellProps }) => {
                    return <TableCell  {...(cellProps || {})}>
                        {headerName}
                    </TableCell>
                })}
            </TableRow>} */}
        </TableHead>
    </>;
});
