import { InputProps } from "@/basic/generics";
import { ValidationPropertyType } from "@/basic/models/validation/validation";
import React, { useState } from "react";
import { BlockPropertyInput } from "./block-property-input";
// import { useToggleBool } from "@/app/utils/hooks";
import { IconButton, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useToggleBool } from "@/app/utils/hooks/useToggleBool";

interface IProps extends InputProps<ValidationPropertyType> {


    // {/* <V = (OptionalKeys<ValidationPropertyType, "value">[])> */ }
    // value?: V,
    // onChange: (newValue: V) => void
}
export const AddValidation: React.FC<IProps> = React.memo((props) => {
    const { value: initialValue = {}, setValue } = props

    const [isAddingProcess, initDefaultValue] = useToggleBool(false)
    const onShowAddInput = initDefaultValue(true);
    const onHideAddInput = initDefaultValue(false);
    const [value,] = useState(initialValue)



    return <>{isAddingProcess && <BlockPropertyInput
        {...props}
        // value={value}
        // onChange={onChange}
        onRemove={onHideAddInput}
    />}
        <Stack display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <IconButton onClick={onShowAddInput}>
                <AddIcon />
            </IconButton>
        </Stack>
    </>;
});
