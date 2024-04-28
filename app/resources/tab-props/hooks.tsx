import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import { ResourceTabsEnum } from "./utils"
import { ColumnType, RowType } from "@/app/components/table/types"
import { useValidationResource } from "./validations";
import { useRouteResource } from "./routes";
import { useServiceResource } from "./services";
export interface ResourceData<DOC extends Record<PropertyKey, undefined | any>, RES = { docs: DOC[], maxDocsCount: number }> {
    start: number,
    end: number,
    resource: Promise<RES>,
    columns: ColumnType[],
    updateRows: (res: RES, setData: Dispatch<SetStateAction<TableTataType>>) => void,
    content?: ReactNode
}
const useResourceData = (
    start: number,
    end: number,
    tab: ResourceTabsEnum
) => {
    const validationResource = useValidationResource(start, end, tab)
    const routeResource = useRouteResource(start, end, tab)
    const serviceResource = useServiceResource(start, end, tab)
    // </TableTataType>
    // "🚀 --> validationResource || routeResource || serviceResource:",
    //     tab,
    //     {
    //         validationResource,
    //         routeResource,
    //         serviceResource
    //     }console.log(
    // );
    return validationResource || routeResource || serviceResource
}
export interface TableTataType {
    currentTab: ResourceTabsEnum,
    start: number,
    end: number,
    columns: ColumnType[],
    rows: RowType[],
    maxRowCount: number
    collapsedIndex: null | number
    content?: ReactNode

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

    // const params = useParams();
    // const router = useRouter()
    const resourceData = useResourceData(start, end, tab)
    useEffect(() => {
        if (!resourceData) return;
        const { columns, resource, content, updateRows } = resourceData
        setData(curr => {
            return {
                ...curr,
                start: start,
                end: end,
                currentTab: tab,
                columns: columns,
                content: content
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
    }, [resourceData]);
    return data;
}