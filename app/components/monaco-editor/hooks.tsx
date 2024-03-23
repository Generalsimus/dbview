"use client"
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { editor as monacoEditorModule } from "monaco-editor"
import { useEffect, useState } from "react";




interface SateType {
    element: HTMLElement | null,
    editor: null | monacoEditorModule.IStandaloneCodeEditor
}
export const useMonacoEditor = (options: monacoEditorModule.IStandaloneEditorConstructionOptions): {
    createEditorRef: (el: HTMLDivElement | null) => void,
    editor: monacoEditorModule.IStandaloneCodeEditor | null
} => {
    const [data, setData] = useState<SateType>({
        element: null,
        editor: null,
    });
    const { editor, element } = data

    useEffect(() => {
        return () => {
            editor?.dispose();
        };
    }, [editor]);

    return {
        createEditorRef: useMemoCall((el) => {
            if (el && element !== el) {
                editor?.dispose();

                setData({
                    element: el,
                    editor: monacoEditorModule.create(el, options)
                });
            }
        }),
        editor: editor,
    }
}