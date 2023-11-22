import React, { MouseEvent, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { ValidationPropertyType } from "@/basic/models/validation/validation";
import { IconButton, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
// import { useMemoCall, useToggleBool } from '@/app/utils/hooks';
import { ValidateDataTypesEnums, ValidateValueType, ValidateDataTypes } from '@/basic/models/validation/data-types';
// import { DataTypeEntitiesGeneric, getDataTypeEntities } from '@/basic/models/validation/utils';
import { StringValidateDataTypesEnums } from '@/basic/models/validation/data-types/string';
import { NumberValidateDataTypesEnums } from '@/basic/models/validation/data-types/number';
import { useToggleBool } from '@/app/utils/hooks/useToggleBool';
import { SmallIconButton } from '@/app/components/small-icon-button';
import RemoveIcon from '@mui/icons-material/Remove';


type AllValidateEnums = ValidateDataTypesEnums[] | StringValidateDataTypesEnums[] | NumberValidateDataTypesEnums[]


interface IProps<T extends AllValidateEnums> {
    entityTypes: T
    onChange: (newValue: T[number]) => void
}
export const AddValidationsList = <T extends AllValidateEnums>({ entityTypes, onChange }: IProps<T>) => {
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