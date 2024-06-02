"use client"
import { TableFooter } from '@mui/material';
import React from "react";
import { FooterType } from './types';
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
