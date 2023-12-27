import React, { Component, ComponentProps, useMemo, useState } from "react";
import { Table } from "../table";
import { TabsContent } from "./tabs";

type IProps = ComponentProps<typeof Table> & ComponentProps<typeof TabsContent>

export const TableTabs: React.FC<IProps> = React.memo((props) => {
    const { header, tab, tabs, rightSideContent, getTabProps } = props
    const headerContent = useMemo(() => {
        return {
            sticky: header?.sticky,
            content: {
                columns: [
                    {
                        cellProps: {
                            colSpan: header?.titleRow?.columns.length || 0,
                            padding: "none"
                        } as const,
                        content: <TabsContent tab={tab} tabs={tabs} rightSideContent={rightSideContent} getTabProps={getTabProps} />
                    }
                ],
                tableRowProps: header?.content?.tableRowProps
            },
            titleRow: props.header?.titleRow
        }
    }, [header, tab, tabs, rightSideContent]);
    // console.log({ props })
    return <>
        <Table
            {...props}
            header={headerContent}
        />
    </>;
});
