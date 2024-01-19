"use client"
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { Box, Stack } from "@mui/material";
import React, { ComponentProps, ReactNode, createContext, useState } from "react";

interface SnackbarItemType {
    time?: number,
    content: ReactNode
}
interface SnackbarItemSectionType {
    sectionId: number | string,
    items: SnackbarItemType[]
}
type SnackbarContextType = (snackItem: SnackbarItemType, sectionId?: SnackbarItemSectionType["sectionId"]) => () => void;

export const SnackbarContext = createContext<SnackbarContextType>(() => () => { });

interface IProps {
    children: ReactNode
}
export const SnackbarProvider: React.FC<IProps> = React.memo(({ children }) => {
    const [snackbarItemSections, setSnackbarItemSections] = useState<SnackbarItemSectionType[]>([])
    const addSnackItem: SnackbarContextType = useMemoCall((newItem, sectionId = "UNKNOWN") => {
        console.log({ sectionId });
        const existedSectionItem = snackbarItemSections.find(el => el.sectionId === sectionId)
        const preparedSection: SnackbarItemSectionType = existedSectionItem || {
            sectionId: sectionId,
            items: []
        }
        preparedSection.items = [...preparedSection.items, newItem];

        const newSnackbarItemSections = [...snackbarItemSections];
        if (!existedSectionItem) {
            newSnackbarItemSections.push(preparedSection)
        }
        setSnackbarItemSections(newSnackbarItemSections);
        console.log({ newSnackbarItemSectionasdasdasdsL: preparedSection.items })
        const removeItem = () => {
            setSnackbarItemSections(sections => {
                return sections.map(section => {
                    if (section === preparedSection) {
                        section.items = section.items.filter(item => item !== newItem);
                    }
                    return section;
                });
            });
        };
        if (newItem.time !== undefined) {
            setTimeout(removeItem, newItem.time);
        };
        return removeItem
    });

    console.log({ snackbarItemSections })
    return <SnackbarContext.Provider value={addSnackItem}>
        <Stack position="fixed" bottom={20} left={20} gap={1} zIndex={(theme) => theme.zIndex.tooltip}>
            {snackbarItemSections.map(snackbarItemSection => {
                return snackbarItemSection.items.map(el => {
                    return <>{el.content}</>
                })
            })}
        </Stack>
        {children}
    </SnackbarContext.Provider>;
});

