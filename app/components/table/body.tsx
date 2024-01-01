import { TableBody } from '@mui/material';
import React from "react";
import { BodyType } from './types';
import { RowLine } from './row-line';


interface IProps extends BodyType {
}
export const Body: React.FC<IProps> = React.memo(({
    containerProps = {},
    rows = []
}) => {

    return <>
        <TableBody {...containerProps}>
            {rows.map((row, index) => {
                return <RowLine key={index} {...row} />
            })}
        </TableBody>
    </>;
});
