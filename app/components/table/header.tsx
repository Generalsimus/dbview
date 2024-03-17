import { Paper, TableBody, Table as TableMaterialUi, TableContainer, TableHead, TablePagination, TableRow, TableCell, Stack, SxProps, TableFooter } from '@mui/material';
import React, { Component, ComponentProps, ReactNode, useState } from "react";
// import { useMemoCall } from '../utils/hooks';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
// import { useMemoCall } from '../../utils/hooks/useMemoCall';
// import { RowOrColumn } from './row-line';
import { HeaderType } from './types';
import { RowLine } from './row-line';


// sticky?: boolean
//     content?: Content,
//     titleRow?: RowType
interface IProps extends HeaderType {
}
export const Header: React.FC<IProps> = React.memo(({

    containerProps = {},
    rows = [],
}) => {

    return <>
        <TableHead  {...containerProps}  >
            {rows.map((row, index) => {
                return <RowLine key={index} {...row} />
            })}
        </TableHead>
    </>;
});
