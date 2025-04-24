import CleaningDetails from "./CleaningDetails";
import CustomerDetails from "./CustomerDetails";
import PaymentDetails from "./PaymentDetails";
import BookingSummary from "./BookingSummary";

import { fetchDiscountCode } from "../../sanity/lib/client";

// Function to fetch and display discount code
async function displayDiscountCode() {
  try {
    const discountCode = await fetchDiscountCode();
    // Display the discount code in the popup
    console.log("Discount Code:", discountCode);
  } catch (error) {
    console.error("Failed to fetch discount code:", error);
  }
}

// Call the function to display the discount code
// You can replace this with actual code to display in the popup
// For example, set the discount code in a state and render it in a component

export { CleaningDetails, CustomerDetails, PaymentDetails, BookingSummary };
