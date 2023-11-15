import React, { MouseEvent, useRef } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { ValidationBlockType, validateValueNames } from "@/basic/models/validation/validation";
import { IconButton, Stack } from "@mui/material";
// import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useToggleBool } from '@/app/utils/hooks';


// function renderRow(props: any) {
//     const { index, style } = props;

//     return (
//         <ListItem style={style} key={index} component="div" disablePadding>
//             <ListItemButton>
//                 <ListItemText primary={`Item ${index + 1}`} />
//             </ListItemButton>
//         </ListItem>
//     );
// }

// export default function VirtualizedList() {
//     return (
//         <Box
//             sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
//         >
//             <FixedSizeList
//                 height={400}
//                 width={360}
//                 itemSize={46}
//                 itemCount={200}
//                 overscanCount={5}
//             >
//                 {renderRow}
//             </FixedSizeList>
//         </Box>
//     );
// }
// validateValueNames
// export const schemaSwitchChildSchemas = (type: ValidateValueTypes) => {
//     switch (type) {
//         case ValidateValueTypes.String:
//             return stringValidations
//         case ValidateValueTypes.Number:
//             return numberValidations
//         case ValidateValueTypes.Object:
//             return ObjectValidationSchema
//     }

// }



interface IProps {
    schema?: ValidationBlockType["schema"]
    onChange: (newValue: ValidationBlockType["schema"]) => void
}
export const AddValidationButton: React.FC<IProps> = React.memo(({ }) => {
    const anchorElRef = useRef<HTMLButtonElement | null>(null);


    const [open, initDefaultValue] = useToggleBool(false)

    const handleClose = initDefaultValue(false)
    const handleOpen = initDefaultValue(true)

    return <>
        <Menu
            id="fade-menu"
            MenuListProps={{
                'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorElRef.current}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
        >
            {validateValueNames.map(validateName => {
                return <MenuItem onClick={handleClose}>{validateName}</MenuItem>
            })}
        </Menu>
        <Stack display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <IconButton ref={anchorElRef} onClick={handleOpen}>
                <AddIcon />
            </IconButton>
        </Stack>
    </>;
});
{/* <PopupState variant="popover" popupId="demo-popup-menu">
  {(popupState) => (
    <React.Fragment>
      <Button variant="contained" {...bindTrigger(popupState)}>
        Dashboard
      </Button>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close}>Profile</MenuItem>
        <MenuItem onClick={popupState.close}>My account</MenuItem>
        <MenuItem onClick={popupState.close}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  )}
</PopupState> */}