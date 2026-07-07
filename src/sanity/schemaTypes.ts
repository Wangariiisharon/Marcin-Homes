import { defineArrayMember, defineField, defineType } from "sanity";

export const schemaTypes = [
  defineType({
    name: "listing",
    title: "Listing",
    type: "document",
    fields: [
      defineField({
        name: "title",
        title: "Title",
        type: "string",
        validation: (Rule) => Rule.required().min(2),
      }),
      defineField({
        name: "slug",
        title: "Slug",
        type: "slug",
        options: { source: "title" },
      }),
      defineField({
        name: "image",
        title: "Image",
        type: "image",
        options: { hotspot: true },
        fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
      }),
      defineField({
        name: "gallery",
        title: "Gallery",
        type: "array",
        description: "Additional images shown in the listing detail dialog.",
        of: [
          defineArrayMember({
            type: "image",
            options: { hotspot: true },
            fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
          }),
        ],
      }),
      defineField({
        name: "description",
        title: "Description",
        type: "text",
        rows: 5,
      }),
      defineField({
        name: "location",
        title: "Location",
        type: "string",
      }),
      defineField({
        name: "price",
        title: "Price",
        type: "string",
      }),
      defineField({
        name: "status",
        title: "Status",
        type: "string",
        options: { list: ["For Sale", "For Lease", "For Rent"] },
      }),
      defineField({
        name: "beds",
        title: "Beds",
        type: "number",
      }),
      defineField({
        name: "baths",
        title: "Baths",
        type: "number",
      }),
      defineField({
        name: "sqft",
        title: "Sqft",
        type: "string",
      }),
    ],
  }),
  defineType({
    name: "service",
    title: "Service",
    type: "document",
    fields: [
      defineField({
        name: "title",
        title: "Title",
        type: "string",
        validation: (Rule) => Rule.required().min(2),
      }),
      defineField({
        name: "slug",
        title: "Slug",
        type: "slug",
        options: { source: "title" },
      }),
      defineField({
        name: "icon",
        title: "Icon",
        type: "string",
        options: {
          list: [
            { title: "Plumbers", value: "droplet" },
            { title: "Electricians", value: "zap" },
            { title: "Home Cleaners", value: "sparkles" },
            { title: "Nanny Services", value: "baby" },
            { title: "Gardening Services", value: "leaf" },
            { title: "Painters", value: "brush" },
          ],
          layout: "dropdown",
        },
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "blurb",
        title: "Blurb",
        type: "text",
        rows: 3,
      }),
      defineField({
        name: "items",
        title: "Items",
        type: "array",
        of: [defineArrayMember({ type: "string" })],
      }),
      defineField({
        name: "order",
        title: "Order",
        type: "number",
      }),
    ],
  }),
  defineType({
    name: "propertyManagementPage",
    title: "Property Management Page",
    type: "document",
    fields: [
      defineField({
        name: "headline",
        title: "Headline",
        type: "string",
      }),
      defineField({
        name: "intro",
        title: "Intro",
        type: "text",
        rows: 4,
      }),
      defineField({
        name: "pillars",
        title: "Pillars",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            fields: [
              defineField({ name: "title", type: "string" }),
              defineField({ name: "description", type: "text", rows: 2 }),
            ],
          }),
        ],
      }),
      defineField({
        name: "steps",
        title: "Steps",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            fields: [
              defineField({ name: "title", type: "string" }),
              defineField({ name: "description", type: "text", rows: 2 }),
            ],
          }),
        ],
      }),
      defineField({
        name: "ctaLabel",
        title: "CTA Label",
        type: "string",
      }),
      defineField({
        name: "ctaHref",
        title: "CTA Link",
        type: "string",
      }),
    ],
  }),
];
