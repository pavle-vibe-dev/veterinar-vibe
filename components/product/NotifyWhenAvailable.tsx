"use client"

import { useState } from "react"
import { BellRing, CheckCircle2, Loader2, Mail } from "lucide-react"
import { sendRestockNotify } from "../../app/actions/sendNotify"

export default function NotifyWhenAvailable({
  slug,
  name,
  unit,
}: {
  slug: string
  name: string
  unit: string
}) {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  )
  const [error, setError] = useState("")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (state === "sending" || state === "done") return
    setState("sending")
    setError("")
    const res = await sendRestockNotify({ slug, name, unit, email })
    if (res.success) {
      setState("done")
    } else {
      setError(res.error || "Pokušajte ponovo.")
      setState("error")
    }
  }

  if (state === "done") {
    return (
      <div className="mt-5 flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-bold text-emerald-900">Zabeleženo!</p>
          <p className="text-emerald-800/80">
            Javićemo vam se na <strong>{email}</strong> čim ovaj artikal stigne.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      className="mt-5 bg-brand-bg border border-slate-200 rounded-2xl p-4"
    >
      <div className="flex items-center gap-2 mb-1">
        <BellRing className="w-4 h-4 text-brand-primary" />
        <p className="font-bold text-brand-dark text-sm">
          Obavesti me kad stigne
        </p>
      </div>
      <p className="text-xs text-brand-muted mb-3">
        Ostavite email — javljamo vama čim bude na stanju, bez obaveze.
      </p>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vas@email.rs"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
        <button
          type="submit"
          disabled={state === "sending"}
          className="btn-primary px-6 py-2.5 text-sm shrink-0 disabled:opacity-70"
        >
          {state === "sending" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Obavesti me"
          )}
        </button>
      </div>

      {state === "error" && error && (
        <p className="text-xs text-red-600 mt-2">{error}</p>
      )}
    </form>
  )
}
