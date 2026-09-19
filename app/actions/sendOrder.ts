"use server"

// @ts-ignore
import { Resend } from "resend"
import { DEMO_BANK_ACCOUNT } from "../../data/checkout"

const resend = new Resend(process.env.RESEND_API_KEY || "")

export interface OrderItem {
  slug: string
  name: string
  unit: string
  price: number
  qty: number
}

export interface OrderData {
  orderNumber: string
  ownerName: string
  phone: string
  email?: string
  address: string
  city: string
  zip: string
  note?: string
  deliverySlug: string
  deliveryName: string
  deliveryPrice: number
  paymentSlug: string
  paymentName: string
  items: OrderItem[]
  subtotal: number
  total: number
  hasApotekaItems: boolean
}

function formatRSD(value: number) {
  return value.toLocaleString("sr-RS", { maximumFractionDigits: 0 }) + " RSD"
}

export async function sendOrder(data: OrderData) {
  try {
    const {
      orderNumber,
      ownerName,
      phone,
      email,
      address,
      city,
      zip,
      note,
      deliveryName,
      deliveryPrice,
      paymentName,
      paymentSlug,
      items,
      subtotal,
      total,
      hasApotekaItems,
    } = data

    if (!ownerName || !phone || items.length === 0) {
      return { success: false, error: "Nedostaju podaci za porudžbinu." }
    }

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

    const paymentNote =
      paymentSlug === "virman"
        ? `<p><strong>Uplata na račun:</strong> ${DEMO_BANK_ACCOUNT}<br/><strong>Poziv na broj:</strong> ${orderNumber}</p>`
        : paymentSlug === "pouzecem"
          ? `<p>Naplata pouzećem — kurir naplaćuje prilikom isporuke.</p>`
          : `<p>Plaćanje pri preuzimanju u apoteci.</p>`

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
        <h2 style="color: #10b981;">Nova porudžbina ${orderNumber} — BG PET</h2>
        <p><strong>Kupac:</strong> ${ownerName}<br/>
        <strong>Telefon:</strong> ${phone}<br/>
        ${email ? `<strong>Email:</strong> ${email}<br/>` : ""}
        <strong>Adresa:</strong> ${address}, ${zip} ${city}</p>
        ${note ? `<p><strong>Napomena:</strong><br/>${note.replace(/\n/g, "<br/>")}</p>` : ""}
        <p><strong>Dostava:</strong> ${deliveryName} (${formatRSD(deliveryPrice)})<br/>
        <strong>Plaćanje:</strong> ${paymentName}</p>
        ${paymentNote}
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
        <p>Međuzbir: ${formatRSD(subtotal)}<br/>Dostava: ${formatRSD(deliveryPrice)}</p>
        <p style="font-size:18px;"><strong>Ukupno za naplatu: ${formatRSD(total)}</strong></p>
        ${hasApotekaItems ? `<p style="background:#fefce8;padding:10px;border-radius:6px;font-size:13px;">⚠️ Porudžbina sadrži apotekarske preparate — kontaktirati kupca i izdati uz savet apotekara. Lekovi se ne šalju bez provere.</p>` : ""}
        <p style="color:#64748b;font-size:13px;">Demo porudžbina sa BG PET sajta (pouzećem / virman / lično — bez kartičnog plaćanja).</p>
      </div>
    `

    const { data: responseData, error } = await resend.emails.send({
      from: "BG PET <onboarding@resend.dev>",
      to: ["pavlemaksimovic6@gmail.com"],
      subject: `Nova porudžbina ${orderNumber} — ${ownerName} (${formatRSD(total)})`,
      html,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, error: "Greška pri slanju emaila" }
    }

    return { success: true, data: responseData }
  } catch (error) {
    console.error("sendOrder error:", error)
    return { success: false, error: "Serverska greška" }
  }
}
