import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    const contactData = await request.json()
    console.log('Received contact form data:', contactData)

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Create email content for admin notification
    const adminEmail = {
      from: 'grantharrison@ghcardetailing.com',
      to: ['fischerpaxton@gmail.com', 'Ghdetailing8@gmail.com'],
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Phone:</strong> ${contactData.phone}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        
        <h3>Message</h3>
        <p>${contactData.message}</p>
      `,
    }

    // Create email content for customer confirmation
    const customerEmail = {
      from: 'grantharrison@ghcardetailing.com',
      to: contactData.email,
      subject: 'Thank you for contacting GH Car Detailing',
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: hsl(0, 84.2%, 60.2%); margin-bottom: 10px; font-weight: 700; font-size: 28px;">GH Car Detailing</h1>
            <p style="color: #6B7280; font-size: 18px; font-weight: 500;">Thank You for Reaching Out</p>
          </div>
          
          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid hsl(0, 84.2%, 60.2%);">
            <h2 style="color: hsl(0, 84.2%, 60.2%); margin-top: 0; font-weight: 600; font-size: 22px;">We've Received Your Message</h2>
            <p style="color: #4B5563; font-weight: 400; font-size: 16px;">Thank you for contacting GH Car Detailing. We'll get back to you within 24 hours.</p>
          </div>
          
          <div style="margin-bottom: 20px; background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #E5E7EB;">
            <h3 style="color: hsl(0, 84.2%, 60.2%); border-bottom: 1px solid #E5E7EB; padding-bottom: 8px; font-weight: 600; font-size: 18px;">Your Message</h3>
            <p style="color: #4B5563; margin-top: 10px; font-weight: 400; font-size: 16px;">${contactData.message}</p>
          </div>
          
          <div style="margin-bottom: 20px; background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #E5E7EB;">
            <h3 style="color: hsl(0, 84.2%, 60.2%); border-bottom: 1px solid #E5E7EB; padding-bottom: 8px; font-weight: 600; font-size: 18px;">What's Next?</h3>
            <ul style="color: #4B5563; padding-left: 20px; font-weight: 400; font-size: 16px;">
              <li style="margin-bottom: 8px;">Our team will review your message</li>
              <li style="margin-bottom: 8px;">We'll respond within 24 hours</li>
              <li style="margin-bottom: 8px;">If urgent, feel free to call us at (555) 123-4567</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
            <p style="color: #6B7280; font-size: 14px; font-weight: 400;">© 2023 GH Car Detailing. All rights reserved.</p>
          </div>
        </div>
      `,
    }

    // Send admin notification email
    const adminResponse = await resend.emails.send(adminEmail)
    console.log('Admin email sent successfully:', adminResponse)

    // Send customer confirmation email
    const customerResponse = await resend.emails.send(customerEmail)
    console.log('Customer email sent successfully:', customerResponse)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Detailed error sending email:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 