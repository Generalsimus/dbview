import React, { useEffect, useState } from "react";
import { useMonacoEditor } from "./hooks";
import { Box } from "@mui/material";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import * as monaco from "monaco-editor"

interface IProps {
    value?: string,
    onChange?: (newValue?: string) => void
}
export const MonacoEditor: React.FC<IProps> = React.memo(({ value = "", onChange }) => {
    const { createEditorRef, editor } = useMonacoEditor({
        value: value,
        language: 'typescript',
        theme: 'vs-dark',
    });
    const onChangeCode = useMemoCall((event: monaco.editor.IModelContentChangedEvent) => {
        if (editor) {
            onChange?.(editor.getValue())
        }
    })
    useEffect(() => {
        editor?.onDidChangeModelContent(onChangeCode);
    }, [editor])
    return <>
        <Box component={"div"} sx={{ height: "50vh", width: "100%" }} ref={createEditorRef} />
    </>;
});
