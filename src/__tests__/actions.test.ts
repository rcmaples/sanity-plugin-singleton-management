import { describe, expect, it } from "vitest";

import {
  createMockDocumentActions,
  createMockDocumentActionsContext,
  createMockSchema,
  createRegularSchemaType,
  createSingletonSchemaType,
} from "../__mocks__/sanity";
import { actions } from "../actions";

describe("Document Actions", () => {
  it("should filter actions for singleton documents", () => {
    const mockTypes = [
      createSingletonSchemaType("settings"),
      createRegularSchemaType("post"),
    ];

    const schema = createMockSchema(mockTypes);
    const context = createMockDocumentActionsContext("settings", schema);
    const prevActions = createMockDocumentActions();

    const result = actions(prevActions, context);

    expect(result).toHaveLength(3);
    expect(result.map((a) => a.action)).toEqual([
      "publish",
      "discardChanges",
      "restore",
    ]);
  });

  it("should preserve all actions for regular documents", () => {
    const mockTypes = [
      createSingletonSchemaType("settings"),
      createRegularSchemaType("post"),
    ];

    const schema = createMockSchema(mockTypes);
    const context = createMockDocumentActionsContext("post", schema);
    const prevActions = createMockDocumentActions();

    const result = actions(prevActions, context);

    expect(result).toHaveLength(6);
    expect(result.map((a) => a.action)).toEqual([
      "publish",
      "unpublish",
      "discardChanges",
      "duplicate",
      "delete",
      "restore",
    ]);
  });

  it("should preserve all actions for non-existent document types", () => {
    const mockTypes = [createSingletonSchemaType("settings")];

    const schema = createMockSchema(mockTypes);
    const context = createMockDocumentActionsContext("nonexistent", schema);
    const prevActions = createMockDocumentActions();

    const result = actions(prevActions, context);

    expect(result).toHaveLength(6);
    expect(result).toEqual(prevActions);
  });

  it("should handle empty previous actions", () => {
    const mockTypes = [createSingletonSchemaType("settings")];

    const schema = createMockSchema(mockTypes);
    const context = createMockDocumentActionsContext("settings", schema);
    const prevActions: any[] = [];

    const result = actions(prevActions, context);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it("should only include allowed actions for singletons", () => {
    const mockTypes = [createSingletonSchemaType("settings")];

    const schema = createMockSchema(mockTypes);
    const context = createMockDocumentActionsContext("settings", schema);

    // Custom actions that include some allowed and some not allowed
    const prevActions = [
      { action: "publish" },
      { action: "customAction" },
      { action: "discardChanges" },
      { action: "duplicate" },
      { action: "restore" },
    ];

    const result = actions(prevActions, context);

    expect(result).toHaveLength(3);
    expect(result.map((a) => a.action)).toEqual([
      "publish",
      "discardChanges",
      "restore",
    ]);
  });

  it("should handle actions with additional properties", () => {
    const mockTypes = [createSingletonSchemaType("settings")];

    const schema = createMockSchema(mockTypes);
    const context = createMockDocumentActionsContext("settings", schema);

    const prevActions = [
      { action: "publish", label: "Publish", icon: "PublishIcon" },
      { action: "delete", label: "Delete", icon: "DeleteIcon" },
      { action: "discardChanges", label: "Discard", icon: "DiscardIcon" },
    ];

    const result = actions(prevActions, context);

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { action: "publish", label: "Publish", icon: "PublishIcon" },
      { action: "discardChanges", label: "Discard", icon: "DiscardIcon" },
    ]);
  });
});
