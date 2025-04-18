// Calendly API integration

const CALENDLY_API_KEY = process.env.NEXT_PUBLIC_CALENDLY_API_KEY;
const CALENDLY_EVENT_UUID = process.env.NEXT_PUBLIC_CALENDLY_EVENT_UUID;

// Fetch available time slots from Calendly
export async function fetchAvailableSlots() {
  try {
    // Create start date (tomorrow to ensure it's in the future)
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Set to beginning of the day

    // Format start date in ISO format without milliseconds
    const startDate = tomorrow.toISOString().split(".")[0] + "Z";

    // Create end date (exactly 7 days after start date to comply with Calendly's limit)
    const endDay = new Date(tomorrow);
    endDay.setDate(tomorrow.getDate() + 6); // 6 more days = 7 days total
    endDay.setHours(23, 59, 59, 0); // Set to end of the day

    // Format end date in ISO format without milliseconds
    const endDate = endDay.toISOString().split(".")[0] + "Z";

    const response = await fetch(
      `https://api.calendly.com/event_type_available_times?event_type=https://api.calendly.com/event_types/${CALENDLY_EVENT_UUID}&start_time=${startDate}&end_time=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${CALENDLY_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Calendly API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(
        `Failed to fetch availability: ${errorData.message || response.statusText}`
      );
    }

    const data = await response.json();
    return data.collection;
  } catch (error) {
    console.error("Error fetching Calendly availability:", error);
    throw error;
  }
}

// Schedule an event
export async function scheduleEvent(eventDetails) {
  try {
    const response = await fetch(`https://api.calendly.com/scheduled_events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CALENDLY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventDetails),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Failed to schedule event: ${errorData.message || response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error scheduling Calendly event:", error);
    throw error;
  }
}
