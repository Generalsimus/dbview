"use client"
import { TableFooter } from '@mui/material';
import React from "react";
import { useTheme } from '@mui/material/styles';
import { FooterType } from './types';
import { Pagination } from '../pagination';
import { RowLine } from './row-line';

interface IProps extends FooterType {
}
export const Footer: React.FC<IProps> = React.memo(({
    containerProps = {},
    rows = [],
}) => {

    return <>
        <TableFooter  {...containerProps} >
            {rows.map((row, index) => {
                return <RowLine key={index} {...row} />
            })}
        </TableFooter>
    </>;
});
