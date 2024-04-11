import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { SearchValidationsByName } from "../../../validations/server";
import { MakeAsDbDoc, MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Validation } from "@/basic/models/validation/validation";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
// import { InputProps } from "@mui/material";
import { ValidationRes } from "@/app/utils/hooks/useSetProps/create-set-prop-controller";
import { Route } from "@/basic/models/route/route";
import { SaveRoute } from "@/basic/models/route/types";
import { InputProps } from "@/basic/generics";
interface StateValueType {
    docs: MakeAsDbDoc<Validation>[]
    searchValue: string | undefined,
    startIndex: number,
    endIndex: number,
    documentsPerPage: number
}
const getEmptyState = () => ({ docs: [], searchValue: undefined, startIndex: 0, endIndex: 15, documentsPerPage: 15 })

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface IProps extends InputProps<SaveRoute["validations"]> {
    validation: ValidationRes<MakeCreateOrUpdate<SaveRoute>>
}
export const AddValidationsInput: React.FC<IProps> = React.memo(({ value, validation, setProps: setPropsRoute }) => {
    console.log("🚀 --> constAddValidationsInput:React.FC<IProps>=React.memo --> value:", value);

    const { value: { searchValue, startIndex, endIndex, documentsPerPage, docs }, setProps, setValue } = useSetProps<StateValueType>(getEmptyState);

    const previousRes = useMemo(() => {
        return SearchValidationsByName(startIndex, endIndex, searchValue).then((res) => {
            console.log("🚀 --> returnSearchValidationsByName --> res:", res);
            setValue((state) => {
                return {
                    ...state,
                    docs: startIndex ? [...state.docs, ...res.docs] : res.docs,
                }
            })
            return res
        });
    }, [searchValue, startIndex, endIndex])

    const onSearchValueChange = useMemoCall((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setValue(state => ({
            ...getEmptyState(),
            searchValue: e.target.value,
        }))
    });

    const onSelectValidation = useMemoArgCall((newValidation: MakeAsDbDoc<Validation>) => {
        setPropsRoute()([...value, newValidation])
    });
    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            value={value}
            options={docs}
            disableCloseOnSelect
            getOptionKey={(option) => option.id}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => (
                <li {...props} onClick={onSelectValidation(option)}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.name}
                </li>
            )}
            renderInput={(params) => (
                <TextField {...params} label="Add Route Validations" placeholder="Validations" onChange={onSearchValueChange} />
            )}
        />
    );
});

