export function calculateTotalCost(
  bedrooms,
  bathrooms,
  hourlyRate,
  cleaningType = "standard"
) {
  let totalTime;
  if (cleaningType.toLowerCase() === "deep") {
    totalTime = 3 + bedrooms * 1 + bathrooms * 0.5;
  } else {
    const baseTime = bedrooms * 1 + bathrooms * 0.5;
    totalTime = Math.max(2, baseTime);
  }
  return Math.round(totalTime * hourlyRate);
}

export function calculateTotalPrice(services, selectedOptions, frequency) {
  let totalPrice = 0;

  services.forEach((service) => {
    totalPrice += service.basePrice;

    service.options.forEach((option) => {
      if (selectedOptions.includes(option.name)) {
        totalPrice += option.additionalPrice;
      }
    });
  });

  switch (frequency) {
    case "Weekly":
    case "Fortnightly":
      totalPrice *= 0.9;
      break;
    case "Monthly":
      totalPrice *= 0.95;
      break;
    default:
      break;
  }

  return totalPrice;
}
