"use client"
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import { useToggleBool } from '../utils/hooks/useToggleBool';
import { useMemoCall } from '../utils/hooks/useMemoCall';
import Link from 'next/link';


export interface MenuItemtype {
    name: string
    href?: string
    icon?: ReactNode
    onClick?: () => void
    defaultOpen?: boolean
    children?: MenuItemtype[]
}
interface IProps extends MenuItemtype {
    hierarchyIndex?: number
}
export const MenuItem: React.FC<IProps> = React.memo(({ name, icon, href, onClick, defaultOpen = false, children, hierarchyIndex = 0 }) => {
    const [open, toggleValue] = useToggleBool(defaultOpen)
    const onClickHandler = useMemoCall(() => {
        onClick?.();
        toggleValue()();
    })

    return <>
        <ListItemButton component={href ? Link : Box} href={href} onClick={onClickHandler} sx={{ pl: hierarchyIndex + 1 }}>
            {icon && <ListItemIcon>
                {icon}
            </ListItemIcon>}
            <ListItemText primary={name} />
            {children && (open ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        {children && <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding >
                {children.map(child => {
                    return <MenuItem {...child} hierarchyIndex={hierarchyIndex + 1} />
                })}
            </List>
        </Collapse>}
    </>;
});
