"use client"
import React, { useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { Stack, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Slide from '@mui/material/Slide';
import Switch from '@mui/material/Switch';

import CardContent from '@mui/material/CardContent';

const actions = [
  { icon: <FileCopyIcon />, name: <strong>Copy</strong> },
  { icon: <SaveIcon />, name: <strong>Save</strong> },
  { icon: <PrintIcon />, name: <strong>Print</strong> },
  { icon: <ShareIcon />, name: <strong>Auto Save ON</strong> },
];

interface IProps {
}
export const SettingsView: React.FC<IProps> = React.memo(({ }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* <Backdrop open={open} /> */}
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        // sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SettingsIcon />}
        sx={{
          "&:hover svg": { transform: "scale(1.5) rotate(90deg)" },
          "& svg ": { transform: "scale(1.5)", transition: "ease-in-out .4s" },
          position: 'fixed', bottom: 16, right: 16
        }}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >

        <Stack overflow={"hidden"}>
          <Slide in={open} direction='up'>
            <Card variant="outlined">
              <CardContent>
                <Stack display={"flex"} flexDirection={"row"} alignItems={"center"}>
                  <Switch defaultChecked />
                  <Typography fontSize={15} fontWeight={"bold"} >Auto Build</Typography>
                </Stack>

              </CardContent>
            </Card>
          </Slide>
        </Stack>
        {/* {<Grow in={open}>
          <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
            ACTion

          </Paper>
        </Grow>} */}
        {/* {actions.map((action) => (
          <SpeedDialAction
            // key={action.name}
            sx={{ textWrap: "nowrap" }}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          />
        ))} */}
      </SpeedDial>
    </>
  );
});
