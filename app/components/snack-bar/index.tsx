import { Box, Stack } from "@mui/material";
import React, { ComponentProps, ReactNode, createContext, useState } from "react";

interface SnackbarItemType {
    time: number,
    content: ReactNode
}
type SnackbarContextType = (snackItem: SnackbarItemType) => void;

export const SnackbarContext = createContext<SnackbarContextType>(() => { });

interface IProps {
    children: ReactNode
}
export const SnackbarProvider: React.FC<IProps> = React.memo(({ children }) => {
    const [pickDataItems, setPickDataItems] = useState<SnackbarItemType[]>([])

    return <SnackbarContext.Provider value={() => { }}>
        <Stack position="fixed" bottom={20} left={20} gap={1} zIndex={(theme) => theme.zIndex.tooltip}>

            {pickDataItems.map(el => {
                {/* <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} onClick={onChangeValue(o.value)} >{o.label}</Box> */ }
                return <> {el.content}
                    {/* <Paper elevation={4} >
                        <ButtonBase sx={{ padding: '5px 10px', display: "flex", cursor: "pointer" }}>
                            {el.icon}
                            <Typography>{el.title}</Typography>
                        </ButtonBase>
                    </Paper> */}
                </>
            })}
        </Stack>
        {children}
    </SnackbarContext.Provider>;
});

