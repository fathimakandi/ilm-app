import { useState, useCallback } from 'react'
import { saveDownload, saveBlob, deleteDownload, isDownloaded, getBlob } from '../services/storage'

async function downloadFile(url) {
  try { const r = await fetch(url); if (r.ok) return r.blob() } catch(_) {}
  throw new Error('Download failed')
}

export function useDownload() {
  const [downloading, setDownloading] = useState({})
  const [downloaded, setDownloaded] = useState({})

  const checkDownloaded = useCallback(async (id) => {
    if (!(await isDownloaded(id))) return null
    const blob = await getBlob(id)
    if (!blob) return null
    const url = URL.createObjectURL(blob)
    setDownloaded(p => ({ ...p, [id]: url }))
    return url
  }, [])

  const download = useCallback(async (item) => {
    if (downloading[item.id] !== undefined) return
    setDownloading(p => ({ ...p, [item.id]: 0 }))
    try {
      const blob = await downloadFile(item.url)
      const blobUrl = URL.createObjectURL(blob)
      await saveBlob(item.id, blob)
      await saveDownload({ id: item.id, title: item.title, url: item.url, type: item.type, source: item.source, size: blob.size })
      setDownloaded(p => ({ ...p, [item.id]: blobUrl }))
      setDownloading(p => { const n={...p}; delete n[item.id]; return n })
      return blobUrl
    } catch(err) {
      setDownloading(p => ({ ...p, [item.id]: 'error' }))
      setTimeout(() => setDownloading(p => { const n={...p}; delete n[item.id]; return n }), 3000)
      return null
    }
  }, [downloading])

  const remove = useCallback(async (id) => {
    await deleteDownload(id)
    if (downloaded[id]) URL.revokeObjectURL(downloaded[id])
    setDownloaded(p => { const n={...p}; delete n[id]; return n })
  }, [downloaded])

  return { downloading, downloaded, download, remove, checkDownloaded }
}
