import { defineField, defineType } from "sanity";

export const productTypeSchema = defineType({
  name: "productTypes",
  type: "document",
  title: "productTypes",
  fields: [
    defineField({
      name: "productType",
      title: "Product Type",
      type: "string",
    }),
  ],
});
