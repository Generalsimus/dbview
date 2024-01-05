import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import * as monaco from "monaco-editor"
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";

interface SateType {
    element: HTMLElement | null,
    editor: null | monaco.editor.IStandaloneCodeEditor
}
export const useMonacoEditor = (options: monaco.editor.IStandaloneEditorConstructionOptions): {
    createEditorRef: (el: HTMLDivElement | null) => void,
    editor: monaco.editor.IStandaloneCodeEditor | null
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
                    editor: monaco.editor.create(el, options)
                });
            }
        }),
        editor: editor,
    }
}