import { ReactNode, useEffect, useState } from "react"
import { ResourceTabsEnum, getResourceData } from "./utils"
import { ColumnType, RowType } from "@/app/components/table/types"
import { useRouter } from "next/router"
import { useParams } from "next/navigation"
// import { useRouter } from "next/navigation"
// import { useRouter } from "next/navigation";


export interface TableTataType {
    currentTab: ResourceTabsEnum,
    start: number,
    end: number,
    columns: ColumnType[],
    rows: RowType[],
    maxRowCount: number
    collapsedIndex: null | number
    tabsRightContent?: ReactNode

}
export const useTableData = (
    tab: ResourceTabsEnum,
    start: number,
    end: number
) => {
    const [data, setData] = useState<TableTataType>({
        start: start,
        end: end,
        currentTab: tab,
        columns: [],
        rows: [],
        maxRowCount: 0,
        collapsedIndex: null
    });

    const params = useParams();
    useEffect(() => {
        const { columns, resource, tabsRightContent, updateRows } = getResourceData(tab, start, end);
        setData(curr => {
            return {
                ...curr,
                start: start,
                end: end,
                currentTab: tab,
                columns: columns,
                tabsRightContent: tabsRightContent
            }
        });
        let isEjected = false;
        resource.then((res) => {
            if (!isEjected) {
                updateRows(res, setData);
            }
        });

        return () => {
            isEjected = true;
        }
    }, [tab, start, end, params]);
    return data;
}