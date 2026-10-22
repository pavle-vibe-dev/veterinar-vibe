import Link from "next/link"

/**
 * Pločica brenda sa izgledom logotipa (ne običan tekst).
 *
 * Za demonstraciju se logotip generiše kao stilizovani SVG wordmark
 * (font, boje i potpis se deterministički biraju po imenu brenda) —
 * kada klijent dostavi službene logo fajlove, dovoljno je ubaciti
 * `public/brands/<brend-slug>.png` i proslediti mapu `logos` ovde,
 * pa se autentični logo automatski koristi umesto generisanog.
 */

type Palette = { main: string; accent: string }

const palettes: Palette[] = [
  { main: "#1e2a4a", accent: "#c9a253" }, // navy + zlato
  { main: "#b23a2f", accent: "#231f1a" }, // cigla + crno
  { main: "#2f6b3c", accent: "#e4b95b" }, // šumsko + krem zlato
  { main: "#231f1a", accent: "#d99f2b" }, // skoro-crno + ćilibar
  { main: "#1f5fa8", accent: "#0f3a6b" }, // plavo + tamno plavo
  { main: "#6d2a52", accent: "#c98f3d" }, // bordo-sljiva + zlato
  { main: "#0f6e77", accent: "#f2a541" }, // tirkiz + narandža
]

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0
  }
  return h
}

/** Paleta logotipa po brendu (deterministički) — koristi i marquee traka */
export function brandPalette(name: string): Palette {
  return palettes[hashString(name) % palettes.length]
}

/** Jednostavna šapa — mali potpis pored natpisa */
function Paw({ color, x, y, size }: { color: string; x: number; y: number; size: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 24})`} fill={color}>
      <ellipse cx="12" cy="15.5" rx="6.5" ry="5.5" />
      <circle cx="4.5" cy="9" r="3" />
      <circle cx="9.5" cy="5.5" r="3" />
      <circle cx="14.5" cy="5.5" r="3" />
      <circle cx="19.5" cy="9" r="3" />
    </g>
  )
}

export function BrandWordmark({ name, palette }: { name: string; palette: Palette }) {
  const h = hashString(name)
  const style = h % 3 // 0 = klasični serif, 1 = bez-serif "black" (velika slova), 2 = elegantni serif italic

  const long = name.length >= 14
  const mid = name.length >= 9
  const fontSize = long ? 21 : mid ? 26 : 31

  // šira imena centriranjem mogu preći ivicu — blago smanji razmak
  const letterSpacing = long ? 1.5 : mid ? 2 : 3

  const family =
    style === 0
      ? "Georgia, 'Times New Roman', serif"
      : style === 1
        ? "Arial, Helvetica, sans-serif"
        : "Georgia, serif"

  const weight = style === 1 ? 800 : 700
  const italic = style === 2
  const upper = style === 1

  return (
    <svg
      viewBox="0 0 240 96"
      className="h-full w-full"
      role="img"
      aria-label={name}
      preserveAspectRatio="xMidYMid meet"
    >
      <text
        x="120"
        y="54"
        textAnchor="middle"
        fontFamily={family}
        fontWeight={weight}
        fontStyle={italic ? "italic" : "normal"}
        fontSize={fontSize}
        letterSpacing={letterSpacing}
        fill={palette.main}
      >
        {upper ? name.toUpperCase() : name}
      </text>
      {/* potpis: šapa + crta ispod natpisa */}
      <line
        x1="52"
        y1="66"
        x2="96"
        y2="66"
        stroke={palette.accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="144"
        y1="66"
        x2="188"
        y2="66"
        stroke={palette.accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Paw color={palette.accent} x={112} y={54} size={16} />
    </svg>
  )
}

export default function BrandTile({ name, logo }: { name: string; logo?: string }) {
  const palette = palettes[hashString(name) % palettes.length]

  return (
    <Link
      href={`/prodavnica?brand=${encodeURIComponent(name)}`}
      className="group flex aspect-[5/2] items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-2 transition-all hover:border-brand-primary/50 hover:shadow-md"
      aria-label={`Brend ${name} — pogledaj proizvode`}
    >
      {logo ? (
        // Kada se dodaju pravi logo fajlovi (public/brands/*.png|svg)
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt={name} className="max-h-full max-w-full object-contain" />
      ) : (
        <div className="h-full w-full opacity-90 transition-opacity group-hover:opacity-100">
          <BrandWordmark name={name} palette={palette} />
        </div>
      )}
    </Link>
  )
}
