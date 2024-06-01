import React from "react";
import { GetModelDoc } from "../server";
import { SaveModelForm } from ".";

interface IProps {
  searchParams?: { id?: String };
}
export default async ({ searchParams }: IProps) => {
  const modelId = Number(searchParams?.id);

  const modelDoc =
    typeof modelId === "number" ? await GetModelDoc(modelId) : undefined;
  const title =
    typeof modelDoc?.id === "number"
      ? `Edit Model "${modelDoc.name}"`
      : "Create Model";
  return (
    <>
      <SaveModelForm
        title={title}
        initialValue={modelDoc}
      />
    </>
  );
};
