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
    type?: ReactNode
    onRemove?: () => void
}
export const TypeNameViewContainer: React.FC<IProps> = React.memo(({ children, type, onRemove }) => {


    return <Stack display={"flex"} flexDirection={"row"} alignItems={"center"} gap={0.4}>
        <Typography>.{type}
            {onRemove && <RemoveButton onClick={onRemove} >
                <RemoveIcon color="error" />
            </RemoveButton>}
            (</Typography>
        {children}
        <Typography>)</Typography>
    </Stack>;
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