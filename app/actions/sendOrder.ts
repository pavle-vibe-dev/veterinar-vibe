"use server"

import { Resend } from "resend"
import { shopInfo } from "../../data/shop-info"
import { recordOrder } from "../../lib/orders"

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
        ? shopInfo.bankAccount
          ? `<p><strong>Uplata na račun:</strong> ${shopInfo.bankAccount}<br/><strong>Poziv na broj:</strong> ${orderNumber}</p>`
          : `<p><strong>Poziv na broj:</strong> ${orderNumber}<br/>Račun za uplatu dobijate uz potvrdu porudžbine.</p>`
        : paymentSlug === "pouzecem"
          ? `<p>Naplata pouzećem — kurir naplaćuje prilikom isporuke.</p>`
          : `<p>Plaćanje pri preuzimanju u apoteci.</p>`

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
        <h2 style="color: #10b981;">Nova porudžbina ${orderNumber} — ${shopInfo.name}</h2>
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
        <p style="color:#64748b;font-size:13px;">Bez karttičnog plaćanja — narudžbina se obrađuje telefonom (virman / pouzećem / lično preuzimanje).</p>
      </div>
    `

    const { data: responseData, error } = await resend.emails.send({
      from: `${shopInfo.name} <${shopInfo.orderFrom}>`,
      to: [shopInfo.orderEmail],
      subject: `Nova porudžbina ${orderNumber} — ${ownerName} (${formatRSD(total)})`,
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
        subject: `Potvrda porudžbine ${orderNumber} — ${shopInfo.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
            <h2 style="color:#10b981;">Hvala na porudžbini, ${ownerName}!</h2>
            <p>Vaša porudžbina <strong>${orderNumber}</strong> je primljena. Javljamo se
            telefonom na <strong>${phone}</strong> da potvrdimo dostupnost i termin isporuke.</p>
            <p style="font-size:18px;"><strong>Ukupno: ${formatRSD(total)}</strong></p>
            <p style="color:#64748b;font-size:13px;">Ako imate pitanja, odgovorite na ovaj email.</p>
          </div>`,
      })
      if (confirm.error) console.error("Resend confirm error:", confirm.error)
    }

    const { recorded } = await recordOrder({
      orderNumber,
      customerName: ownerName,
      phone,
      email,
      address,
      city,
      zip,
      deliveryName,
      deliveryPrice,
      paymentName,
      items: items.map((i) => ({ name: i.name, unit: i.unit, qty: i.qty, price: i.price })),
      subtotal,
      total,
      hasApotekaItems,
      note
    })

    return { success: true, data: responseData, recorded }
  } catch (error) {
    console.error("sendOrder error:", error)
    return { success: false, error: "Serverska greška" }
  }
}
