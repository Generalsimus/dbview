import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { MakeAsDbDoc, MakeCreateOrUpdate } from "@/utils/db-basic-schema";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
import { ValidationRes } from "@/app/utils/hooks/useSetProps/create-set-prop-controller";
import { GetKyselyModel, InputProps } from "@/utils/generics";
import { groupBy } from "lodash";
import Chip from '@mui/material/Chip';
import { Model, Route } from "@/db/types";
import { SaveRouteArgs } from "../../schema";
import { SearchModelByName } from "@/app/resources/models/server";

interface StateValueType {
    docs: SaveRouteArgs["validations"]
    searchValue: string | undefined,
    startIndex: number,
    endIndex: number,
    documentsPerPage: number
}
const getEmptyState = () => ({ docs: [], searchValue: undefined, startIndex: 0, endIndex: 15, documentsPerPage: 15 })

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface IProps extends InputProps<SaveRouteArgs["validations"]> {
    validation: ValidationRes<MakeCreateOrUpdate<Route>>
}
export const AddValidationsInput: React.FC<IProps> = React.memo(({ value, validation, setProps: setPropsRoute }) => {
    const { value: { searchValue, startIndex, endIndex, documentsPerPage, docs }, setProps, setValue } = useSetProps<StateValueType>(getEmptyState);

    useEffect(() => {
        SearchModelByName(startIndex, endIndex, searchValue).then((res) => {
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
    const onSelectValidation = useMemoArgCall((newValidation: GetKyselyModel<Model>, isChecked: boolean) => {
        if (isChecked) {
            setPropsRoute()(value.filter(e => e.id !== newValidation.id))
        } else {
            setPropsRoute()([...value, newValidation])

        }
    });

    const onChangeValue = useMemoCall((event: React.SyntheticEvent<Element, Event>, newValue: SaveRouteArgs["validations"]
    ) => {
        setPropsRoute()(newValue);
    });

    const groupedById = useMemo(() => groupBy(value, "id"), [value]);

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            value={value}
            options={docs}
            disableCloseOnSelect
            onChange={onChangeValue}
            getOptionKey={(option) => option.id}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => {
                const isChecked = !!groupedById[option.id];

                return (
                    <li {...props} onClick={onSelectValidation(option, isChecked)}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={isChecked}
                        />
                        {option.name}
                    </li>
                )
            }}
            renderInput={(params) => (
                <TextField {...params} label="Add Route Validations" placeholder="Validations" onChange={onSearchValueChange} />
            )}
        />
    );
});

