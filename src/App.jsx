import { useRef, useState } from "react"
import { toPng } from "html-to-image"

const themes = [
  { bg: "bg-slate-900", text: "text-slate-100", accent: "text-yellow-400", border: "border-yellow-400", label: "Oscuro" },
  { bg: "bg-white", text: "text-rose-900", accent: "text-rose-500", border: "border-rose-300", label: "Rosa" },
  { bg: "bg-emerald-900", text: "text-emerald-50", accent: "text-emerald-300", border: "border-emerald-400", label: "Verde" },
  { bg: "bg-indigo-50", text: "text-indigo-900", accent: "text-indigo-500", border: "border-indigo-300", label: "Indigo" },
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

  const widgetCode = [
    "<!-- Testimonio generado con QuickTest -->",
    "<div style='background:#1e293b;color:#f8fafc;padding:24px;border-radius:16px;max-width:360px;font-family:sans-serif'>",
    "  <p style='font-size:0.95rem;line-height:1.6;margin:8px 0'>" + (text || "Tu testimonio aqui") + "</p>",
    "  <p style='margin-top:16px;font-size:0.8rem;color:#facc15;font-weight:bold'>-- " + (author || "Cliente") + "</p>",
    role ? "  <p style='font-size:0.75rem;color:#94a3b8'>" + role + "</p>" : "",
    "</div>",
  ].filter(Boolean).join("\n")

  const handleCopyWidget = () => {
    navigator.clipboard.writeText(widgetCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-12 px-4 gap-10">

      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Quick<span className="text-yellow-400">Test</span>
        </h1>
        <p className="text-gray-400 mt-1 text-sm">Genera tarjetas de testimonios profesionales en segundos</p>
      </div>

      <div className="w-full max-w-4xl bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <p className="font-bold text-sm">Version Pro $20 MXN</p>
          <p className="text-blue-100 text-xs mt-0.5">PNG en alta resolucion sin marca de agua</p>
        </div>
        <a
          href="https://link.mercadopago.com.mx/quicktest18289292828"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-blue-600 font-bold px-5 py-2 rounded-xl text-sm hover:bg-blue-50 transition whitespace-nowrap"
        >
          Comprar ahora
        </a>
      </div>

      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">

        <div className="flex-1 flex flex-col gap-5">

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 uppercase tracking-wider">Testimonio</label>
            <textarea
              className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-sm resize-none h-32 focus:outline-none focus:border-yellow-400 transition text-white placeholder-gray-500"
              placeholder="Pega aqui el testimonio de tu cliente..."
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 uppercase tracking-wider">Nombre del cliente</label>
            <input
              className="bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-400 transition text-white placeholder-gray-500"
              placeholder="Ej: Maria Garcia"
              value={author}
              onChange={e => setAuthor(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 uppercase tracking-wider">Cargo o Empresa (opcional)</label>
            <input
              className="bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:border-yellow-400 transition text-white placeholder-gray-500"
              placeholder="Ej: CEO en StartupMX"
              value={role}
              onChange={e => setRole(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400 uppercase tracking-wider">Calificacion</label>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(n => (
                <button
                  key={n}
                  onClick={() => setStars(n)}
                  className={"text-2xl transition " + (n <= stars ? "text-yellow-400" : "text-gray-600")}
                >
                  {"\u2605"}
                </button>
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
                  className={"px-3 py-1.5 rounded-lg text-xs font-medium border transition " + th.bg + " " + (i === theme ? "border-yellow-400 text-yellow-400" : "border-gray-700 text-gray-400 hover:border-gray-500")}
                >
                  {th.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400 uppercase tracking-wider">Tipografia</label>
            <div className="flex gap-3">
              {fontLabels.map((fl, i) => (
                <button
                  key={i}
                  onClick={() => setFont(i)}
                  className={"px-3 py-1.5 rounded-lg text-xs font-medium border transition " + (i === font ? "border-yellow-400 text-yellow-400" : "border-gray-700 text-gray-400 hover:border-gray-500")}
                >
                  {fl}
                </button>
              ))}
            </div>
          </div>

        </div>

        <div className="flex-1 flex flex-col gap-6 items-center">

          <div
            ref={cardRef}
            className={"w-80 rounded-2xl p-7 shadow-2xl border transition-all duration-300 " + t.bg + " " + t.border + " " + f}
          >
            <div className="flex gap-1 mb-4">
              {[1,2,3,4,5].map(n => (
                <span key={n} className={"text-lg " + (n <= stars ? t.accent : "opacity-20 " + t.text)}>
                  {"\u2605"}
                </span>
              ))}
            </div>
            <p className={"text-4xl leading-none mb-2 " + t.accent}>{"\u201C"}</p>
            <p className={"text-sm leading-relaxed " + t.text}>
              {text || "Tu testimonio aparecera aqui..."}
            </p>
            <div className={"mt-5 pt-4 border-t border-opacity-30 " + t.border}>
              <p className={"text-sm font-bold " + t.accent}>{"— " + (author || "Nombre del cliente")}</p>
              {role && (
                <p className={"text-xs mt-0.5 opacity-60 " + t.text}>{role}</p>
              )}
            </div>
            <p className={"mt-4 text-right text-xs opacity-30 " + t.text}>QuickTest</p>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="bg-yellow-400 text-gray-900 font-bold py-3 rounded-xl hover:bg-yellow-300 transition disabled:opacity-50 text-sm"
            >
              {downloading ? "Generando..." : "Descargar PNG gratis"}
            </button>

            <a
              href="https://link.mercadopago.com.mx/quicktest18289292828"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 rounded-xl transition text-sm text-center"
            >
              Obtener version Pro $20 MXN
            </a>

            <button
              onClick={handleCopyWidget}
              className="bg-gray-800 border border-gray-700 text-white font-medium py-3 rounded-xl hover:border-gray-500 transition text-sm"
            >
              {copied ? "Copiado!" : "Copiar codigo HTML para web"}
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
