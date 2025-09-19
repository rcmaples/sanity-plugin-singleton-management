# sanity-plugin-singleton-tools

> This is compatible with v4 and v3 of Sanity Studio.

## What does this plugin do?

This plugin adds convenience functions to reduce the overhead of creating [singleton](https://www.sanity.io/docs/studio/structure-builder-cheat-sheet#k5cd7ca204386) documents in the [Sanity Studio](https://www.sanity.io).

In short, this does the following:

- Limits a singleton document's actions to Publish, Unpublish, and Discard Changes.
- Removes the ability to create new versions of the singleton document in both the global Create menu and Structure.
- Adds simple methods for customizing the way your singletons are listed in your Studio's Structure.

## Why Use This Plugin vs. Native Sanity Approaches?

While Sanity Studio supports singleton documents through the Structure Builder API, this
plugin eliminates the repetitive boilerplate and provides additional safeguards:

### Native Sanity Approach
```js
// Requires manual Structure Builder configuration for each singleton
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      // Must manually filter out singletons from main list
      ...S.documentTypeListItems().filter(listItem =>
        !['siteSettings'].includes(listItem.getId()))
    ])
```

**Issues:**

- Repetitive boilerplate for each singleton
- No prevention of duplicate document creation
- Users can still create new versions via global Create menu
- Manual filtering required to prevent duplicates in document lists


**With This Plugin:**

```js
  // Schema configuration
  export const siteSettings = {
    name: 'siteSettings',
    type: 'document',
    options: { singleton: true } // That's it!
  }

  // Structure configuration
  export const structure = (S, context) =>
    S.list()
      .items([
        ...singletonDocumentListItems({ S, context }), // Auto-generates all singletons
        ...filteredDocumentListItems({ S, context })   // Auto-filters singletons from main list
      ])
```

  Benefits:
  - ✅ Minimal configuration with `singleton: true`
  - ✅ Automatic action restrictions (no duplicate creation)
  - ✅ Global Create menu integration
  - ✅ Helper functions eliminate boilerplate
  - ✅ Consistent singleton behavior across your studio

## Installation

```sh
npm install sanity-plugin-singleton-tools
```

## Usage

### 1. Add the plugin to your `sanity.config`

```js
//sanity.config.js
import { defineConfig } from "sanity";
import { singletonTools } from "sanity-plugin-singleton-tools";

export default defineConfig({
  //...
  plugins: [singletonTools()],
});
```

### 2. Configure your singleton's schema

```js
//mySingleton.js
export const mySingleton = {
  name: "mySingleton",
  title: "My Singleton",
  type: "document",
  options: {
    singleton: true, // Identify this document as a singleton
  },
};
```

### 3. Customize how your singleton is shown in your Structure:

```js
// structure.js
import {
  singletonDocumentListItem,
  singletonDocumentListItems,
  filteredDocumentListItems,
} from "sanity-plugin-singleton-tools";
import { PlugIcon } from "@sanity/icons";

export const structure = (S, context) =>
  S.list()
    .title("Sanity Love Content")
    .items([
      // Create a list item for each singleton document in your schema that links directly to a document view
      ...singletonDocumentListItems({ S, context }),
      // Create a list item for a specific singleton
      singletonDocumentListItem({
        S,
        context,
        // Schema type
        type: "mySingleton",
        // Required for showing multiple singletons of the same schema type
        title: "My Singleton",
        // Required for showing multiple singletons of the same schema type
        id: "mySingleton",
        // Specify a custom icon
        icon: PlugIcon,
      }),
      S.divider(),
      // Filter singleton documents out of the default S.documentTypeListItems() to prevent them from being rendered as lists or as duplicates
      ...filteredDocumentListItems({ S, context }),
    ]);
```

## Appendix

Other reading (Sanity docs):

- [Singleton documents](https://www.sanity.io/docs/studio/structure-builder-cheat-sheet#k5cd7ca204386)
- [Filtering out singletons in Structure](https://www.sanity.io/docs/studio/create-a-link-to-a-single-edit-page-in-your-main-document-type-list#fa1e82fd32be)
- [Creating a link to a single edit page](https://www.sanity.io/docs/studio/create-a-link-to-a-single-edit-page-in-your-main-document-type-list)

## License

[MIT](LICENSE) © RD Pennell & RC Maples
