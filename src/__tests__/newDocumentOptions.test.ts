import { describe, expect, it } from "vitest";

import {
  createMockNewDocumentOptionsContext,
  createMockSchema,
  createMockTemplate,
  createRegularSchemaType,
  createSingletonSchemaType,
} from "../__mocks__/sanity";
import { newDocumentOptions } from "../newDocumentOptions";

describe("New Document Options", () => {
  describe("Global context (creation menu)", () => {
    it("should filter out singleton documents from global creation menu", () => {
      const mockTypes = [
        createSingletonSchemaType("settings"),
        createRegularSchemaType("post"),
        createSingletonSchemaType("homepage"),
      ];

      const schema = createMockSchema(mockTypes);
      const context = createMockNewDocumentOptionsContext(
        "global",
        undefined,
        schema,
      );

      const prevOptions = [
        createMockTemplate("settings"),
        createMockTemplate("post"),
        createMockTemplate("homepage"),
        createMockTemplate("author"),
      ];

      const result = newDocumentOptions(prevOptions, context);

      expect(result).toHaveLength(2);
      expect(result.map((option) => option.templateId)).toEqual([
        "post",
        "author",
      ]);
    });

    it("should return all options when no singletons exist in global context", () => {
      const mockTypes = [
        createRegularSchemaType("post"),
        createRegularSchemaType("author"),
      ];

      const schema = createMockSchema(mockTypes);
      const context = createMockNewDocumentOptionsContext(
        "global",
        undefined,
        schema,
      );

      const prevOptions = [
        createMockTemplate("post"),
        createMockTemplate("author"),
      ];

      const result = newDocumentOptions(prevOptions, context);

      expect(result).toHaveLength(2);
      expect(result).toEqual(prevOptions);
    });
  });

  describe("Specific context (within document types)", () => {
    it("should filter out singleton documents when in singleton context", () => {
      const mockTypes = [
        createSingletonSchemaType("settings"),
        createRegularSchemaType("post"),
      ];

      const schema = createMockSchema(mockTypes);
      const context = createMockNewDocumentOptionsContext(
        "structure",
        "settings",
        schema,
      );

      const prevOptions = [
        createMockTemplate("settings"),
        createMockTemplate("post"),
        createMockTemplate("author"),
      ];

      const result = newDocumentOptions(prevOptions, context);

      expect(result).toHaveLength(2);
      expect(result.map((option) => option.templateId)).toEqual([
        "post",
        "author",
      ]);
    });

    it("should preserve all options when in regular document context", () => {
      const mockTypes = [
        createSingletonSchemaType("settings"),
        createRegularSchemaType("post"),
      ];

      const schema = createMockSchema(mockTypes);
      const context = createMockNewDocumentOptionsContext(
        "structure",
        "post",
        schema,
      );

      const prevOptions = [
        createMockTemplate("settings"),
        createMockTemplate("post"),
        createMockTemplate("author"),
      ];

      const result = newDocumentOptions(prevOptions, context);

      expect(result).toHaveLength(3);
      expect(result).toEqual(prevOptions);
    });

    it("should preserve all options when schemaType is undefined", () => {
      const mockTypes = [createSingletonSchemaType("settings")];

      const schema = createMockSchema(mockTypes);
      const context = createMockNewDocumentOptionsContext(
        "structure",
        undefined,
        schema,
      );

      const prevOptions = [
        createMockTemplate("settings"),
        createMockTemplate("post"),
      ];

      const result = newDocumentOptions(prevOptions, context);

      expect(result).toHaveLength(2);
      expect(result).toEqual(prevOptions);
    });
  });

  describe("Edge cases", () => {
    it("should handle empty previous options", () => {
      const mockTypes = [createSingletonSchemaType("settings")];

      const schema = createMockSchema(mockTypes);
      const context = createMockNewDocumentOptionsContext(
        "global",
        undefined,
        schema,
      );

      const prevOptions: any[] = [];
      const result = newDocumentOptions(prevOptions, context);

      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it("should handle when no singletons exist", () => {
      const mockTypes = [createRegularSchemaType("post")];

      const schema = createMockSchema(mockTypes);
      const context = createMockNewDocumentOptionsContext(
        "global",
        undefined,
        schema,
      );

      const prevOptions = [
        createMockTemplate("post"),
        createMockTemplate("author"),
      ];

      const result = newDocumentOptions(prevOptions, context);

      expect(result).toHaveLength(2);
      expect(result).toEqual(prevOptions);
    });

    it("should handle undefined singletons from getSingletonDocuments", () => {
      // Create a schema that would return undefined from getSingletonDocuments
      const schema = { _original: undefined };

      const context = createMockNewDocumentOptionsContext(
        "global",
        undefined,
        schema as any,
      );

      const prevOptions = [createMockTemplate("post")];
      const result = newDocumentOptions(prevOptions, context);

      expect(result).toHaveLength(1);
      expect(result).toEqual(prevOptions);
    });

    it("should handle templates without templateId property", () => {
      const mockTypes = [createSingletonSchemaType("settings")];

      const schema = createMockSchema(mockTypes);
      const context = createMockNewDocumentOptionsContext(
        "global",
        undefined,
        schema,
      );

      const prevOptions = [
        { templateId: "settings" },
        { id: "post" }, // Missing templateId
        { templateId: "author" },
      ];

      const result = newDocumentOptions(prevOptions, context);

      expect(result).toHaveLength(2);
      expect(result.map((option) => option.templateId || option.id)).toEqual([
        "post",
        "author",
      ]);
    });
  });
});
