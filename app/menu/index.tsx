import List from '@mui/material/List';
import { Paper, Stack } from "@mui/material";
import ListSubheader from '@mui/material/ListSubheader';
import React from "react";
import { MenuItemtype, MenuItem } from './menu-item';



interface IProps {
    title: string,
    menuitems: MenuItemtype[],
    children: React.ReactNode
}
export const Menu: React.FC<IProps> = React.memo(({ title, children, menuitems }) => {

    return <>
        <Stack direction={"row"} sx={{ width: "100vw", height: "100vh", position: "relative" }}>
            <Stack sx={{ width: '100%', maxWidth: 300, minHeight: "100%", bgcolor: 'background.paper' }}>
                <Paper elevation={6} sx={{ minHeight: "100%" }}>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                {title}
                            </ListSubheader>
                        }
                    >
                        {menuitems.map(menuItem => {


                            return <MenuItem {...menuItem} />
                        })}
                    </List>
                </Paper>
            </Stack>
            <Stack sx={{ height: "100%", width: "100%" }}>{children}</Stack>
        </Stack>
    </>;
});
