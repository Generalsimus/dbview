"use client";
import React from "react";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { inputBaseClasses, Stack, TextField } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import InputAdornment from "@mui/material/InputAdornment";
import { useProjectSettingFormController } from "./hooks";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useRunOnceAndWaitToEnd } from "@/app/utils/hooks/useRunOnceAndWaitToEnd";
import {
  getCreateOrUpdateSchema,
  MakeCreateOrUpdate,
} from "@/basic/db-basic-schema";
import {
  codeLanguages,
  // ProjectSetting,
  ProjectSettingSchema,
} from "@/basic/models/project-settings/project-settings";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { createPortal } from "react-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import { codeLanguages, CodeLanguagesEnum } from "@/basic/types";
import {
  Select,
  SelectProps,
  selectClasses,
  SelectRootSlotProps
} from '@mui/base/Select';
import { Option, optionClasses } from '@mui/base/Option';
import { ProjectSettings } from "@/db/types";
interface IProps extends ReturnType<typeof useProjectSettingFormController> {
  open: boolean;
  onOpen: () => void;
  saveProjectSettingsDoc: (
    value: MakeCreateOrUpdate<ProjectSettings>
  ) => Promise<void>;
  onClose: () => void;
}
export const SettingsModal: React.FC<IProps> = React.memo(
  ({
    open,
    onOpen,
    onClose,
    saveProjectSettingsDoc,
    getPropState,
    initSetProps,
    setProps,
    value,
  }) => {
    const {
      doc: { backEndBuildDirection, frontEndBuildDirection, backEndLanguage },
      isLoading,
    } = value;

    const theme = useTheme();
    const onChangeBackEndBuildDirection = useRunOnceAndWaitToEnd(async () => {
      const response = await fetch("/open-directory-dialog", {
        method: "GET",
      });
      const result = await response.text();

      setProps("doc", "backEndBuildDirection")(result.trim());
    });
    const onChangeFrontEndBuildDirection = useRunOnceAndWaitToEnd(async () => {
      const response = await fetch("/open-directory-dialog", {
        method: "GET",
      });
      const result = await response.text();

      setProps("doc", "frontEndBuildDirection")(result.trim());
    });
    const { getIfValid, getError } = getPropState("doc").getValidation(
      getCreateOrUpdateSchema(ProjectSettingSchema)
    );

    const onSave = useMemoCall(async () => {
      const saveDoc = getIfValid();
      setProps("isLoading")(true);
      if (saveDoc) {
        await saveProjectSettingsDoc(saveDoc);
      }
      setProps("isLoading")(false);
      setProps("open")(false);
    });
    return (
      <>
        <Dialog
          sx={{
            "& .MuiDialogContent-root": {
              padding: theme.spacing(2),
            },
            "& .MuiDialogActions-root": {
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
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Stack width={300} flexDirection={"column"} gap={4}>
              <Stack width={300} flexDirection={"column"} gap={2}>

                <TextField
                  id="backEndBuildDirection"
                  label="Back-End Directory"
                  variant="outlined"
                  size="small"
                  value={backEndBuildDirection}
                  sx={{
                    [`& .${inputBaseClasses.root}`]: {
                      padding: "0px !important",
                    },
                  }}
                  type="text"
                  aria-readonly
                  {...getError("backEndBuildDirection")}
                  helperText="Please write output Directory path"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          endIcon={<FolderIcon />}
                          onClick={onChangeBackEndBuildDirection}
                        >
                          Choose
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControl fullWidth>
                  <TextField
                    select
                    id="back-end-language"
                    value={backEndLanguage}
                    size="small"
                    label="Back-End Language"
                    variant="outlined"
                    onChange={initSetProps("target", "value")("doc", "backEndLanguage") as any}
                    {...getError("frontEndBuildDirection")}
                    helperText="Please choose language"
                  >
                    {codeLanguages.map((codeLanguage) => {
                      return (
                        <MenuItem key={codeLanguage} value={codeLanguage} selected={codeLanguage === backEndLanguage}>{codeLanguage}</MenuItem>
                      );
                    })}
                  </TextField>
                </FormControl>
              </Stack>
              <TextField
                id="frontEndBuildDirection"
                label="Front-End Directory"
                variant="outlined"
                size="small"
                value={frontEndBuildDirection}
                sx={{
                  [`& .${inputBaseClasses.root}`]: {
                    padding: "0px !important",
                  },
                }}
                type="text"
                aria-readonly
                {...getError("frontEndBuildDirection")}
                helperText="Please write output Directory path"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        endIcon={<FolderIcon />}
                        onClick={onChangeFrontEndBuildDirection}
                      >
                        Choose
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} autoFocus size="small">
              Cancel
            </Button>
            <Button onClick={onSave} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog >
      </>
    );
  }
);
