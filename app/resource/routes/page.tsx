import { Route, RouteSchema } from "@/basic/models/route";
import React from "react";
import { validate } from "@/utils";
import { RoutesTable } from "./routes-table";
import { ExtendDbKeys, PartialDbKeys, partialDbKeySchema } from "@/basic/db-basic-schema";
import { RouteModel } from "@/db/models/route";
import { HeaderContent } from "./header";

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

  async function createRouteDoc(value: PartialDbKeys<ExtendDbKeys<Route>>): Promise<void> {
    'use server'
    const validateRes = validate(value, partialDbKeySchema(RouteSchema))

    if (!validateRes.error) {
      const { value } = validateRes;

      const [instance, created] = await RouteModel.upsert(value);
      // if (value.id) {
      // const res = await PathModel.update(value, {
      //   where: {
      //     id: value.id
      //   }
      // })
      // res.
      // 
      // // }
      // const res = await PathModel.create(value)
      // console.log({ value, res })

      // return instance.dataValues
      // const val = PathModel.create(value)
      // console.log({val})
      // const path = await PathModel.findOne({ id: value.id });
      // if (value.id) {
      // const [path, created] = await PathModel.findOrCreate<PathModel>({
      //   where: { id: value.id },
      //   defaults: {
      //     ...value
      //   }
      // });
      // const res = await PathModel.upsert({
      //   ...value
      //   // name: src.name,
      //   // titanId: src.id,
      // }, { id: value.id })
      // return
      // }
      // return await PathModel.create(value);
      // return PathModel.findOrCreate({
      //   where: {
      //     id: value.id,
      //   },
      //   transaction: t
      // })
    }

  }
  // console.log({ start, end, maxPathCount, searchParams })
  return <>
    <RoutesTable
      headerContent={
        <HeaderContent createRouteDoc={createRouteDoc} />
      }
      routes={routes}
      start={start}
      end={end}
      maxRowSize={maxPathCount}
    />

  </>;
};

export default Routes

