const PROXY = 'https://api.allorigins.win/get?url='
const BASE = 'https://www.kalamullah.com'

async function fetchPage(url) {
  const res = await fetch(`${PROXY}${encodeURIComponent(url)}`)
  if (!res.ok) throw new Error('Failed to fetch page')
  const json = await res.json()
  const parser = new DOMParser()
  return parser.parseFromString(json.contents, 'text/html')
}

export async function fetchClassicalBooks() {
  const doc = await fetchPage(`${BASE}/classical.html`)
  return extractItems(doc, 'classical')
}

export async function fetchLectures() {
  const doc = await fetchPage(`${BASE}/lectures.html`)
  return extractItems(doc, 'lectures')
}

export async function fetchSubPage(url) {
  const doc = await fetchPage(url)
  const pageTitle = doc.querySelector('h1,h2,h3,title')?.textContent?.trim() || ''
  return extractItems(doc, pageTitle)
}

function extractItems(doc, source) {
  const items = []
  doc.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href')
    const text = a.textContent.trim()
    if (!text || text.length < 3) return

    const lower = href?.toLowerCase() || ''
    const isPdf = lower.endsWith('.pdf')
    const isMp3 = lower.endsWith('.mp3')
    const isSubPage =
      href &&
      !href.startsWith('http') &&
      lower.endsWith('.html') &&
      !lower.includes('index') &&
      !lower.includes('nav')

    if (isPdf || isMp3 || isSubPage) {
      const fullUrl = href.startsWith('http') ? href : `${BASE}/${href.replace(/^\//, '')}`
      items.push({
        id: fullUrl,
        title: text,
        url: fullUrl,
        type: isPdf ? 'book' : isMp3 ? 'audio' : 'page',
        source,
      })
    }
  })
  return dedupe(items)
}

export async function downloadFile(url) {
  try {
    const res = await fetch(url)
    if (res.ok) return res.blob()
  } catch (_) {}

  const proxyUrl = `${PROXY}${encodeURIComponent(url)}`
  const res = await fetch(proxyUrl)
  if (!res.ok) throw new Error('Download failed')
  const json = await res.json()

  if (json.contents) {
    const binary = atob(json.contents)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    return new Blob([bytes])
  }
  throw new Error('Empty response')
}

function dedupe(items) {
  const seen = new Set()
  return items.filter((item) => {
    if (seen.has(item.id)) return false
    seen.add(item.id)
    return true
  })
}
