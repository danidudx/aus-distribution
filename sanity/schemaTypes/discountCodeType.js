export const discountCodeType = {
  name: "discountCode",
  title: "Discount Code",
  type: "document",
  fields: [
    {
      name: "code",
      title: "Code",
      type: "string",
      validation: (Rule) => Rule.required().max(20),
    },
  ],
  // Ensure only one document can be created
  __experimental_actions: ["update", "publish"],
};
