"use client"
import { TableBody, Table as TableMaterialUi, TablePagination, TableCell } from '@mui/material';
import React, { ReactNode } from "react";
// import { useMemoCall } from '../utils/hooks';
import { useTheme } from '@mui/material/styles';
import { Footer } from './footer';
import { Header } from './header';
import { FooterType, HeaderType, RowType } from './types';
import { RowLine } from './row-line';

interface IProps {
    header?: HeaderType
    footer?: FooterType
    rows?: RowType[]
}
export const Table = (props: IProps) => {
    const {
        header,
        footer,
        rows = []
    } = props;

    const theme = useTheme()


    return <>
        <TableMaterialUi aria-label="table" sx={{ bgcolor: theme.palette.background.paper }}>
            {header && <Header {...header} />}
            <TableBody sx={{ borderCollapse: "collapse" }}>
                {rows.map((row, index) => {
                    return <RowLine key={index} {...row} />
                })}
            </TableBody>
            {footer && <Footer {...footer} />}
        </TableMaterialUi >
    </>
}
