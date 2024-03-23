"use client"
import React, { useEffect, useState } from "react";
import { useMonacoEditor } from "./hooks";
import { Box } from "@mui/material";  
import { editor as monacoEditorModule } from "monaco-editor"
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";

interface IProps {
    value?: string,
    onChange?: (newValue?: string) => void
}
export const MonacoEditor: React.FC<IProps> = React.memo(({ value = "", onChange }) => {
    const { createEditorRef, editor } = useMonacoEditor({
        value: Array(200).fill('const ss = 21;').join("\n"),
        language: 'typescript',
        theme: 'vs-dark',
    });
    const onChangeCode = useMemoCall((event: monacoEditorModule.IModelContentChangedEvent) => {
        if (editor) {
            onChange?.(editor.getValue())
        }
    })
    useEffect(() => {
        editor?.onDidChangeModelContent(onChangeCode);
    }, [editor])
    return <>
        <Box onWheel={(e) => {
            e.preventDefault()
        }} component={"div"} sx={{ height: "50vh", width: "100%" }} ref={createEditorRef} />
    </>;
});
