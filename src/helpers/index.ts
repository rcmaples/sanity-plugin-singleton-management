import { Schema } from "sanity";

import { SingletonPluginOptions } from "../types";

export const getSingletonDocuments = (schema: Schema): string[] | undefined => {
  if (!schema?._original?.types) {
    return undefined;
  }

  return schema._original.types
    .filter(({ options }) => (options as SingletonPluginOptions)?.singleton)
    .map((s: { name: string }) => s.name);
};

export const getIsSingleton = (schema: Schema, schemaType: string): boolean => {
  if (!schema?._original?.types || !schemaType) {
    return false;
  }

  const documentSchema = schema._original.types.find(
    ({ name }) => name === schemaType,
  );

  return (
    (documentSchema?.options as SingletonPluginOptions)?.singleton ?? false
  );
};
