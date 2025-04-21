import { NextResponse } from "next/server";
const hourlyRate = process.env.HOURLY_RATE;

export async function POST(request) {
  try {
    const req = await request.json();

    const bedrooms = req.cleaningDetails.bedrooms;
    const bathrooms = req.cleaningDetails.bathrooms;
    const type = req.cleaningDetails.type;
    if (!bedrooms || !bathrooms || !type) {
      return NextResponse.json(
        { error: "All cleaning details are required" },
        { status: 400 }
      );
    }

    let totalTime;

    if (type.toLowerCase() === "deep") {
      totalTime = 3 + bedrooms * 1 + bathrooms * 0.5;
    } else {
      const baseTime = bedrooms * 1 + bathrooms * 0.5;
      totalTime = Math.max(2, baseTime);
    }

    const totalCost = totalTime * hourlyRate;
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
