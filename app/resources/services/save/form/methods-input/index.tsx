"use client"
import { InputProps } from "@/utils/generics";

import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Stack } from "@mui/material";
import { accordionSummaryClasses } from '@mui/material';
import { MethodNameInput } from "./method-name-input";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import dynamic from 'next/dynamic'
import { Service } from "@/db/types";
import { SaveServiceArgs } from "../../../server";


interface IProps extends InputProps<SaveServiceArgs["methods"]> {
}
export const MethodsInput: React.FC<IProps> = React.memo(({ value, getValidation, setValue, initSetProps, getPropState }) => {
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

    // const MonacoEditor = dynamic(() => import('../../../../../../components/monaco-editor/index.js').then((mod) => (console.log("dasdasd", mod), mod.MonacoEditor)), { ssr: false });

    return <>
        <div>
            <Stack sx={{ pb: 1, pt: 2 }} display={"flex"} justifyContent={"space-between"} alignItems={"flex-end"} flexDirection={"row"}>
                <Typography variant="caption"  >Methods</Typography>
                <Button
                    onClick={addEmptyMethod}
                    variant="contained" size="small">Add Method</Button>
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
                        {/* <MonacoEditor {...getPropState(index, "actionCode")} /> */}
                    </AccordionDetails>
                </Accordion>
            })}

        </div >
    </>;
}); 