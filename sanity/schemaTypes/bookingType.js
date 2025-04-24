export const bookingType = {
  name: "booking",
  title: "Booking",
  type: "document",

  fields: [
    {
      name: "cleaningDetails",
      title: "Cleaning Details",
      type: "object",
      fields: [
        {
          name: "bathrooms",
          title: "Number of Bathrooms",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: "bedrooms",
          title: "Number of Bedrooms",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: "date",
          title: "Cleaning Date",
          type: "date",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "time",
          title: "Cleaning Time",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "extras",
          title: "Extra Services",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "totalPrice",
          title: "Total Price",
          type: "number",
          validation: (Rule) => Rule.min(0),
        },
        {
          name: "frequency",
          title: "Frequency",
          type: "string",
          options: {
            list: [
              { title: "Once", value: "Once" },
              { title: "Weekly", value: "Weekly" },
              { title: "Fortnightly", value: "Fortnightly" },
              { title: "Monthly", value: "Monthly" },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "customerDetails",
      title: "Customer Details",
      type: "object",
      fields: [
        {
          name: "firstName",
          title: "First Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "lastName",
          title: "Last Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "email",
          title: "Email",
          type: "string",
          validation: (Rule) => Rule.required().email(),
        },
        {
          name: "phone",
          title: "Phone",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "address",
          title: "Address",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "suburb",
          title: "Suburb",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "instructions",
          title: "Special Instructions",
          type: "string",
        },
        {
          name: "parking",
          title: "Parking Details",
          type: "string",
        },
      ],
    },

    {
      name: "paymentDetails",
      title: "Payment Details",
      type: "object",
      fields: [
        {
          name: "bookingReference",
          title: "Booking Reference",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "stripePaymentId",
          title: "Stripe Payment ID",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "discountCode",
          title: "Discount Code",
          type: "string",
        },
        {
          name: "paymentDate",
          title: "Payment Date",
          type: "datetime",
        },
        {
          name: "paymentStatus",
          title: "Payment Status",
          type: "string",
          options: {
            list: [
              { title: "Pending", value: "pending" },
              { title: "Completed", value: "completed" },
              { title: "Failed", value: "failed" },
            ],
          },
          initialValue: "pending",
        },
      ],
    },

    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      bookingRef: "paymentDetails.bookingReference",
      customer: "customerDetails.firstName",
      date: "cleaningDetails.date",
    },
    prepare({ bookingRef, customer, date }) {
      return {
        title: bookingRef ? `Booking #${bookingRef}` : "New Booking",
        subtitle: `${customer || "Unknown"} - ${date ? new Date(date).toLocaleDateString() : "No Date"}`,
      };
    },
  },
};
