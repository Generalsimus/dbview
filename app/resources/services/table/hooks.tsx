import { ComponentProps, useMemo } from "react";
import { Pagination } from "@/app/components/pagination";
import { servicesColumns } from "./";
import { getServiceDocs } from "../server";
import { usePromise } from "@/app/utils/hooks/usePromise";
import { useRouter } from "next/navigation";
import { ServiceTableParams } from "..";

const rowsPerPageOptions = [5, 20, 50, 70, 100];


export const useServiceTablePagination = ({
  start,
  end,
  maxDocsCount,
}: ServiceTableParams) => {
  const router = useRouter();
  return useMemo(() => {
    return {
      columns: [
        {
          content: (
            <Pagination
              start={start}
              end={end}
              onPagination={(start, end) => {
                router.push(`/resources/services/?start=${start}&end=${end}`);
              }}
              rowsPerPageOptions={rowsPerPageOptions}
              maxRowCount={maxDocsCount}
              rowsPerPage={end - start}
            />
          ),
          cellProps: {
            padding: "none" as const,
            align: "right" as const,
            colSpan: servicesColumns.length,
          },
        },
      ],
    };
  }, [start, end, maxDocsCount]);
};

export const useServiceTableBodyRows = ({ docs }: ServiceTableParams) => {
  const router = useRouter();
  return useMemo(() => {

    return {
      rows: docs.map((doc) => {
        return {
          columns: servicesColumns.map((column) => {
            if (column.name === "methods") {

              return {
                content: doc.methods.map(el => el.name).join(', '),
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
              router.push(`/resources/services/save?id=${doc.id}`);
            },
          },
        };
      }),
    };
  }, [docs]);
};
