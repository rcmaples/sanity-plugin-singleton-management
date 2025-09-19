import { describe, expect, it } from "vitest";

import {
  createMockSchema,
  createRegularSchemaType,
  createSingletonSchemaType,
} from "../__mocks__/sanity";
import { getIsSingleton, getSingletonDocuments } from "../helpers";

describe("Helper Functions", () => {
  describe("getSingletonDocuments", () => {
    it("should return singleton document names from schema", () => {
      const mockTypes = [
        createSingletonSchemaType("settings"),
        createRegularSchemaType("post"),
        createSingletonSchemaType("homepage"),
        createRegularSchemaType("author"),
      ];

      const schema = createMockSchema(mockTypes);
      const result = getSingletonDocuments(schema);

      expect(result).toEqual(["settings", "homepage"]);
    });

    it("should return empty array when no singletons exist", () => {
      const mockTypes = [
        createRegularSchemaType("post"),
        createRegularSchemaType("author"),
      ];

      const schema = createMockSchema(mockTypes);
      const result = getSingletonDocuments(schema);

      expect(result).toEqual([]);
    });

    it("should handle empty schema types", () => {
      const schema = createMockSchema([]);
      const result = getSingletonDocuments(schema);

      expect(result).toEqual([]);
    });

    it("should handle undefined schema._original", () => {
      const schema = { _original: undefined };
      const result = getSingletonDocuments(schema as any);

      expect(result).toBeUndefined();
    });

    it("should handle schema without types", () => {
      const schema = { _original: { types: undefined } };
      const result = getSingletonDocuments(schema as any);

      expect(result).toBeUndefined();
    });
  });

  describe("getIsSingleton", () => {
    it("should return true for singleton document types", () => {
      const mockTypes = [
        createSingletonSchemaType("settings"),
        createRegularSchemaType("post"),
      ];

      const schema = createMockSchema(mockTypes);
      const result = getIsSingleton(schema, "settings");

      expect(result).toBe(true);
    });

    it("should return false for regular document types", () => {
      const mockTypes = [
        createSingletonSchemaType("settings"),
        createRegularSchemaType("post"),
      ];

      const schema = createMockSchema(mockTypes);
      const result = getIsSingleton(schema, "post");

      expect(result).toBe(false);
    });

    it("should return false for non-existent document types", () => {
      const mockTypes = [createSingletonSchemaType("settings")];

      const schema = createMockSchema(mockTypes);
      const result = getIsSingleton(schema, "nonexistent");

      expect(result).toBe(false);
    });

    it("should handle schema without singleton option", () => {
      const mockTypes = [
        {
          name: "withoutOptions",
          title: "Without Options",
          // No options property
        },
      ];

      const schema = createMockSchema(mockTypes);
      const result = getIsSingleton(schema, "withoutOptions");

      expect(result).toBe(false);
    });

    it("should handle undefined schema._original", () => {
      const schema = { _original: undefined };
      const result = getIsSingleton(schema as any, "anyType");

      expect(result).toBe(false);
    });

    it("should handle schema without types", () => {
      const schema = { _original: {} };
      const result = getIsSingleton(schema as any, "anyType");

      expect(result).toBe(false);
    });
  });
});
