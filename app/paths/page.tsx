import { AppDataSource } from "@/db/init";
import { Path } from "@/db/models/path";
import { PathValidation } from "@/types/models/path";
import { Stack } from "@mui/material";
import React, { } from "react";
import { AddRoutePath } from "../components/add-route-path-modal";
import { Table } from "../widget/table";
import * as PathService from "../../services/path"
import { ClassToObject } from "@/types/generics";

async function getPAths(): Promise<PathValidation[]> {
  // const value = await validation(FindManyPath, req)

  // const [pathDoc, total] = await pathRepository.findAndCount({
  //   where: {},
  //   take: 5,
  //   skip: 1
  // });
  const res = await PathService.find({
    ware: {},
    page: 1,
    docsCount: 5,
  })


  // if (pathDoc == null) {
  //   throw new NotFoundResource("PATH Document NOT FOUNT");
  // }
  return res.items
}

interface IProps {
}
const RoutePaths: React.FC<IProps> = React.memo(async ({ }) => {
  const paths = await getPAths();

  async function createPathDoc(value: Partial<ClassToObject<typeof PathValidation>>): Promise<void> {
    'use server'
    // const 
    console.log(value)
    const validateDvalue = Va
    // const
    return await new Promise((r) => setTimeout(r, 2000))
  }



  return <>
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="baseline"
      spacing={2}
    ></Stack>
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="baseline"
      spacing={2}
    >
      <div />


      <AddRoutePath routePath="/" saveDocument={createPathDoc} />
    </Stack>
    <Table columns={["name", "Path", "decryption"]} rows={paths.map(e => [e.name, e.path, e.description])} />
  </>;
});

export default RoutePaths

