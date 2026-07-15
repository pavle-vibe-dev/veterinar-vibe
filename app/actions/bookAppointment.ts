"use server"

// @ts-ignore
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || '')

export interface AppointmentData {
  ownerName: string
  petName?: string
  petType?: string
  service?: string
  notes: string
  email?: string
  phone?: string
}

export async function bookAppointment(data: AppointmentData) {
  try {
    const { ownerName, petName, petType, service, notes, email, phone } = data

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981; margin-bottom: 20px;">Nova rezervacija proizvoda - BG PET</h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #1e293b; margin-bottom: 15px;">Podaci o kupcu:</h3>
          <p><strong>Ime:</strong> ${ownerName}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
          ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        </div>
        
        ${notes ? `
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #1e293b; margin-bottom: 15px;">Traženi proizvodi:</h3>
          <p style="white-space: pre-wrap;">${notes}</p>
        </div>
        ` : ''}
        
        <div style="background: #10b981; color: white; padding: 15px; border-radius: 8px; text-align: center;">
          <p style="margin: 0; font-weight: bold;">Molimo da kontaktirate kupca u najkraćem mogućem roku</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b;">
          <p style="margin: 0;">Ovaj email je automatski generisan sa BG PET web sajta</p>
        </div>
      </div>
    `

    const { data: responseData, error } = await resend.emails.send({
      from: 'BG PET <onboarding@resend.dev>',
      to: ['pavlemaksimovic6@gmail.com'],
      subject: `Nova rezervacija proizvoda - BG PET - ${ownerName}`,
      html: emailContent,
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error: 'Greška pri slanju emaila' }
    }

    return { success: true, data: responseData }
  } catch (error) {
    console.error('Server action error:', error)
    return { success: false, error: 'Serverska greška' }
  }
}
