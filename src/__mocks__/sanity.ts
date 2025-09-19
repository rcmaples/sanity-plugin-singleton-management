import { vi } from "vitest";

// Mock Schema
export const createMockSchema = (types: any[] = []) => ({
  _original: {
    types,
  },
  get: vi.fn((typeName: string) => {
    const type = types.find((t) => t.name === typeName);
    return type || null;
  }),
});

// Mock Structure Builder
export const createMockStructureBuilder = () => ({
  list: vi.fn(() => ({
    title: vi.fn(() => ({})),
    items: vi.fn(() => ({})),
  })),
  listItem: vi.fn(() => ({
    title: vi.fn().mockReturnThis(),
    icon: vi.fn().mockReturnThis(),
    child: vi.fn().mockReturnThis(),
  })),
  document: vi.fn(() => ({
    schemaType: vi.fn().mockReturnThis(),
    title: vi.fn().mockReturnThis(),
    id: vi.fn().mockReturnThis(),
  })),
  documentTypeListItems: vi.fn(() => [
    {
      getId: vi.fn(() => "regularDocument"),
    },
    {
      getId: vi.fn(() => "anotherDocument"),
    },
  ]),
});

// Mock Context
export const createMockContext = (schema: any) => ({
  schema,
});

// Mock Document Actions
export const createMockDocumentActions = () => [
  { action: "publish" },
  { action: "unpublish" },
  { action: "discardChanges" },
  { action: "duplicate" },
  { action: "delete" },
  { action: "restore" },
];

// Mock Schema Types
export const createSingletonSchemaType = (name: string) => ({
  name,
  title: `${name} Title`,
  icon: "DocumentIcon",
  options: {
    singleton: true,
  },
});

export const createRegularSchemaType = (name: string) => ({
  name,
  title: `${name} Title`,
  icon: "DocumentIcon",
  options: {},
});

// Mock Document Actions Context
export const createMockDocumentActionsContext = (
  schemaType: string,
  schema: any,
) => ({
  schema,
  schemaType,
});

// Mock New Document Options Context
export const createMockNewDocumentOptionsContext = (
  type: string,
  schemaType: string | undefined,
  schema: any,
) => ({
  schema,
  creationContext: {
    type,
    schemaType,
  },
});

// Mock Template
export const createMockTemplate = (templateId: string) => ({
  templateId,
});
