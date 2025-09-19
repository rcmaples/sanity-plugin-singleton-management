import { ComponentType, ReactNode } from "react";
import { ConfigContext, SanityDocument } from "sanity";
import { StructureBuilder } from "sanity/structure";

export interface SingletonDocumentListItemConfig {
  S: StructureBuilder;
  context: ConfigContext;
  type: string;
  title?: string;
  id?: string;
  icon?: ComponentType | ReactNode;
}

export interface SingletonPluginListItemsConfig {
  S: StructureBuilder;
  context: ConfigContext;
}

export interface SingletonPluginOptions {
  singleton?: boolean;
}

export interface SanitySingletonDocument extends SanityDocument {
  options?: {
    singleton?: boolean;
  };
}

declare module "sanity" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface DocumentOptions extends SingletonPluginOptions {}
}
