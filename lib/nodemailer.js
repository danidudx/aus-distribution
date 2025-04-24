import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "mail.spacemail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    // Do not fail on invalid certificates
    rejectUnauthorized: false,
  },
});

export const sendInquiryEmail = async (inquiryData) => {
  const { name, email, phone, message } = inquiryData;

  const mailOptions = {
    from: "service@ausiwipe.com.au",
    to: "service@ausiwipe.com.au",
    subject: `New Inquiry from ${name}`,
    html: `
      <h2>New Inquiry Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending inquiry email:", error);
    return { success: false, error: error.message };
  }
};

export const sendBookingEmail = async (bookingData) => {
  const { customerDetails, cleaningDetails, paymentDetails } = bookingData;

  // Ensure all required fields have default values
  const serviceType = cleaningDetails?.type || "Not Available";
  const propertyType = cleaningDetails?.method || "Not Available";
  const bookingReference = paymentDetails?.bookingReference || "Not Available";
  const paymentStatus = paymentDetails?.paymentStatus || "Not Available";
  const stripePaymentId = paymentDetails?.stripePaymentId || "Not Available";

  // Email to service team
  const serviceMailOptions = {
    from: "Service@ausiwipe.com.au",
    to: "Service@ausiwipe.com.au",
    subject: `New Booking Received - ${paymentDetails.bookingReference}`,
    html: `
      <h2>New Booking Details</h2>
      
      <h3>Customer Information</h3>
      <p>Name: ${customerDetails.firstName} ${customerDetails.lastName}</p>
      <p>Email: ${customerDetails.email}</p>
      <p>Phone: ${customerDetails.phone}</p>
      <p>Address: ${customerDetails.address}</p>
      <p>Suburb: ${customerDetails.suburb}</p>
      <p>Parking Instructions: ${customerDetails.parking || "None"}</p>
      
      <h3>Cleaning Details</h3>
      <p>Service Type: ${serviceType}</p>
      <p>Property Type: ${propertyType}</p>
      <p>Bedrooms: ${cleaningDetails.bedrooms}</p>
      <p>Bathrooms: ${cleaningDetails.bathrooms}</p>
      <p>Date: ${cleaningDetails.date}</p>
      <p>Time: ${cleaningDetails.time}</p>
      <p>Extra Services: ${cleaningDetails.extras ? cleaningDetails.extras.join(", ") : "None"}</p>
      <p>Special Instructions: ${customerDetails.instructions || "None"}</p>
      
      <h3>Payment Information</h3>
      <p>Booking Reference: ${bookingReference}</p>
      <p>Total Amount: $${cleaningDetails.totalPrice}</p>
      <p>Payment Status: ${paymentStatus}</p>
      <p>Payment ID: ${stripePaymentId}</p>
    `,
  };

  // Email to customer
  const customerMailOptions = {
    from: "Service@ausiwipe.com.au",
    to: customerDetails.email,
    subject: "Booking Confirmation - AusiWipe",
    html: `
      <h2>Thank You for Choosing AusiWipe!</h2>
      <p>Dear ${customerDetails.firstName} ${customerDetails.lastName},</p>
      <p>Your booking has been confirmed. Here are your booking details:</p>
      
      <h3>Service Details</h3>
      <p>Service Type: ${serviceType}</p>
      <p>Property Type: ${propertyType}</p>
      <p>Bedrooms: ${cleaningDetails.bedrooms}</p>
      <p>Bathrooms: ${cleaningDetails.bathrooms}</p>
      <p>Date: ${cleaningDetails.date}</p>
      <p>Time: ${cleaningDetails.time}</p>
      <p>Location: ${customerDetails.address}, ${customerDetails.suburb}</p>
      <p>Extra Services: ${cleaningDetails.extras ? cleaningDetails.extras.join(", ") : "None"}</p>
      <p>Special Instructions: ${customerDetails.instructions || "None"}</p>
      <p>Parking Instructions: ${customerDetails.parking || "None"}</p>
      
      <h3>Payment Details</h3>
      <p>Booking Reference: ${paymentDetails.bookingReference}</p>
      <p>Total Amount: $${cleaningDetails.totalPrice}</p>
      <p>Payment Status: ${paymentDetails.paymentStatus}</p>
      
      <p>If you need to make any changes to your booking or have any questions, please don't hesitate to contact us.</p>
      
      <p>Best regards,<br>The AusiWipe Team</p>
    `,
  };

  try {
    // Send emails to both service team and customer
    await Promise.all([
      transporter.sendMail(serviceMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};
