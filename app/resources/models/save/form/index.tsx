import { InputProps } from "@/basic/generics";
import { TextField } from "@mui/material";
import React from "react";
import { ValidationsInput } from "./validations-input";
import { StateValueType } from "..";


interface IProps extends InputProps<StateValueType> {

}
export const Form: React.FC<IProps> = React.memo(({ value = {}, getValidation, initSetProps, getPropState }) => {
  const { name, description } = value;
  const { getError } = getValidation();

  return (
    <>
      <TextField
        value={name}
        onChange={initSetProps("target", "value")("name")}
        autoFocus
        margin="dense"
        id="name"
        label="Name"
        type="text"
        fullWidth
        variant="outlined"
        {...getError("name")}
      />
      <TextField
        autoFocus
        margin="dense"
        id="description"
        label="Description"
        name="description"
        value={description}
        onChange={initSetProps("target", "value")("description")}
        minRows={2}
        type="text"
        fullWidth
        variant="outlined"
        multiline
        {...getError("description")}
      />
      <ValidationsInput {...getPropState("objectSchema")} />
    </>
  );
}
);
