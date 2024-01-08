"use client"
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import React, { ReactNode, createContext, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonBase, Fade, Paper, Stack, Typography, Zoom } from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";


interface PickData {
    icon: ReactNode,
    title: string
    onClick: () => void
}
type PickOnTopContextType = (pick: PickData) => void

export const PickOnTopContext = createContext<PickOnTopContextType>(() => { })

interface IProps {
    children: ReactNode
}
export const PickOnTop: React.FC<IProps> = React.memo(({ children }) => {
    const [pickDataItems, setPickDataItems] = useState<PickData[]>([
        {
            icon: <DeleteIcon />,
            title: "Delete",
            onClick: () => { }
        },
        {
            icon: <DeleteIcon />,
            title: "Delete",
            onClick: () => { }
        },
        {
            icon: <DeleteIcon />,
            title: "Delete",
            onClick: () => { }
        }
    ])

    const addPickDataItem = useMemoCall((newItem: PickData) => {
        setPickDataItems([
            newItem,
            ...pickDataItems,
        ])
    })
    return <PickOnTopContext.Provider value={addPickDataItem}>
        <Stack position="fixed" bottom={20} left={20} gap={1} zIndex={(theme) => theme.zIndex.tooltip}>

            {pickDataItems.map(el => {

                return <Fade in={true}>
                    <Paper elevation={4} >
                        <ButtonBase sx={{ padding: '5px 10px', display: "flex", cursor: "pointer" }}>
                            {el.icon}
                            <Typography>{el.title}</Typography>
                        </ButtonBase>
                    </Paper>
                </Fade>
            })}
        </Stack>
        {children}
    </PickOnTopContext.Provider>;
});
