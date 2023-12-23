import React, { ComponentProps, ReactNode, useState } from "react";
import TableCell from '@mui/material/TableCell';
import Collapse from '@mui/material/Collapse';
import { useToggleBool } from "@/app/utils/hooks/useToggleBool";

export interface RowOrColumn {
    field: string | number,
    headerName?: ReactNode,
    cellProps?: ComponentProps<typeof TableCell>
    collapseProps?: ComponentProps<typeof Collapse>
    // isCollapsible?: boolean
    colum
}

interface IProps extends RowOrColumn {
    // line: RowOrColumn
}
export const RowLine: React.FC<IProps> = React.memo(({ field, headerName, cellProps = {}, collapseProps }) => {
    // const [isCollapsed, toggleCollapse] = useToggleBool(false)
    const isCollapsible = collapseProps !== undefined
    return <>
        <TableCell  {...cellProps}>
            {isCollapsible ? <Collapse in={isCollapsible} timeout="auto" unmountOnExit>

            </Collapse> : null}
            {/* <Collapse in={isCollapsible} timeout="auto" unmountOnExit>

            </Collapse> */}
        </TableCell>

    </>;
});
