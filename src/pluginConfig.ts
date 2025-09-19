import { definePlugin } from "sanity";

import { actions } from "./actions";
import { newDocumentOptions } from "./newDocumentOptions";

export const singletonTools = definePlugin(() => {
  return {
    name: "singleton-tools",
    document: {
      newDocumentOptions,
      actions,
    },
  };
});
