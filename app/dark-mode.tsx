"use client"
import CssBaseline from '@mui/material/CssBaseline';
import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

interface IProps {
    children: React.ReactNode
}
export const DarMode: React.FC<IProps> = React.memo(({ children }) => {

    return <>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    </>;
});
