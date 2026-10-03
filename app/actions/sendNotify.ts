"use server"

import { Resend } from "resend"
import { shopInfo } from "../../data/shop-info"

const resend = new Resend(process.env.RESEND_API_KEY || "")

export interface NotifyData {
  slug: string
  name: string
  unit: string
  email: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function sendRestockNotify(data: NotifyData) {
  try {
    const email = (data.email || "").trim()

    if (!EMAIL_RE.test(email)) {
      return { success: false, error: "Unesite ispravnu email adresu." }
    }

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
        <h2 style="color: #10b981;">Zahtev za obaveštenje — ${shopInfo.name}</h2>
        <p>Kupac želi da bude obavešten kada proizvod ponovo bude dostupan:</p>
        <table style="border-collapse:collapse;width:100%;margin:16px 0;">
          <tbody>
            <tr>
              <td style="padding:8px;border:1px solid #e2e8f0;"><strong>Proizvod</strong></td>
              <td style="padding:8px;border:1px solid #e2e8f0;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding:8px;border:1px solid #e2e8f0;"><strong>Pakovanje</strong></td>
              <td style="padding:8px;border:1px solid #e2e8f0;">${data.unit}</td>
            </tr>
            <tr>
              <td style="padding:8px;border:1px solid #e2e8f0;"><strong>Email kupca</strong></td>
              <td style="padding:8px;border:1px solid #e2e8f0;">
                <a href="mailto:${email}">${email}</a>
              </td>
            </tr>
          </tbody>
        </table>
        <p style="color:#64748b;font-size:13px;">
          Link: ${shopInfo.siteUrl}/prodavnica/${data.slug}<br/>
          Pošaljite mu poruku kada artikal stigne (ili ga uključite u listu čekanja).
        </p>
      </div>
    `

    const { error } = await resend.emails.send({
      from: `${shopInfo.name} <${shopInfo.orderFrom}>`,
      to: [shopInfo.orderEmail],
      subject: `Obavesti me kad stigne — ${data.name}`,
      html,
    })

    if (error) {
      console.error("Resend notify error:", error)
      return { success: false, error: "Greška pri slanju. Pozovite nas." }
    }

    return { success: true }
  } catch (error) {
    console.error("sendRestockNotify error:", error)
    return { success: false, error: "Serverska greška" }
  }
}
