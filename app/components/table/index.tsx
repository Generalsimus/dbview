"use client"
import { TableBody, Table as TableMaterialUi, TablePagination, TableCell } from '@mui/material';
import React, { ReactNode } from "react";
// import { useMemoCall } from '../utils/hooks';
import { useTheme } from '@mui/material/styles';
import { Footer } from './footer';
import { Header } from './header';
import { BodyType, FooterType, HeaderType, RowType } from './types';
import { RowLine } from './row-line';
import { Body } from './body';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

interface IProps {
    header?: HeaderType
    footer?: FooterType
    body?: BodyType
}
export const Table = (props: IProps) => {
    const {
        header,
        footer,
        body
    } = props;

    const theme = useTheme()


    return <>
        <TableContainer component={Paper}>
            <TableMaterialUi aria-label="table" >
                {header && <Header {...header} />}
                {body && <Body {...body} />}
                {footer && <Footer {...footer} />}
            </TableMaterialUi >
        </TableContainer>
    </>
}
