import { NextResponse } from "next/server";
const hourlyRate = process.env.HOURLY_RATE;

export async function POST(request) {
  try {
    const req = await request.json();

    const { bedrooms, bathrooms, type, frequency } = req.cleaningDetails;
    if (!bedrooms || !bathrooms || !type || !frequency) {
      return NextResponse.json(
        { error: "All cleaning details are required" },
        { status: 400 }
      );
    }

    let totalTime;
    console.log("type", type);
    if (type.toLowerCase() === "deep clean") {
      totalTime = 3 + bedrooms * 1 + bathrooms * 0.5;
    } else {
      const baseTime = bedrooms * 1 + bathrooms * 0.5;
      totalTime = Math.max(2, baseTime);
    }

    const extrasPrices = {
      "inside-oven": 75,
      "inside-fridge": 75,
      "inside-cabinets": 75,
      "exterior-windows": 75,
    };
    const extrasCost =
      req.cleaningDetails.extras?.reduce(
        (total, extra) => total + (extrasPrices[extra] || 0),
        0
      ) || 0;
    let totalCost = totalTime * hourlyRate + extrasCost;

    // Apply discount based on frequency
    if (
      frequency.toLowerCase() === "weekly" ||
      frequency.toLowerCase() === "fortnightly"
    ) {
      totalCost *= 0.9; // 10% discount
    } else if (frequency.toLowerCase() === "monthly") {
      totalCost *= 0.95; // 5% discount
    }

    console.log("total cost printed", totalCost);

    return NextResponse.json({ totalCost });
  } catch (error) {
    console.error("Error calculating cost:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
