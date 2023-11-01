import * as React from 'react';
import { Table } from './widget/table';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { AddRoutePath } from './components/add-route-path-modal';



export default function BasicTable() {
  return <>

    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="baseline"
      spacing={2}
    >
      <div />


      <AddRoutePath routePath="/" />
    </Stack>
    <Table />
  </>
}