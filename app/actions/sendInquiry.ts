"use server"

import { Resend } from "resend"
import { recordInquiry } from "../../lib/orders"
import { shopInfo } from "../../data/shop-info"

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
    if ((!items || items.length === 0) && !note?.trim()) {
      return { success: false, error: "Dodajte proizvode ili opišite šta tražite." }
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

    const itemsTable = items.length
      ? `
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
        <p style="font-size:18px;"><strong>Ukupno (okvirno): ${formatRSD(total)}</strong></p>`
      : ""

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
        <h2 style="color: #10b981;">Novi upit za proizvode — ${shopInfo.name}</h2>
        <p><strong>Kupac:</strong> ${ownerName}<br/>
        <strong>Telefon:</strong> ${phone}<br/>
        ${email ? `<strong>Email:</strong> ${email}<br/>` : ""}</p>
        ${note ? `<p><strong>Napomena:</strong><br/>${note.replace(/\n/g, "<br/>")}</p>` : ""}
        ${itemsTable}
        <p style="color:#64748b;font-size:13px;">Bez online plaćanja — kupac čeka potvrdu dostupnosti i cene na telefon/email.</p>
      </div>
    `

    const { data: responseData, error } = await resend.emails.send({
      from: `${shopInfo.name} <${shopInfo.orderFrom}>`,
      to: [shopInfo.orderEmail],
      subject: `Novi upit (${items.length} stavki) — ${ownerName}`,
      html,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, error: "Greška pri slanju emaila" }
    }

    if (email) {
      const confirm = await resend.emails.send({
        from: `${shopInfo.name} <${shopInfo.orderFrom}>`,
        to: [email],
        subject: `Potvrda upita — ${shopInfo.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
            <h2 style="color:#10b981;">Hvala na upitu, ${ownerName}!</h2>
            <p>Vaš upit je primljen. Javljamo se telefonom na <strong>${phone}</strong>
            da potvrdimo dostupnost i tačnu cenu.</p>
            <p style="color:#64748b;font-size:13px;">Ako imate pitanja, odgovorite na ovaj email.</p>
          </div>`,
      })
      if (confirm.error) console.error("Resend confirm error:", confirm.error)
    }

    const { recorded } = await recordInquiry({
      customerName: ownerName,
      phone,
      email,
      note,
      items: items.map((i) => ({ name: i.name, unit: i.unit, qty: i.qty, price: i.price }))
    })

    return { success: true, data: responseData, recorded }
  } catch (error) {
    console.error("sendInquiry error:", error)
    return { success: false, error: "Serverska greška" }
  }
}
