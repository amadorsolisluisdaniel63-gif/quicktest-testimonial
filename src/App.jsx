import { useRef, useState } from "react"
import { toPng } from "html-to-image"

const themes = [
  {
    bg: "bg-slate-900",
    text: "text-slate-100",
    accent: "text-yellow-400",
    border: "border-yellow-400",
    quote: "text-yellow-400",
    label: "Oscuro",
  },
  {
    bg: "bg-white",
    text: "text-rose-900",
    accent: "text-rose-500",
    border: "border-rose-300",
    quote: "text-rose-400",
    label: "Rosa",
  },
  {
    bg: "bg-emerald-900",
    text: "text-emerald-50",
    accent: "text-emerald-300",
    border: "border-emerald-400",
    quote: "text-emerald-300",
    label: "Verde",
  },
  {
    bg: "bg-indigo-50",
    text: "text-indigo-900",
    accent: "text-indigo-500",
    border: "border-indigo-300",
    quote: "text-indigo-400",
    label: "Índigo",
  },
]

const fonts = ["font-sans", "font-serif", "font-mono"]
const fontLabels = ["Sans", "Serif", "Mono"]

export default function App() {
  const [text, setText] = useState("")
  const [author, setAuthor] = useState("")
  const [role, setRole] = useState("")
  const [theme, setTheme] = useState(0)
  const [font, setFont] = useState(0)
  const [stars, setStars] = useState(5)
  const [downloading, setDownloading] = useState(false)
  const [copied, setCopied] = useState(false)

  const cardRef = useRef(null)
  const t = themes[theme]
  const f = fonts[font]

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const url = await toPng(cardRef.current, { pixelRatio: 2 })
      const a = document.createElement("a")
      a.href = url
      a.download = "testimonio-pro.png"
      a.click()
    } catch {
      alert("Error al descargar. Intenta de nuevo.")
    }
    setDownloading(false)
  }

  const widgetCode = `<!-- Testimonio generado con QuickTest -->
<div style="background:#1e293b;color:#f8fafc;padding:24px;border-radius:16px;max-width:360px;font-family:sans-serif">
  <p style="font-size:2rem;color:#facc15;margin:0">"</p>
  <p style="font-size:0.95rem;line-height:1.6;margin:8px 0">${text || "Tu testimonio aquí"}</p>
  <p style="margin-top:16px;font-size:0.8rem;color:#facc15;font-weight:bold">— ${author || "Cliente"}</p>
  ${role ? `<p style="font-size:0.75rem;color:#94a3b8">${role}</p>` : ""}
</div>`

  const handleCopyWidget = () => {
    navigator.clipboard.writeText(widgetCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-12 px-4 gap-10">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Quick<span className="text-yellow-400">Test</span>
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          Genera tarjetas de testimonios profesionales en segundos
        </p>
      </div>

      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">

        {/* Panel izquierdo */}
        <div className="flex-1 flex flex-col gap-5">

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 uppercase tracking-wider">Testimonio</label>
            <textarea
              className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-sm resize-none h-32 focus:outline-none focus:border-yellow-400 transition text-white placeholder-gray-500"
              placeholder="Pega aquí el testimonio de tu cliente..."
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 uppercase tracking-wider">Nombre del cliente</label>
            <input
              className="bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-400 transition text-white placeholder-gray-500"
              placeholder="Ej: María García"
              value={author}
              onChange={e => setAuthor(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 uppercase tracking-wider">Cargo / Empresa (opcional)</label>
            <input
              className="bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-400 transition text-white placeholder-gray-500"
              placeholder="Ej: CEO en StartupMX"
              value={role}
              onChange={e => setRole(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400 uppercase tracking-wider">Calificación</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setStars(n)}
                  className={`text-2xl transition ${n <= stars ? "text-yellow-400" : "text-gray-600"}`}
                >★</button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400 uppercase tracking-wider">Tema de color</label>
            <div className="flex gap-3 flex-wrap">
              {themes.map((th, i) => (
                <button
                  key={i}
                  onClick={() => setTheme(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                    i === theme
                      ? "border-yellow-400 text-yellow-400"
                      : "border-gray-700 text-gray-400 hover:border-gray-500"
                  } ${th.bg}`}
                >
                  {th.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400 uppercase tracking-wider">Tipografía</label>
            <div className="flex gap-3">
              {fontLabels.map((fl, i) => (
                <button
                  key={i}
                  onClick={() => setFont(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                    i === font
                      ? "border-yellow-400 text-yellow-400"
                      : "border-gray-700 text-gray-400 hover:border-gray-500"
                  }`}
                >
                  {fl}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Panel derecho */}
        <div className="flex-1 flex flex-col gap-6 items-center">

          <div
            ref={cardRef}
            className={`w-80 rounded-2xl p-7 shadow-2xl border ${t.bg} ${t.border} ${f} transition-all duration-300`}
          >
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map(n => (
                <span key={n} className={`text-lg ${n <= stars ? t.accent : "opacity-20 " + t.text}`}>★</span>
              ))}
            </div>
            <p className={`text-3xl leading-none mb-2 ${t.quote}`}>"</p>
            <p className={`text-sm leading-relaxed ${t.text}`}>
              {text || "Tu testimonio aparecerá aquí..."}
            </p>
            <div className={`mt-5 pt-4 border-t ${t.border} border-opacity-30`}>
              <p className={`text-sm font-bold ${t.accent}`}>— {author || "Nombre del cliente"}</p>
              {role && <p className={`text-xs mt-0.5 opacity-60 ${t.text}`}>{role}</p>}
            </div>
            <p className={`mt-4 text-right text-xs opacity-30 ${t.text}`}>QuickTest ✦</p>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="bg-yellow-400 text-gray-900 font-bold py-3 rounded-xl hover:bg-yellow-300 transition disabled:opacity-50 text-sm"
            >
              {downloading ? "Generando..." : "⬇ Descargar PNG"}
            </button>
            <button
              onClick={handleCopyWidget}
              className="bg-gray-800 border border-gray-700 text-white font-medium py-3 rounded-xl hover:border-gray-500 transition text-sm"
            >
              {copied ? "✅ ¡Copiado!" : "📋 Copiar código HTML para web"}
            </button>
          </div>

          <div className="w-full max-w-xs">
            <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">Widget HTML</label>
            <pre className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-xs text-gray-400 overflow-x-auto whitespace-pre-wrap break-all">
              {widgetCode}
            </pre>
          </div>

        </div>
      </div>
    </div>
  )
}