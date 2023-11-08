"use client"
import React from 'react';
import { default as TableMaterialUi } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];




interface IProps {
  columns: string[]
  rows: string[][]
}
export const Table: React.FC<IProps> = React.memo(({ columns, rows }) => {


  return (
    <TableContainer component={Paper}>
      <TableMaterialUi sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(e => {
              return <TableCell>{e}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(e => {
            return <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {e.map(e => {
                return <TableCell align="left">{e}</TableCell>
              })}

            </TableRow>
          })}
        </TableBody>
      </TableMaterialUi>
    </TableContainer>
  );
});