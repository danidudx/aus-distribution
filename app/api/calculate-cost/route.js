import { NextResponse } from "next/server";
const hourlyRate = process.env.HOURLY_RATE || 64.8; // Default value if not set

export async function POST(request) {
  try {
    const req = await request.json();
    const { method, frequency, type } = req.cleaningDetails;

    // Validate required fields based on method
    if (!method || !frequency || !type) {
      return NextResponse.json(
        { error: "Method, frequency, and type are required" },
        { status: 400 }
      );
    }

    if (method.toLowerCase() === "by size") {
      // By Size method calculation
      const { bedrooms, bathrooms } = req.cleaningDetails;

      if (!bedrooms || !bathrooms) {
        return NextResponse.json(
          { error: "Bedrooms and bathrooms are required for By Size method" },
          { status: 400 }
        );
      }

      let totalTime;
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

      return NextResponse.json({ totalCost: Math.round(totalCost) });
    } else if (method.toLowerCase() === "hourly") {
      // Hourly method calculation
      const { hours, minutes, type } = req.cleaningDetails;

      if (hours === undefined || minutes === undefined) {
        return NextResponse.json(
          { error: "Hours and minutes are required for Hourly method" },
          { status: 400 }
        );
      }

      // Convert hours and minutes to total hours (e.g., 2 hours 30 minutes = 2.5 hours)
      let totalHours = hours + minutes / 60;

      // Add 3 more hours if the type is "deep clean"
      if (type.toLowerCase() === "deep clean") {
        totalHours += 3;
      }

      let totalCost = totalHours * hourlyRate;

      // Apply discount based on frequency
      if (
        frequency.toLowerCase() === "weekly" ||
        frequency.toLowerCase() === "fortnightly"
      ) {
        totalCost *= 0.9; // 10% discount
      } else if (frequency.toLowerCase() === "monthly") {
        totalCost *= 0.95; // 5% discount
      }

      return NextResponse.json({ totalCost: Math.round(totalCost) });
    } else {
      return NextResponse.json(
        { error: "Invalid method specified" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error calculating cost:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
