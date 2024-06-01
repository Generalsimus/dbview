import { ResourceTabsEnum } from "../utils";
import { deleteServiceDoc, getServiceDocs, saveServiceDoc } from "./server";
import { Collapse, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ResourceData, TableTataType } from "../hooks";
import { EditServiceView } from "./save/edit-service-view";
import { AddServiceButton } from "./save/add-button";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { getServicesIndexedDBStorage } from "./save/utils";
import { Service } from "@/db/types";




const cellProps = {
    colSpan: 1,
    sx: {
        fontWeight: "bold",
        width: `calc(100% / 3)`,
    },
}
const columns = [
    {
        name: "CollSpan",
        content: "",
        cellProps: {
            colSpan: 1,
            sx: {
                width: "15px"
            }
        }
    },
    { name: "name", content: "Name", cellProps: cellProps },
    { name: "description", content: "Description", cellProps: cellProps },
    { name: "properties", content: "Properties", cellProps: cellProps },
]
export const useServiceResource = (
    start: number,
    end: number,
    tab: ResourceTabsEnum
): ResourceData<Service> | undefined => {
    const router = useRouter();
    const serviceStorage = useMemo(getServicesIndexedDBStorage, [])

    const content = useMemo(() => {
        return <>
            <EditServiceView
                saveServiceDoc={saveServiceDoc}
                deleteServiceDoc={deleteServiceDoc}
            />
            <AddServiceButton
                saveServiceDoc={saveServiceDoc}
                deleteServiceDoc={deleteServiceDoc}
            />
        </>
    }, [])
    return useMemo(() => {
        if (tab !== ResourceTabsEnum.Services) return
        const serviceDocs = getServiceDocs(start, end);

        return {
            start: start,
            end: end,
            resource: serviceDocs,
            columns: columns,
            content: content,
            updateRows: ({ docs, maxDocsCount }, setTableData) => {


                setTableData((curr) => {

                    const getRow = (doc: Service, rowIndex: number, isCollapsed = false) => {

                        return [
                            {
                                columns: columns.map(column => {
                                    if (column.name === "CollSpan") {
                                        return {
                                            content: <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => {
                                                    setTableData(curr => {
                                                        const newRows = [...curr.rows];
                                                        newRows.splice(rowIndex, 2, ...getRow(doc, rowIndex, !isCollapsed));

                                                        return {
                                                            ...curr,
                                                            rows: newRows
                                                        }
                                                    });
                                                }}
                                            >
                                                {isCollapsed ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>,
                                            cellProps: {
                                                align: "left" as const,
                                                sx: { paddingTop: 0, paddingBottom: 0 }
                                            }
                                        }
                                    }
                                    return {
                                        content: doc[column.name],
                                        cellProps: {
                                            onClick: async () => {
                                                // const searchParams = new URLSearchParams(window.location.search);
                                                // const savedDoc = await serviceStorage.add({ ...doc })
                                                // searchParams.set("form", `${savedDoc.INDEXED_DB_SERVICE_ID}`)
                                                // router.push(`${window.location.pathname}?${searchParams}`)

                                            }
                                            // align: "left" as const,
                                            // sx: { paddingTop: 0, paddingBottom: 0 }
                                        }
                                    } as const
                                }),
                                rowProps: {
                                    hover: !isCollapsed,
                                    sx: {
                                        cursor: "pointer",
                                        '& > *': {
                                            borderBottom: 'unset !important'
                                        }
                                    },
                                    role: "checkbox",
                                    tabIndex: -1
                                }
                            },
                            {
                                columns: [
                                    {
                                        content: <Collapse in={isCollapsed} timeout="auto" unmountOnExit >
                                            CONTENT
                                        </Collapse>,
                                        cellProps: {
                                            colSpan: 4,
                                            style: { paddingBottom: 0, paddingTop: 0 }
                                        }
                                    }
                                ],
                            }
                        ]
                    }

                    const rows: TableTataType["rows"] = [];
                    for (const doc of docs) {
                        const rowIndex = rows.length;

                        rows.push(...getRow(doc, rowIndex, false));
                    }

                    return {
                        ...curr,
                        maxRowCount: maxDocsCount,
                        rows: rows,
                    }
                });
            }
        }
    }, [tab, start, end])
}

