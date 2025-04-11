import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    const incompleteData = await request.json()
    console.log('Received incomplete booking data:', incompleteData)

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Create email content for admin notification
    const adminEmail = {
      from: 'grantharrison@ghcardetailing.com',
      to: ['fischerpaxton@gmail.com', 'Ghdetailing8@gmail.com'],
      subject: 'Incomplete Booking Alert',
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: hsl(0, 84.2%, 60.2%); margin-bottom: 10px; font-weight: 700; font-size: 28px;">Incomplete Booking Alert</h1>
            <p style="color: #6B7280; font-size: 18px; font-weight: 500;">A potential customer started but didn't complete their booking</p>
          </div>
          
          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #111827; margin-top: 0; font-weight: 600; font-size: 18px;">Partial Information Collected:</h2>
            ${incompleteData.fullName ? `<p><strong>Name:</strong> ${incompleteData.fullName}</p>` : ''}
            ${incompleteData.email ? `<p><strong>Email:</strong> ${incompleteData.email}</p>` : ''}
            ${incompleteData.phone ? `<p><strong>Phone:</strong> ${incompleteData.phone}</p>` : ''}
            ${incompleteData.date ? `<p><strong>Desired Date:</strong> ${incompleteData.date}</p>` : ''}
            ${incompleteData.time ? `<p><strong>Desired Time:</strong> ${incompleteData.time}</p>` : ''}
            ${incompleteData.vehicleMake ? `<p><strong>Vehicle Make:</strong> ${incompleteData.vehicleMake}</p>` : ''}
            ${incompleteData.vehicleModel ? `<p><strong>Vehicle Model:</strong> ${incompleteData.vehicleModel}</p>` : ''}
            ${incompleteData.service ? `<p><strong>Service:</strong> ${incompleteData.service}</p>` : ''}
          </div>
          
          <div style="margin-bottom: 20px; background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #E5E7EB;">
            <h3 style="color: #111827; margin-top: 0; font-weight: 600; font-size: 16px;">Booking Progress</h3>
            <p style="color: #4B5563;">The customer stopped at: <strong>${incompleteData.lastStep}</strong></p>
            <p style="color: #4B5563;">Time started: <strong>${new Date(incompleteData.startTime).toLocaleString()}</strong></p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
            <p style="color: #6B7280; font-size: 14px;">Consider following up with this potential customer if contact information was provided.</p>
          </div>
        </div>
      `,
    }

    // Send admin notification email
    const adminResponse = await resend.emails.send(adminEmail)
    console.log('Admin notification sent successfully:', adminResponse)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending incomplete booking notification:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send notification',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 