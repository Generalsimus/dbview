import { Validator } from "@/app/utils/hooks/useSetProps/create=validation-controller";
import { InputProps } from "@/basic/generics";
import { Service } from "@/basic/models/services/services";
import React, { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Paper, Stack } from "@mui/material";
import { MonacoEditor } from "@/app/components/monaco-editor";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Deletecon from '@mui/icons-material/Delete';
import { AutoResizeField } from "@/app/components/auto-resize-field";
import { accordionSummaryClasses } from '@mui/material';
import { MethodNameInput } from "./method-name-input";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
// import { MonacoEditor } from "./trr/monaco-editor";
// import { MonacoEditor } from "./monaco-editor";

// name: string,
// descriptions: string,
// argValidationIds: number[],
// actionCode: string
interface IProps extends InputProps<Service["methods"]> {
    validator: Validator<Service>
}
export const MethodsInput: React.FC<IProps> = React.memo(({ value, validator: { getError }, setValue, initSetProps, getPropState }) => {
    const addEmptyMethod = useMemoCall(() => {
        setValue([
            ...value,
            {
                name: "",
                description: "",
                argValidationIds: [],
                actionCode: ""
            }
        ])
    });
    const removeMethod = useMemoArgCall((removeIndex: number) => {
        const newValue = [...value]
        newValue.splice(removeIndex, 1);
        setValue(newValue);
    });

    return <>
        <div>
            <Stack display={"flex"} justifyContent={"space-between"} alignItems={"flex-end"} flexDirection={"row"}>
                <Typography variant="caption"  >Methods</Typography>
                <Button
                    onClick={addEmptyMethod}
                    variant="contained">Add Method</Button>
            </Stack>
            {value.map((method, index) => {
                return <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                            [`& .${accordionSummaryClasses.content}`]: {
                                margin: "5px 0 !important"
                            },
                            minHeight: "auto !important"
                        }}

                    >
                        <MethodNameInput {...getPropState(index)} onRemove={removeMethod(index)} />
                    </AccordionSummary>
                    <AccordionDetails>
                        <MonacoEditor {...getPropState(index, "actionCode")} />
                    </AccordionDetails>
                </Accordion>
            })}

        </div >
    </>;
}); 