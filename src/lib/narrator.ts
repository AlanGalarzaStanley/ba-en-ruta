/**
 * Reproduce la narración de una parada:
 * 1) grabación propia (audio) si existe;
 * 2) si no, voz automática del dispositivo (Web Speech API), marcada como tal en la interfaz;
 * 3) si tampoco hay voz, queda el texto en pantalla.
 * Si el navegador bloquea la reproducción automática, avisa para que se toque "Escuchar".
 */
export type NarratorMode = "audio" | "voice" | "text"
export type NarratorState = "idle" | "playing" | "paused" | "blocked" | "unsupported"

const LANG_TAG = { es: "es", en: "en", pt: "pt" } as const
const PREFERRED = { es: ["es-AR", "es-419", "es-US", "es-MX", "es-ES"], en: ["en-US", "en-GB"], pt: ["pt-BR", "pt-PT"] } as const

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined"
}

export function pickVoice(voices: SpeechSynthesisVoice[], lang: "es" | "en" | "pt"): SpeechSynthesisVoice | null {
  for (const tag of PREFERRED[lang]) {
    const v = voices.find((x) => x.lang.toLowerCase() === tag.toLowerCase())
    if (v) return v
  }
  return voices.find((x) => x.lang.toLowerCase().startsWith(LANG_TAG[lang])) ?? null
}

/** Divide el texto en frases: algunos navegadores cortan las locuciones largas. */
export function chunkText(text: string, max = 220): string[] {
  const sentences = text.match(/[^.!?…]+[.!?…]+["»”']?\s*|[^.!?…]+$/g) ?? [text]
  const out: string[] = []
  let cur = ""
  for (const s of sentences) {
    if ((cur + s).length > max && cur) {
      out.push(cur.trim())
      cur = ""
    }
    cur += s
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}

export class Narrator {
  private audio: HTMLAudioElement | null = null
  private queue: SpeechSynthesisUtterance[] = []
  private onState: (s: NarratorState, mode: NarratorMode) => void
  mode: NarratorMode = "text"
  state: NarratorState = "idle"

  constructor(onState: (s: NarratorState, mode: NarratorMode) => void) {
    this.onState = onState
  }

  private set(s: NarratorState) {
    this.state = s
    this.onState(s, this.mode)
  }

  /** Llamar dentro de un gesto del usuario (botón "Comenzar") para habilitar el audio en móviles. */
  unlock() {
    if (speechSupported()) {
      try {
        const u = new SpeechSynthesisUtterance(" ")
        u.volume = 0
        window.speechSynthesis.speak(u)
      } catch {
        /* ignore */
      }
    }
  }

  async play(text: string, lang: "es" | "en" | "pt", audioUrl?: string) {
    this.stop()
    if (audioUrl) {
      this.mode = "audio"
      const a = new Audio(audioUrl)
      this.audio = a
      a.onended = () => this.set("idle")
      a.onerror = () => this.speak(text, lang) // si falla la grabación, voz automática
      try {
        await a.play()
        this.set("playing")
      } catch {
        this.set("blocked")
      }
      return
    }
    this.speak(text, lang)
  }

  private speak(text: string, lang: "es" | "en" | "pt") {
    if (!speechSupported()) {
      this.mode = "text"
      this.set("unsupported")
      return
    }
    this.mode = "voice"
    const synth = window.speechSynthesis
    synth.cancel()
    const voice = pickVoice(synth.getVoices(), lang)
    const parts = chunkText(text)
    this.queue = parts.map((p, i) => {
      const u = new SpeechSynthesisUtterance(p)
      u.lang = voice?.lang ?? (lang === "pt" ? "pt-BR" : lang === "en" ? "en-US" : "es-AR")
      if (voice) u.voice = voice
      u.rate = 1
      if (i === parts.length - 1) u.onend = () => this.state === "playing" && this.set("idle")
      u.onerror = (e) => {
        if (e.error === "not-allowed") this.set("blocked")
        else if (e.error !== "interrupted" && e.error !== "canceled") this.set("idle")
      }
      return u
    })
    for (const u of this.queue) synth.speak(u)
    this.set("playing")
  }

  pause() {
    if (this.audio) this.audio.pause()
    else if (speechSupported()) window.speechSynthesis.pause()
    if (this.state === "playing") this.set("paused")
  }

  resume() {
    if (this.audio) void this.audio.play().then(() => this.set("playing"), () => this.set("blocked"))
    else if (speechSupported()) {
      window.speechSynthesis.resume()
      this.set("playing")
    }
  }

  stop() {
    if (this.audio) {
      this.audio.onended = null
      this.audio.onerror = null
      this.audio.pause()
      this.audio = null
    }
    if (speechSupported()) window.speechSynthesis.cancel()
    this.queue = []
    if (this.state !== "idle") this.set("idle")
  }
}
