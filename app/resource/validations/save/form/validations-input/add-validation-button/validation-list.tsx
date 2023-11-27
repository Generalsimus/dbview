import React, { useRef } from 'react';

import { Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useToggleBool } from '@/app/utils/hooks/useToggleBool';
import { SmallIconButton } from '@/app/components/small-icon-button';


// type AllValidateEnums = ValidateDataTypesEnums | StringValidateDataTypes | NumberValidateDataTypes


interface IProps<T> {
    entityTypes: T[]
    onChange: (newValue: T) => void
}
export const AddValidationsList = <T extends any>({ entityTypes = [], onChange }: IProps<T>) => {
    const anchorElRef = useRef<HTMLButtonElement | null>(null);

    const [open, initDefaultValue] = useToggleBool(false)

    const handleClose = initDefaultValue(false)
    const handleOpen = initDefaultValue(true)



    return <>
        {entityTypes.length ? <>
            <Stack display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <SmallIconButton ref={anchorElRef} onClick={handleOpen}>
                    <AddIcon />
                </SmallIconButton>
                {/* <IconButton ref={anchorElRef} onClick={handleOpen}>
                    <AddIcon />
                </IconButton> */}
            </Stack>
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
                {entityTypes.map(entityType => {
                    return <MenuItem onClick={() => {
                        onChange(entityType)
                        handleClose()
                    }}>{entityType + ""}</MenuItem>

                })}
            </Menu>
        </> : null}
    </>;
} 