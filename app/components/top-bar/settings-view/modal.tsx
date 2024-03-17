import React, { useState } from "react";
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Stack, TextField } from "@mui/material";
import { AutoResizeField } from "../../auto-resize-field";


interface IProps {
    open: boolean
    onOpen: () => void
    onClose: () => void
}
export const SettingsModal: React.FC<IProps> = React.memo(({ open, onOpen, onClose }) => {
    const theme = useTheme()

    return <>
        <Dialog
            sx={{
                '& .MuiDialogContent-root': {
                    padding: theme.spacing(2),
                },
                '& .MuiDialogActions-root': {
                    padding: theme.spacing(1),
                },
            }}
            onClose={onClose}
            aria-labelledby="app-settings"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="app-settings">
                Settings
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent >
                <Stack
                    width={300}
                    flexDirection={"column"}
                >
                    <TextField
                        id="build-directory"
                        label="Build Directory"
                        variant="outlined"
                        size="small"
                        helperText="Please write output Directory path"
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} autoFocus size="small">Cancel</Button>
                <Button onClick={onClose} variant="contained" >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    </>;
});
