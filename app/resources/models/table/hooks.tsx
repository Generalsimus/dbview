import { ComponentProps, useMemo } from "react";
import { Pagination } from "@/app/components/pagination";
import { modelColumns, } from ".";
import { getModelDocs } from "../server";
import { usePromise } from "@/app/utils/hooks/usePromise";
import { useRouter } from "next/navigation";
import { ModelTableParams } from "..";

const rowsPerPageOptions = [5, 20, 50, 70, 100];

export const useModelTablePagination = ({
  start,
  end,
  maxDocsCount,
}: ModelTableParams) => {
  return useMemo(() => {
    const router = useRouter();
    return {
      columns: [
        {
          content: (
            <Pagination
              start={start}
              end={end}
              onPagination={(start, end) => {
                router.push(`/resources/models/?start=${start}&end=${end}`);
              }}
              rowsPerPageOptions={rowsPerPageOptions}
              maxRowCount={maxDocsCount}
              rowsPerPage={end - start}
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
  }, [start, end, maxDocsCount]);
};

export const useModelTableBodyRows = ({
  docs
}: ModelTableParams) => {
  const router = useRouter();
  return useMemo(() => {

    return {
      rows: docs.map((doc) => {
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
      })
    }
  }, [docs]);
};
