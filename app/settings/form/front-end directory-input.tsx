import { InputProps } from "@/utils/generics";
import { Button, inputBaseClasses, TextField } from "@mui/material";
import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import FolderIcon from "@mui/icons-material/Folder";
import { SaveProjectSettingsArgs } from "../server";
import { useRunOnceAndWaitToEnd } from "@/app/utils/hooks/useRunOnceAndWaitToEnd";


interface IProps extends InputProps<SaveProjectSettingsArgs["frontEndBuildDirection"]> {
}
export const FrontEndDirectoryInput: React.FC<IProps> = React.memo(({ value, getValidation, setValue, getPropState }) => {
    const { getError } = getValidation()

    const onChangeFrontEndBuildDirection = useRunOnceAndWaitToEnd(async () => {
        const response = await fetch("/open-directory-dialog", {
            method: "GET",
        });
        const result = await response.text();

        setValue(result.trim());
    });
    return <>
        <TextField
            id="frontEndBuildDirection"
            label="Front-End Directory"
            variant="outlined"
            size="small"
            value={value}
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
    </>;
});
