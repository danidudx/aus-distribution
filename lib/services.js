export function calculateHourlyDuration(hours, minutes) {
  const totalTime = hours + minutes / 60;
  console.log("Hourly duration calculation:", { hours, minutes, totalTime });
  return totalTime;
}

export function calculateHourlyCost(
  hours,
  minutes,
  hourlyRate,
  frequency = "Once-off"
) {
  const totalTime = calculateHourlyDuration(hours, minutes);
  let totalCost = Math.round(totalTime * hourlyRate);

  // Apply frequency discounts
  switch (frequency) {
    case "Weekly":
    case "Fortnightly":
      totalCost *= 0.9; // 10% discount
      break;
    case "Monthly":
      totalCost *= 0.95; // 5% discount
      break;
    default:
      break;
  }

  return Math.round(totalCost);
}

export function calculateTotalCost(
  bedrooms,
  bathrooms,
  hourlyRate,
  cleaningType = "standard",
  method = "By Size",
  hours = 0,
  minutes = 0,
  frequency = "Once-off"
) {
  console.log("calculateTotalCost inputs:", {
    bedrooms,
    bathrooms,
    hourlyRate,
    cleaningType,
    method,
    hours,
    minutes,
    frequency,
  });

  console.log("Method check in calculateTotalCost:", {
    method,
    isHourly: method === "Hourly",
  });
  if (method === "Hourly") {
    const hourlyCost = calculateHourlyCost(
      hours,
      minutes,
      hourlyRate,
      frequency
    );
    console.log("Hourly cost calculation result:", {
      hours,
      minutes,
      hourlyRate,
      frequency,
      hourlyCost,
    });
    return hourlyCost;
  }

  let totalTime;
  if (cleaningType.toLowerCase() === "deep clean") {
    totalTime = 3 + bedrooms * 1 + bathrooms * 0.5;
  } else {
    const baseTime = bedrooms * 1 + bathrooms * 0.5;
    totalTime = Math.max(2, baseTime);
  }

  let totalCost = Math.round(totalTime * hourlyRate);

  // Apply frequency discounts
  switch (frequency) {
    case "Weekly":
    case "Fortnightly":
      totalCost *= 0.9;
      break;
    case "Monthly":
      totalCost *= 0.95;
      break;
    default:
      break;
  }

  return Math.round(totalCost);
}

export function calculateDuration(
  bedrooms,
  bathrooms,
  hourlyRate,
  cleaningType = "standard",
  method = "By Size",
  hours = 0,
  minutes = 0
) {
  console.log("calculateDuration inputs:", {
    bedrooms,
    bathrooms,
    hourlyRate,
    cleaningType,
    method,
    hours,
    minutes,
  });

  if (method === "Hourly") {
    return calculateHourlyDuration(hours, minutes);
  }

  let totalTime;
  if (cleaningType.toLowerCase() === "deep") {
    totalTime = 3 + bedrooms * 1 + bathrooms * 0.5;
  } else {
    const baseTime = bedrooms * 1 + bathrooms * 0.5;
    totalTime = Math.max(2, baseTime);
  }
  return totalTime;
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
