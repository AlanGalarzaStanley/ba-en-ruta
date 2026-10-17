/**
 * Almacenamiento de códigos con escritura condicional (compare-and-swap por ETag).
 * Producción: Vercel Blob privado (incluido en el plan Hobby, con tope duro, sin cargos).
 * Pruebas y desarrollo local: memoria.
 */
export interface StoredDoc<T> {
  data: T
  etag: string
}

export class PreconditionFailed extends Error {
  constructor() {
    super("precondition_failed")
  }
}

export interface DocStore {
  get<T>(key: string): Promise<StoredDoc<T> | null>
  /** ifMatch: solo escribe si el ETag actual coincide. create: falla si ya existe. */
  put<T>(key: string, data: T, opts: { ifMatch?: string; create?: boolean }): Promise<string>
  list(prefix: string, limit: number): Promise<{ key: string; uploadedAt: number }[]>
}

export class MemoryStore implements DocStore {
  private docs = new Map<string, { json: string; etag: string; at: number }>()
  private n = 0
  async get<T>(key: string): Promise<StoredDoc<T> | null> {
    const d = this.docs.get(key)
    return d ? { data: JSON.parse(d.json) as T, etag: d.etag } : null
  }
  async put<T>(key: string, data: T, opts: { ifMatch?: string; create?: boolean }): Promise<string> {
    // Sin await entre la lectura y la escritura: atómico dentro del proceso.
    const cur = this.docs.get(key)
    if (opts.create && cur) throw new PreconditionFailed()
    if (opts.ifMatch !== undefined && (!cur || cur.etag !== opts.ifMatch)) throw new PreconditionFailed()
    const etag = `"m${++this.n}"`
    this.docs.set(key, { json: JSON.stringify(data), etag, at: Date.now() })
    return etag
  }
  async list(prefix: string, limit: number) {
    return [...this.docs.entries()]
      .filter(([k]) => k.startsWith(prefix))
      .map(([key, d]) => ({ key, uploadedAt: d.at }))
      .sort((a, b) => b.uploadedAt - a.uploadedAt)
      .slice(0, limit)
  }
}

export class BlobStore implements DocStore {
  private sdk = import("@vercel/blob")
  async get<T>(key: string): Promise<StoredDoc<T> | null> {
    const { get } = await this.sdk
    const r = await get(key, { access: "private", useCache: false })
    if (!r || r.statusCode !== 200 || !r.stream) return null
    const text = await new Response(r.stream).text()
    return { data: JSON.parse(text) as T, etag: r.blob.etag }
  }
  async put<T>(key: string, data: T, opts: { ifMatch?: string; create?: boolean }): Promise<string> {
    const { put, BlobPreconditionFailedError } = await this.sdk
    try {
      const res = await put(key, JSON.stringify(data), {
        access: "private",
        addRandomSuffix: false,
        contentType: "application/json",
        ...(opts.ifMatch ? { ifMatch: opts.ifMatch } : { allowOverwrite: !opts.create }),
      })
      return res.etag
    } catch (e) {
      if (e instanceof BlobPreconditionFailedError) throw new PreconditionFailed()
      // Con create (allowOverwrite: false) el SDK informa "ya existe" con otro error.
      if (opts.create && e instanceof Error && /already exists/i.test(e.message)) throw new PreconditionFailed()
      throw e
    }
  }
  async list(prefix: string, limit: number) {
    const { list } = await this.sdk
    const out: { key: string; uploadedAt: number }[] = []
    let cursor: string | undefined
    do {
      const r = await list({ prefix, limit: Math.min(1000, limit), cursor })
      for (const b of r.blobs) out.push({ key: b.pathname, uploadedAt: new Date(b.uploadedAt).getTime() })
      cursor = r.hasMore ? r.cursor : undefined
    } while (cursor && out.length < limit)
    return out.sort((a, b) => b.uploadedAt - a.uploadedAt).slice(0, limit)
  }
}
