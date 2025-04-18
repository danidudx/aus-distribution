export const serviceType = {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Service Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "basePrice",
      title: "Base Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "options",
      title: "Service Options",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Option Name",
              type: "string",
            },
            {
              name: "additionalPrice",
              title: "Additional Price",
              type: "number",
              validation: (Rule) => Rule.min(0),
            },
          ],
        },
      ],
    },
  ],
};
