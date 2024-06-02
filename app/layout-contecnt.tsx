"use client"
import React, { useState } from "react";
import { DarMode } from "./dark-mode";
import { Menu } from "./menu";
import { MenuItemtype } from "./menu/menu-item";
import DatasetIcon from '@mui/icons-material/Dataset';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import RuleIcon from '@mui/icons-material/Rule';
import CodeIcon from '@mui/icons-material/Code';
import SourceIcon from '@mui/icons-material/Source';
import DataObjectIcon from '@mui/icons-material/DataObject';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SchemaIcon from '@mui/icons-material/Schema';
import SettingsIcon from '@mui/icons-material/Settings';

const menu: MenuItemtype[] = [
    {
        name: "Resources",
        icon: <DataObjectIcon />,
        defaultOpen: true,
        children: [
            {
                name: "Routes",
                href: "/resources/routes",
                icon: <AltRouteIcon />
            },
            {
                name: "Models",
                href: "/resources/models",
                icon: <RuleIcon />
            },
            {
                name: "Services",
                href: "/resources/services",
                icon: <CodeIcon />
            }
        ]
    },
    {
        name: "VIsualization",
        icon: <AccountTreeIcon />,
    },
    {
        name: "Settings",
        href: "/settings",
        icon: <SettingsIcon />,
    }
]
interface IProps {
    children: React.ReactNode
}
export const LayoutContent: React.FC<IProps> = React.memo(({ children }) => {

    return <>
        <DarMode>
            <Menu title='Menu' menuitems={menu}>
                {children}
            </Menu>
        </DarMode>
    </>;
});
