import { defineField } from "sanity";

export const productSchema = {
  name: "product",
  type: "document",
  title: "Product", //title used for sanity studio
  fields: [
    { name: "title", title: "Product Title", type: "string" },
    { name: "price", title: "Product Price", type: "number" },
    {
      name: "image",
      title: "Product Image",
      type: "array",
      of: [{ name: "img", title: "Image", type: "image" }],
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
      },
    },
    defineField({
      name: "category",
      title: "Product Category",
      type: "reference",
      to: [
        {
          type: "category", //refer to category type document
        },
      ],
    }),
    defineField({
      name: "productType",
      title: "Product Type",
      type: "reference",
      to: [
        {
          type: "productTypes", //refer to product type document
        },
      ],
    }),
  ],
};
