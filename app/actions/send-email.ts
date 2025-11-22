"use server"

import { z } from "zod"

const emailSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
})

export async function sendEmail(formData: {
  name: string
  email: string
  phone: string
  message: string
}) {
  try {
    // Validate input
    const validatedData = emailSchema.parse(formData)

    // Send email using a server-side email service
    // You can use Resend, SendGrid, or any other email service here
    // For now, we'll use a simple fetch to EmailJS from the server

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        template_params: {
          to_email: "manuelsmusicschool@gmail.com",
          from_name: validatedData.name,
          from_email: validatedData.email,
          phone: validatedData.phone || "Not provided",
          message: validatedData.message,
        },
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send email")
    }

    return { success: true, message: "Email sent successfully!" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "Failed to send email. Please try again." }
  }
}
