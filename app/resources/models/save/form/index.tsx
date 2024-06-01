import { InputProps, PartialKeys } from "@/basic/generics";
import { TextField } from "@mui/material";
import React from "react";
import { ValidationsInput } from "./validations-input";
import { PropertyType } from "@/app/components/object-input/types";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Model, Validation } from "@/db/types";
import { SaveModelArgs } from "../../server";
import { StateValueType } from "..";

// export interface StateValueType extends Omit<MakeCreateOrUpdate<SaveModelArgs>, "objectSchema"> {
//     objectSchema: PartialKeys<PropertyType, "value">[]
// }

interface IProps extends InputProps<StateValueType> {
   
} 
export const Form: React.FC<IProps> = React.memo(
  ({ value = {}, getValidation, initSetProps, getPropState }) => {
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
