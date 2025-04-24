import { client } from "@/sanity/lib/client";

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid email format" }),
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscription = await client.fetch(
      `*[_type == "subscription" && email == $email][0]`,
      { email }
    );

    if (existingSubscription) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email already subscribed",
        }),
        { status: 400 }
      );
    }

    // Create new subscription
    await client.create({
      _type: "subscription",
      email,
      status: true,
      subscribedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Successfully subscribed to newsletter",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to subscribe to newsletter",
      }),
      { status: 500 }
    );
  }
}
