import { Route, RouteSchema } from "@/basic/models/route";
import React from "react";
import { validate } from "@/utils";
import { RoutesTable } from "./routes-table";
import { MakeCreateOrUpdate, getCreateOrUpdateSchema } from "@/basic/db-basic-schema";
import { RouteModel } from "@/db/models/route";
import { Header } from "./header";

async function getRoutes(startIndex: number, endIndex: number) {
  const { rows, count } = await RouteModel.findAndCountAll({
    where: {},
    order: [
      ['createdAt', 'DESC']
    ],
    limit: endIndex - startIndex,
    offset: startIndex
  })

  return {
    routes: rows.map(el => el.dataValues),
    maxPathCount: count
  }
}


interface IProps {
  searchParams?: {
    start: string;
    end: string;
  }
}
const Routes = async ({ searchParams }: IProps) => {
  let start = Number(searchParams?.start) || 0;
  let end = Number(searchParams?.end) || 15;

  // startIndex: string
  // endIndex: string
  const { routes, maxPathCount } = await getRoutes(start, end)

  async function SaveRouteDoc(value: MakeCreateOrUpdate<Route>): Promise<void> {
    'use server'
    const validateRes = validate(value, getCreateOrUpdateSchema(RouteSchema))

    if (!validateRes.error) {
      const { value } = validateRes;

      const [instance, created] = await RouteModel.upsert(value);

    }

  }
  async function DeleteRouteDoc(id: number): Promise<void> {
    'use server'
    if (typeof id === "number") {
      await RouteModel.destroy({
        where: {
          id: id
        },
      });
    }

  }

  return <>

    <RoutesTable
      headerContent={
        <Header
          saveRouteDoc={SaveRouteDoc}
          deleteRouteDoc={DeleteRouteDoc}
        />
      }
      routes={routes}
      start={start}
      end={end}
      deleteRouteDoc={DeleteRouteDoc}
      saveRouteDoc={SaveRouteDoc}
      maxRowSize={maxPathCount}
    />

  </>;
};

export default Routes

