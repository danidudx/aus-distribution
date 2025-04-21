import { client } from "@/sanity/lib/client";

export function calculateTotalPrice(services, selectedOptions, frequency) {
  let totalPrice = 0;

  // Add base prices for selected services
  services.forEach((service) => {
    totalPrice += service.basePrice;

    // Add prices for selected options
    service.options.forEach((option) => {
      if (selectedOptions.includes(option.name)) {
        totalPrice += option.additionalPrice;
      }
    });
  });

  // Apply frequency discounts
  switch (frequency) {
    case "Weekly":
    case "Fortnightly":
      totalPrice *= 0.9; // 10% off
      break;
    case "Monthly":
      totalPrice *= 0.95; // 5% off
      break;
    default:
      break;
  }

  return totalPrice;
}
