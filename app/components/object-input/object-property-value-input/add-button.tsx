import React, { useMemo, useRef } from 'react';

import { Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useToggleBool } from '@/utils/hooks/useToggleBool';
import { SmallIconButton } from '@/app/components/small-icon-button';


interface IProps<S extends any[]> {
    options: S
    onAdd: (newValue: S[number]) => void,
    alreadyChoose?: S[number][]
}
export const AddButton = React.memo(<S extends any[]>({ options, onAdd, alreadyChoose = [] }: IProps<S>) => {

    const anchorElRef = useRef<HTMLButtonElement | null>(null);

    const [open, initDefaultValue] = useToggleBool(false)

    const handleClose = initDefaultValue(false)
    const handleOpen = initDefaultValue(true)

    const saveOptions = useMemo(() => {
        return options.filter(e => !alreadyChoose.includes(e));
    }, [...options, ...alreadyChoose])

    // console.log({ saveOptions, options })

    return <>
        {saveOptions.length ? <>
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
                {saveOptions.map(entityType => {
                    return <MenuItem onClick={() => {
                        onAdd(entityType)
                        handleClose()
                    }}>{entityType + ""}</MenuItem>

                })}
            </Menu>
        </> : null}
    </>;
})