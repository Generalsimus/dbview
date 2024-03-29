"use client"
import React from "react";
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { inputBaseClasses, Stack, TextField } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import InputAdornment from '@mui/material/InputAdornment';
import { useProjectSettingFormController } from "./hooks"
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useRunOnceAndWaitToEnd } from "@/app/utils/hooks/useRunOnceAndWaitToEnd";
import { getCreateOrUpdateSchema, MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { ProjectSetting, ProjectSettingSchema } from "@/basic/models/project-settings/project-settings";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { createPortal } from "react-dom";

interface IProps extends ReturnType<typeof useProjectSettingFormController> {
    open: boolean
    onOpen: () => void
    saveProjectSettingsDoc: (value: MakeCreateOrUpdate<ProjectSetting>) => Promise<void>;
    onClose: () => void
}
export const SettingsModal: React.FC<IProps> = React.memo(({ open, onOpen, onClose, saveProjectSettingsDoc, getPropState, setProps, value }) => {
    const { doc: { buildDirection }, isLoading } = value;
    const theme = useTheme()
    const onChangeBuildDirectory = useRunOnceAndWaitToEnd(async () => {
        console.log("🚀 --> onChangeBuildDirectory --> async:");
        const response = await fetch("/open-directory-dialog", {
            method: "GET"
        })
        const result = await response.text();

        setProps("doc", "buildDirection")(result.trim());
    })
    const { getIfValid, getError } = getPropState("doc").getValidation(getCreateOrUpdateSchema(ProjectSettingSchema));

    const onSave = useMemoCall(async () => {
        const saveDoc = getIfValid();
        setProps("isLoading")(true);
        if (saveDoc) {
            await saveProjectSettingsDoc(saveDoc)
        }
        setProps("isLoading")(false);
        setProps("open")(false);
    })
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
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Stack
                    width={300}
                    flexDirection={"row"}
                >
                    <TextField
                        id="build-directory"
                        label="Build Directory"
                        variant="outlined"
                        size="small"
                        value={buildDirection}
                        sx={{
                            [`& .${inputBaseClasses.root}`]: {
                                padding: "0px !important"
                            }
                        }}
                        type="text"
                        aria-readonly
                        {...getError("buildDirection")}
                        helperText="Please write output Directory path"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    endIcon={<FolderIcon />}
                                    onClick={onChangeBuildDirectory}
                                >
                                    Choose
                                </Button>
                            </InputAdornment>
                        }}
                    />

                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} autoFocus size="small">Cancel</Button>
                <Button onClick={onSave} variant="contained" >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    </>;
});
