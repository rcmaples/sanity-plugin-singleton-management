import { DocumentIcon } from "@sanity/icons";
import type { ListItemBuilder } from "sanity/structure";

import { getSingletonDocuments } from "../helpers";
import {
  SingletonDocumentListItemConfig,
  SingletonPluginListItemsConfig,
} from "../types";

const singletonDocumentListItem = (
  config: SingletonDocumentListItemConfig,
): ListItemBuilder => {
  if (!config?.S || !config?.type || !config.context) {
    throw new Error(
      "S, context, and type must be provided to singletonDocumentListItem. " +
        "Example: singletonDocumentListItem({ S, context, type: 'product' })",
    );
  }
  const { S, type, title, icon, id, context } = config;
  const { schema } = context;

  if (!schema) {
    throw new Error(
      "Schema is required in context for singletonDocumentListItem",
    );
  }

  const schemaType = schema.get(type);
  const listTitle = title ?? schemaType?.title ?? type;
  const listIcon = icon ?? schemaType?.icon ?? DocumentIcon;
  const listId = id ?? type;

  return S.listItem()
    .title(listTitle)
    .icon(listIcon)
    .child(S.document().schemaType(type).title(listTitle).id(listId));
};

const singletonDocumentListItems = (
  config: SingletonPluginListItemsConfig,
): ListItemBuilder[] => {
  if (!config.S || !config.context) {
    throw new Error(
      "S and context must be provided to singletonDocumentListItems. " +
        "Example: singletonDocumentListItems({ S, context })",
    );
  }

  const { S, context } = config;
  const { schema } = context;

  const singletons = getSingletonDocuments(schema);

  return (
    singletons?.map((schemaType) =>
      singletonDocumentListItem({ S, context, type: schemaType }),
    ) || []
  );
};

const filteredDocumentListItems = (
  config: SingletonPluginListItemsConfig,
): ListItemBuilder[] => {
  if (!config.S || !config.context) {
    throw new Error(
      "S and context must be provided to filteredDocumentListItems. " +
        "Example: filteredDocumentListItems({ S, context })",
    );
  }
  const { S, context } = config;
  const { schema } = context;

  const singletons = getSingletonDocuments(schema);

  return S.documentTypeListItems().filter(
    (type) => !singletons || !singletons.includes(type.getId() as string),
  );
};

export {
  filteredDocumentListItems,
  singletonDocumentListItem,
  singletonDocumentListItems,
};
