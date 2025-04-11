import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    const bookingData = await request.json()
    console.log('Received booking data:', bookingData)

    // Debug environment variables
    console.log('Email configuration:', {
      apiKey: process.env.RESEND_API_KEY ? 'Set' : 'Not set',
    })

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Format the date and time
    const formattedDate = new Date(bookingData.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    // Create email content for admin notification
    const adminEmail = {
      from: 'grantharrison@ghcardetailing.com',
      to: ['fischerpaxton@gmail.com', 'Ghdetailing8@gmail.com'],
      subject: 'New Car Detailing Booking',
      html: `
        <h2>New Booking Details</h2>
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${bookingData.fullName}</p>
        <p><strong>Phone:</strong> ${bookingData.phone}</p>
        <p><strong>Email:</strong> ${bookingData.email}</p>
        
        <h3>Appointment Details</h3>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${bookingData.time}</p>
        
        <h3>Vehicle Information</h3>
        <p><strong>Make:</strong> ${bookingData.vehicleMake}</p>
        <p><strong>Model:</strong> ${bookingData.vehicleModel}</p>
        
        <h3>Selected Service</h3>
        <p><strong>Service:</strong> ${bookingData.service}</p>
      `,
    }

    // Create email content for customer confirmation
    const customerEmail = {
      from: 'grantharrison@ghcardetailing.com',
      to: bookingData.email,
      subject: 'Your Car Detailing Appointment Confirmation',
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: hsl(0, 84.2%, 60.2%); margin-bottom: 10px; font-weight: 700; font-size: 28px;">GH Car Detailing</h1>
            <p style="color: #6B7280; font-size: 18px; font-weight: 500;">Appointment Confirmation</p>
          </div>
          
          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid hsl(0, 84.2%, 60.2%);">
            <h2 style="color: hsl(0, 84.2%, 60.2%); margin-top: 0; font-weight: 600; font-size: 22px;">Thank you for booking with us!</h2>
            <p style="color: #4B5563; font-weight: 400; font-size: 16px;">We're excited to provide you with exceptional car detailing services at your location. Your appointment has been confirmed.</p>
          </div>
          
          <div style="margin-bottom: 20px; background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #E5E7EB;">
            <h3 style="color: hsl(0, 84.2%, 60.2%); border-bottom: 1px solid #E5E7EB; padding-bottom: 8px; font-weight: 600; font-size: 18px;">Appointment Details</h3>
            <p style="margin: 10px 0; font-weight: 400; font-size: 16px;"><strong style="color: hsl(0, 84.2%, 60.2%);">Date:</strong> ${formattedDate}</p>
            <p style="margin: 10px 0; font-weight: 400; font-size: 16px;"><strong style="color: hsl(0, 84.2%, 60.2%);">Time:</strong> ${bookingData.time}</p>
            <p style="margin: 10px 0; font-weight: 400; font-size: 16px;"><strong style="color: hsl(0, 84.2%, 60.2%);">Service:</strong> ${bookingData.service}</p>
            <p style="margin: 10px 0; font-weight: 400; font-size: 16px;"><strong style="color: hsl(0, 84.2%, 60.2%);">Location:</strong> Your home address</p>
          </div>
          
          <div style="margin-bottom: 20px; background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #E5E7EB;">
            <h3 style="color: hsl(0, 84.2%, 60.2%); border-bottom: 1px solid #E5E7EB; padding-bottom: 8px; font-weight: 600; font-size: 18px;">Vehicle Information</h3>
            <p style="margin: 10px 0; font-weight: 400; font-size: 16px;"><strong style="color: hsl(0, 84.2%, 60.2%);">Make:</strong> ${bookingData.vehicleMake}</p>
            <p style="margin: 10px 0; font-weight: 400; font-size: 16px;"><strong style="color: hsl(0, 84.2%, 60.2%);">Model:</strong> ${bookingData.vehicleModel}</p>
          </div>
          
          <div style="margin-bottom: 20px; background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #E5E7EB;">
            <h3 style="color: hsl(0, 84.2%, 60.2%); border-bottom: 1px solid #E5E7EB; padding-bottom: 8px; font-weight: 600; font-size: 18px;">What to Expect</h3>
            <ul style="color: #4B5563; padding-left: 20px; font-weight: 400; font-size: 16px;">
              <li style="margin-bottom: 8px;">Our team will arrive at your location 5-10 minutes before your scheduled appointment time</li>
              <li style="margin-bottom: 8px;">Please ensure your vehicle is accessible at your home address</li>
              <li style="margin-bottom: 8px;">Our team will greet you and discuss any specific areas of concern</li>
              <li style="margin-bottom: 8px;">Relax while we transform your vehicle right at your location</li>
            </ul>
          </div>
          
          <div style="margin-bottom: 20px; background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #E5E7EB;">
            <h3 style="color: hsl(0, 84.2%, 60.2%); border-bottom: 1px solid #E5E7EB; padding-bottom: 8px; font-weight: 600; font-size: 18px;">Need to Make Changes?</h3>
            <p style="color: #4B5563; font-weight: 400; font-size: 16px;">If you need to reschedule or cancel your appointment, please contact us at least 24 hours in advance.</p>
            <p style="color: #4B5563; margin-top: 10px; font-weight: 400; font-size: 16px;"><strong style="color: hsl(0, 84.2%, 60.2%);">Phone:</strong> (555) 123-4567</p>
            <p style="color: #4B5563; font-weight: 400; font-size: 16px;"><strong style="color: hsl(0, 84.2%, 60.2%);">Email:</strong> grantharrison@ghcardetailing.com</p>
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