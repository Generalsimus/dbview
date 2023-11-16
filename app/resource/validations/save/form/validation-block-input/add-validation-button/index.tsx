import React, { MouseEvent, useMemo, useRef } from 'react';
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
import { useMemoCall, useToggleBool } from '@/app/utils/hooks';
import { ValidateAllEnums, getValidateHierarchy } from '@/basic/models/validation/utils';
import { ValidationsList } from './validations-list';


// const gget = <O extends unknown>(obj?: O) => {
//     if (obj) {
//         if (obj.s)
//     }
// }

interface IProps {
    schemas?: ValidationBlockType["schemas"]
    onChange: (newValue: ValidationBlockType["schemas"]) => void
}
export const AddValidationButton: React.FC<IProps> = React.memo(({ schemas, onChange }) => {
    const anchorElRef = useRef<HTMLButtonElement | null>(null);


    const [open, initDefaultValue] = useToggleBool(false)

    const handleClose = initDefaultValue(false)
    const handleOpen = initDefaultValue(true)


    const onChangeType = useMemoCall((type: ValidateAllEnums) => {

    });
    console.log({ schemas })
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
            {schemas ? schemas.map(el => {
                return <ValidationsList type={el.type} onChange={onChangeType} />
            }) : <ValidationsList type={undefined} onChange={onChangeType} />}
        </Menu>
        <Stack display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <IconButton ref={anchorElRef} onClick={handleOpen}>
                <AddIcon />
            </IconButton>
        </Stack>
    </>;
}); 