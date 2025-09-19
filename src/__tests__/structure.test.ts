import { describe, expect, it, vi } from "vitest";

import {
  createMockContext,
  createMockSchema,
  createMockStructureBuilder,
  createRegularSchemaType,
  createSingletonSchemaType,
} from "../__mocks__/sanity";
import {
  filteredDocumentListItems,
  singletonDocumentListItem,
  singletonDocumentListItems,
} from "../structure";

describe("Structure Functions", () => {
  describe("singletonDocumentListItem", () => {
    it("should create a list item for a singleton document", () => {
      const mockTypes = [createSingletonSchemaType("settings")];
      const schema = createMockSchema(mockTypes);
      const S = createMockStructureBuilder();
      const context = createMockContext(schema);

      const config = {
        S,
        context,
        type: "settings",
      };

      const result = singletonDocumentListItem(config);

      expect(S.listItem).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it("should use provided title, icon, and id", () => {
      const mockTypes = [createSingletonSchemaType("settings")];
      const schema = createMockSchema(mockTypes);
      schema.get = vi.fn().mockReturnValue({
        title: "Settings Schema",
        icon: "SettingsIcon",
      });

      const S = createMockStructureBuilder();
      const context = createMockContext(schema);

      const config = {
        S,
        context,
        type: "settings",
        title: "Custom Title",
        icon: "CustomIcon",
        id: "custom-id",
      };

      singletonDocumentListItem(config);

      expect(S.listItem).toHaveBeenCalled();
      expect(S.document).toHaveBeenCalled();
    });

    it("should fallback to schema values when title/icon not provided", () => {
      const mockTypes = [createSingletonSchemaType("settings")];
      const schema = createMockSchema(mockTypes);
      schema.get = vi.fn().mockReturnValue({
        title: "Settings Schema",
        icon: "SettingsIcon",
      });

      const S = createMockStructureBuilder();
      const context = createMockContext(schema);

      const config = {
        S,
        context,
        type: "settings",
      };

      singletonDocumentListItem(config);

      expect(schema.get).toHaveBeenCalledWith("settings");
      expect(S.listItem).toHaveBeenCalled();
    });

    it("should throw error when S is missing", () => {
      const config = {
        S: null,
        context: {},
        type: "settings",
      };

      expect(() => singletonDocumentListItem(config as any)).toThrow(
        "S, context, and type must be provided",
      );
    });

    it("should throw error when context is missing", () => {
      const S = createMockStructureBuilder();
      const config = {
        S,
        context: null,
        type: "settings",
      };

      expect(() => singletonDocumentListItem(config as any)).toThrow(
        "S, context, and type must be provided",
      );
    });

    it("should throw error when type is missing", () => {
      const S = createMockStructureBuilder();
      const context = createMockContext({});

      const config = {
        S,
        context,
        type: null,
      };

      expect(() => singletonDocumentListItem(config as any)).toThrow(
        "S, context, and type must be provided",
      );
    });
  });

  describe("singletonDocumentListItems", () => {
    it("should create list items for all singleton documents", () => {
      const mockTypes = [
        createSingletonSchemaType("settings"),
        createRegularSchemaType("post"),
        createSingletonSchemaType("homepage"),
      ];

      const schema = createMockSchema(mockTypes);
      const S = createMockStructureBuilder();
      const context = createMockContext(schema);

      const config = { S, context };
      const result = singletonDocumentListItems(config);

      expect(result).toHaveLength(2);
      expect(S.listItem).toHaveBeenCalledTimes(2);
    });

    it("should return empty array when no singletons exist", () => {
      const mockTypes = [
        createRegularSchemaType("post"),
        createRegularSchemaType("author"),
      ];

      const schema = createMockSchema(mockTypes);
      const S = createMockStructureBuilder();
      const context = createMockContext(schema);

      const config = { S, context };
      const result = singletonDocumentListItems(config);

      expect(result).toHaveLength(0);
    });

    it("should handle undefined singletons", () => {
      const schema = { _original: undefined };
      const S = createMockStructureBuilder();
      const context = createMockContext(schema);

      const config = { S, context };
      const result = singletonDocumentListItems(config);

      expect(result).toHaveLength(0);
    });

    it("should throw error when S is missing", () => {
      const config = {
        S: null,
        context: {},
      };

      expect(() => singletonDocumentListItems(config as any)).toThrow(
        "S and context must be provided",
      );
    });

    it("should throw error when context is missing", () => {
      const S = createMockStructureBuilder();
      const config = {
        S,
        context: null,
      };

      expect(() => singletonDocumentListItems(config as any)).toThrow(
        "S and context must be provided",
      );
    });
  });

  describe("filteredDocumentListItems", () => {
    it("should filter out singleton documents from document list", () => {
      const mockTypes = [
        createSingletonSchemaType("settings"),
        createRegularSchemaType("post"),
        createSingletonSchemaType("homepage"),
      ];

      const schema = createMockSchema(mockTypes);
      const S = createMockStructureBuilder();

      // Mock documentTypeListItems to return items including singletons
      S.documentTypeListItems = vi.fn(() => [
        { getId: vi.fn(() => "settings") },
        { getId: vi.fn(() => "post") },
        { getId: vi.fn(() => "homepage") },
        { getId: vi.fn(() => "regularDocument") },
        { getId: vi.fn(() => "anotherDocument") },
      ]);

      const context = createMockContext(schema);

      const config = { S, context };
      const result = filteredDocumentListItems(config);

      expect(S.documentTypeListItems).toHaveBeenCalled();
      expect(result).toHaveLength(3); // Should exclude 'settings' and 'homepage'

      const resultIds = result.map((item) => item.getId());
      expect(resultIds).toEqual(["post", "regularDocument", "anotherDocument"]);
    });

    it("should return all items when no singletons exist", () => {
      const mockTypes = [createRegularSchemaType("post")];

      const schema = createMockSchema(mockTypes);
      const S = createMockStructureBuilder();

      S.documentTypeListItems = vi.fn(() => [
        { getId: vi.fn(() => "post") },
        { getId: vi.fn(() => "author") },
      ]);

      const context = createMockContext(schema);

      const config = { S, context };
      const result = filteredDocumentListItems(config);

      expect(result).toHaveLength(2);
    });

    it("should handle undefined singletons", () => {
      const schema = { _original: undefined };
      const S = createMockStructureBuilder();

      const mockItems = [
        { getId: vi.fn(() => "post") },
        { getId: vi.fn(() => "author") },
      ];
      S.documentTypeListItems = vi.fn(() => mockItems);

      const context = createMockContext(schema);

      const config = { S, context };
      const result = filteredDocumentListItems(config);

      expect(result).toHaveLength(2); // Should return all items when no singletons
      expect(result).toEqual(mockItems);
    });

    it("should throw error when S is missing", () => {
      const config = {
        S: null,
        context: {},
      };

      expect(() => filteredDocumentListItems(config as any)).toThrow(
        "S and context must be provided",
      );
    });

    it("should throw error when context is missing", () => {
      const S = createMockStructureBuilder();
      const config = {
        S,
        context: null,
      };

      expect(() => filteredDocumentListItems(config as any)).toThrow(
        "S and context must be provided",
      );
    });
  });
});
