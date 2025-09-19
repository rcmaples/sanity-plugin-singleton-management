import { describe, expect, it } from "vitest";

import { singletonTools } from "../pluginConfig";

describe("Plugin Configuration", () => {
  it("should create a plugin with correct name", () => {
    const plugin = singletonTools();

    expect(plugin.name).toBe("singleton-tools");
  });

  it("should configure document actions and newDocumentOptions", () => {
    const plugin = singletonTools();

    expect(plugin.document).toBeDefined();
    expect(plugin.document.actions).toBeDefined();
    expect(plugin.document.newDocumentOptions).toBeDefined();
  });

  it("should return the same plugin configuration regardless of options", () => {
    const plugin1 = singletonTools();
    const plugin2 = singletonTools();

    expect(plugin1.name).toBe(plugin2.name);
    expect(plugin1.document.actions).toBe(plugin2.document.actions);
    expect(plugin1.document.newDocumentOptions).toBe(
      plugin2.document.newDocumentOptions,
    );
  });

  it("should have the expected plugin structure", () => {
    const plugin = singletonTools();

    expect(plugin).toMatchObject({
      name: "singleton-tools",
      document: {
        actions: expect.any(Function),
        newDocumentOptions: expect.any(Function),
      },
    });
  });
});
