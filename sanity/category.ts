import { defineField, defineType } from "sanity";

export const categorySchema = defineType({
  name: "category",
  type: "document",
  title: "Category",
  fields: [
    defineField({
      name: "category_name",
      title: "Category Name",
      type: "string"
    }),
  ],
});
