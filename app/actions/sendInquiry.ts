"use server"

// @ts-ignore
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY || "")

export interface InquiryItem {
  slug: string
  name: string
  unit: string
  price: number
  qty: number
}

export interface InquiryData {
  ownerName: string
  phone: string
  email?: string
  note?: string
  items: InquiryItem[]
}

function formatRSD(value: number) {
  return value.toLocaleString("sr-RS", { maximumFractionDigits: 0 }) + " RSD"
}

export async function sendInquiry(data: InquiryData) {
  try {
    const { ownerName, phone, email, note, items } = data

    if (!ownerName || !phone) {
      return { success: false, error: "Ime i telefon su obavezni." }
    }
    if (!items || items.length === 0) {
      return { success: false, error: "Upit je prazan — dodajte proizvode." }
    }

    const total = items.reduce((s, i) => s + i.price * i.qty, 0)
    const rows = items
      .map(
        (i) => `
        <tr>
          <td style="padding:8px;border:1px solid #e2e8f0;">${i.name}<br/><span style="color:#64748b;font-size:12px;">${i.unit}</span></td>
          <td style="padding:8px;border:1px solid #e2e8f0;text-align:center;">${i.qty}</td>
          <td style="padding:8px;border:1px solid #e2e8f0;text-align:right;">${formatRSD(i.price)}</td>
          <td style="padding:8px;border:1px solid #e2e8f0;text-align:right;font-weight:bold;">${formatRSD(i.price * i.qty)}</td>
        </tr>`
      )
      .join("")

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
        <h2 style="color: #10b981;">Novi upit za proizvode — BG PET (demo shop)</h2>
        <p><strong>Kupac:</strong> ${ownerName}<br/>
        <strong>Telefon:</strong> ${phone}<br/>
        ${email ? `<strong>Email:</strong> ${email}<br/>` : ""}</p>
        ${note ? `<p><strong>Napomena:</strong><br/>${note.replace(/\n/g, "<br/>")}</p>` : ""}
        <table style="border-collapse:collapse;width:100%;margin:16px 0;">
          <thead>
            <tr style="background:#f8fafc;">
              <th style="padding:8px;border:1px solid #e2e8f0;text-align:left;">Proizvod</th>
              <th style="padding:8px;border:1px solid #e2e8f0;">Kol.</th>
              <th style="padding:8px;border:1px solid #e2e8f0;text-align:right;">Cena</th>
              <th style="padding:8px;border:1px solid #e2e8f0;text-align:right;">Ukupno</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <p style="font-size:18px;"><strong>Ukupno (okvirno): ${formatRSD(total)}</strong></p>
        <p style="color:#64748b;font-size:13px;">Bez online plaćanja — kupac čeka potvrdu dostupnosti i cene na telefon/email. Demo upit sa BG PET sajta.</p>
      </div>
    `

    const { data: responseData, error } = await resend.emails.send({
      from: "BG PET <onboarding@resend.dev>",
      to: ["pavlemaksimovic6@gmail.com"],
      subject: `Novi upit (${items.length} stavki) — ${ownerName}`,
      html,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, error: "Greška pri slanju emaila" }
    }

    return { success: true, data: responseData }
  } catch (error) {
    console.error("sendInquiry error:", error)
    return { success: false, error: "Serverska greška" }
  }
}
