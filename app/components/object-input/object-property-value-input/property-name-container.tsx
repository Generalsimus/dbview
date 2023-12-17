import { Fade, IconButton, Stack, Typography, styled } from "@mui/material";
import React, { ReactNode, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { SmallIconButton } from "@/app/components/small-icon-button";
import RemoveIcon from '@mui/icons-material/Remove';
import { alpha } from '@mui/material';
// import { alpha } from '@material-ui/core/styles/colorManipulator';
// formControlClasses
interface IProps {
    children?: ReactNode
    name?: ReactNode
    onRemove?: () => void
}
export const PropertyNameViewContainer: React.FC<IProps> = React.memo(({ children, name, onRemove }) => {


    // return <Stack display={"flex"} flexDirection={"row"} flexWrap={"wrap"} alignItems={"center"} gap={0.4}>
    return <>
        <Typography sx={{ display: "flex", alignItems: "center" }} fontWeight={"bold"}>{name}
            {onRemove && <RemoveButton onClick={onRemove} >
                <RemoveIcon color="error" />
            </RemoveButton>}
            (</Typography>
        {children}
        <Typography fontWeight={"bold"}>)</Typography>
    </>;
});

const RemoveButton = styled(IconButton)(({ theme }) => {
    return {
        [`& `]: {
            padding: 0,
            backgroundColor: alpha(theme.palette.error.light, 0.5),
        },
        [`& svg`]: {
            fontSize: ".6em"
        }
    }
}); 