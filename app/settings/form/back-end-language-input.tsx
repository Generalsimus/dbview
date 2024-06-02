import { InputProps } from "@/utils/generics";
import { FormControl, TextField } from "@mui/material";
import React from "react";
import { SaveProjectSettingsArgs } from "../server";
import { codeLanguages } from "../schema";
import MenuItem from "@mui/material/MenuItem";


interface IProps extends InputProps<SaveProjectSettingsArgs["backEndLanguage"]> {
}
export const BackEndLanguageInput: React.FC<IProps> = React.memo(({ value, initSetProps, getValidation, setValue, getPropState }) => {
    const { getError } = getValidation()
    return <>
        <FormControl fullWidth>
            <TextField
                select
                id="back-end-language"
                value={value}
                size="small"
                label="Back-End Language"
                variant="outlined"
                onChange={initSetProps("target", "value")() as any}
                {...getError("backEndLanguage")}
                helperText="Please choose language"
            >
                {codeLanguages.map((codeLanguage) => {
                    return (
                        <MenuItem key={codeLanguage} value={codeLanguage} selected={codeLanguage === value}>{codeLanguage}</MenuItem>
                    );
                })}
            </TextField>
        </FormControl>
    </>;
});
