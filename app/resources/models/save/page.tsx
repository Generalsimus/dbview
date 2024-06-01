import React from "react";
import { DeleteModelDoc, GetModelDoc, SaveModelDoc } from "../server";
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
      ? `Edit Route "${modelDoc.name}"`
      : "Create Route";
  return (
    <>
      <SaveModelForm
        saveModelDoc={SaveModelDoc}
        deleteModelDoc={DeleteModelDoc}
        title={title}
        initialValue={modelDoc}
      />
    </>
  );
};
