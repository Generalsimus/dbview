import { Validator } from "@/app/utils/hooks/useSetProps/create=validation-controller";
import { InputProps } from "@/basic/generics";
import { Service } from "@/basic/models/services/services";
import React, { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Paper, Stack } from "@mui/material";
import { MonacoEditor } from "@/app/components/monaco-editor";
// import { MonacoEditor } from "./trr/monaco-editor";
// import { MonacoEditor } from "./monaco-editor";

// name: string,
// descriptions: string,
// argValidationIds: number[],
// actionCode: string
interface IProps extends InputProps<Service["methods"]> {
    validator: Validator<Service>
}
export const MethodsInput: React.FC<IProps> = React.memo(({ value, validator: { getError }, initSetProps, getPropState }) => {

    return <>
        <div>
            <Typography variant="caption" display="block" gutterBottom>Methods</Typography>
            {value.map((method, index) => {
                return <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{method.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MonacoEditor {...getPropState(index, "actionCode")} />
                        {/* <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography> */}
                    </AccordionDetails>
                </Accordion>
            })}

        </div>
    </>;
}); 