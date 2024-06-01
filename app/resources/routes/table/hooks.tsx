import { useMemo } from "react"
import { Pagination } from "@/app/components/pagination";
import { routeColumns } from ".";
import { useRouter } from "next/navigation";
import { RouteTableParams } from "..";

const rowsPerPageOptions = [5, 20, 50, 70, 100]


export const useRouteTablePagination = ({ start, end, maxDocsCount }: RouteTableParams) => {
    const router = useRouter()
    return useMemo(() => {
        return {
            columns: [
                {
                    content: <Pagination
                        start={start}
                        end={end}
                        onPagination={(start, end) => {
                            router.push(`/resources/routes/?start=${start}&end=${end}`);
                        }}
                        rowsPerPageOptions={rowsPerPageOptions}
                        maxRowCount={maxDocsCount}
                        rowsPerPage={start - end}
                    />,
                    cellProps: {
                        padding: "none" as const,
                        align: "right" as const,
                        colSpan: routeColumns.length
                    }
                }
            ],
        }
    }, [start, end, maxDocsCount])
}


export const useRouteTableBodyRows = ({ docs }: RouteTableParams) => {

    const router = useRouter()
    return useMemo(() => {

        return {
            rows: docs.map((doc) => {

                return {
                    columns: routeColumns.map(column => {
                        return {
                            content: doc[column.name],
                        } as const
                    }),
                    rowProps: {
                        hover: true,
                        sx: { cursor: "pointer" },
                        role: "checkbox",
                        tabIndex: -1,
                        onClick: async () => {
                            router.push(`/resources/routes/save?id=${doc.id}`);
                        }
                    }
                }
            }),
        }
    }, [docs])
}