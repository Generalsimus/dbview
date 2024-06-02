"use client";
import React from "react";
import {
  getCreateOrUpdateSchema,
  MakeCreateOrUpdate,
} from "@/utils/db-basic-schema";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { useRouter } from "next/navigation";
import { FromContainer } from "@/app/components/form-container";
import { DeleteModelDoc, SaveModelArgs, SaveModelDoc } from "../server";
import { getBasicModelDoc } from "./utils";
import { Form } from "./form";
import { saveModelSchema } from "../schema";
import { Model } from "@/db/types";
import { PropertyType } from "@/app/components/object-input/types";
import { PartialKeys } from "@/utils/generics";

export interface StateValueType
  extends Omit<MakeCreateOrUpdate<SaveModelArgs>, "objectSchema"> {
  objectSchema: PartialKeys<PropertyType, "value">[];
}
interface IProps {
  title: string;
  initialValue?: MakeCreateOrUpdate<SaveModelArgs>;
}

export const SaveModelForm: React.FC<IProps> = React.memo(({ title, initialValue }) => {

  const state = useSetProps<MakeCreateOrUpdate<StateValueType>>(
    () => initialValue || getBasicModelDoc()
  );

  const validation = state.getValidation(
    getCreateOrUpdateSchema(saveModelSchema)
  );
  const { getIfValid } = validation;

  const router = useRouter();
  const onSave = useMemoCall(async () => {
    const value = getIfValid(true);
    if (value) {
      await SaveModelDoc(value);
    }
    router.push(`/resources/models`);
  });

  const onDelete = useMemoCall(async () => {
    const docId = initialValue?.id;
    if (typeof docId === "number") {
      await DeleteModelDoc(docId);
      router.push(`/resources/models`);
    }
  });

  return (
    <>
      <FromContainer
        isEdit={!!initialValue}
        title={title}
        onSave={onSave}
        onDelete={onDelete}
        startBreadcrumbs={[{ title: "Models", href: "/resources/models" }]}
      >
        <Form {...state} />
      </FromContainer>
    </>
  );
}
);
