import { ComponentProps, useMemo } from "react";
import { Pagination } from "@/app/components/pagination";
import { modelColumns } from ".";
import { getModelDocs } from "../server";
import { usePromise } from "@/app/utils/hooks/usePromise";
import { useRouter } from "next/navigation";

const rowsPerPageOptions = [5, 20, 50, 70, 100];

interface routeTablePaginationArgs
  extends Pick<
    ComponentProps<typeof Pagination>,
    "start" | "end" | "maxRowCount"
  > {}
export const useRouteTablePagination = ({
  start,
  end,
  maxRowCount,
}: routeTablePaginationArgs) => {
  return useMemo(() => {
    return {
      columns: [
        {
          content: (
            <Pagination
              start={start}
              end={end}
              onPagination={(start, end) => {}}
              rowsPerPageOptions={rowsPerPageOptions}
              maxRowCount={maxRowCount}
              rowsPerPage={start - end}
            />
          ),
          cellProps: {
            padding: "none" as const,
            align: "right" as const,
            colSpan: modelColumns.length,
          },
        },
      ],
    };
  }, [start, end, maxRowCount]);
};

interface routeTableBodyRowsArgs
  extends Pick<ComponentProps<typeof Pagination>, "start" | "end"> {}
export const useModelTableBodyRows = ({
  start,
  end,
}: routeTableBodyRowsArgs) => {
  const documents = usePromise(useMemo(() => getModelDocs(start, end), []));
  console.log("🚀 --> useRouteTableBodyRows --> documents:", documents);
  const router = useRouter();
  return useMemo(() => {
    if (!documents) return;
    const { docs, maxDocsCount } = documents;

    const rows = docs.map((doc) => {
      return {
        columns: modelColumns.map((column) => {
          if (column.name === "properties") {
            return {
              content: doc.objectSchema.map((el) => el.propertyName).join(", "),
            } as const;
          }
          return {
            content: doc[column.name],
          } as const;
        }),
        rowProps: {
          hover: true,
          sx: { cursor: "pointer" },
          role: "checkbox",
          tabIndex: -1,
          onClick: async () => {
            router.push(`/resources/models/save?id=${doc.id}`);
          },
        },
      };
    });
    return {
      maxRowCount: maxDocsCount,
      rows: rows,
    };
  }, [documents]);
};
