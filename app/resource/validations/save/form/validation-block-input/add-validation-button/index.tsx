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
import { useToggleBool } from '@/app/utils/hooks';
import { ValidateAllEnums, getValidateHierarchy } from '@/basic/models/validation/utils';
import { ValidationsList } from './validations-list';




interface IProps {
    schema?: ValidationBlockType["schema"]
    onChange: (newValue: ValidationBlockType["schema"]) => void
}
export const AddValidationButton: React.FC<IProps> = React.memo(({ schema, onChange }) => {
    const anchorElRef = useRef<HTMLButtonElement | null>(null);


    const [open, initDefaultValue] = useToggleBool(false)

    const handleClose = initDefaultValue(false)
    const handleOpen = initDefaultValue(true)

    const type = useMemo(() => {
        const getLastValue = <T extends unknown>(type: { type: T }) => { }
        if (schema) {
            let initSchema: any = schema.value;
            while (true) {
                if (initSchema.type) {

                }
                // //     currentSchema.value
            }
            // return schema.value
        }
        // if (schema.]) {

        // }
    }, [schema])
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
            <ValidationsList />
            {/* {getValidateHierarchy().map(validateName => {
                return <MenuItem onClick={handleClose}>{validateName}</MenuItem>
            })} */}
        </Menu>
        <Stack display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <IconButton ref={anchorElRef} onClick={handleOpen}>
                <AddIcon />
            </IconButton>
        </Stack>
    </>;
}); 