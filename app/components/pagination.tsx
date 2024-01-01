import React from "react";
import { TablePagination, TablePaginationProps } from '@mui/material';
import { useMemoCall } from '../utils/hooks/useMemoCall';

interface IProps {

    start: number;
    end: number;
    onPagination: (start: number, end: number) => void;
    rowsPerPageOptions: TablePaginationProps["rowsPerPageOptions"];
    maxRowCount: TablePaginationProps["count"];
    rowsPerPage: number;
}
export const Pagination: React.FC<IProps> = React.memo(({
    rowsPerPageOptions,
    maxRowCount,
    start,
    end,
    rowsPerPage,
    onPagination
}) => {
    const page = Math.floor(start / (end - start))

    const onPageChange = useMemoCall((event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {

        const pageDiff = newPage - page;
        const pagDocSize = (end - start) * pageDiff;


        onPagination(start + pagDocSize, end + pagDocSize);
    })

    const onRowsPerPageChange = useMemoCall((event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value)
        onPagination(start, start + newRowsPerPage)
    })
    return <>
        <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={maxRowCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
        />
    </>;
});
