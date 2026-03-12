import { openDB } from 'idb'
const DB='ilm-db', V=1
async function db() {
  return openDB(DB,V,{ upgrade(d) {
    if(!d.objectStoreNames.contains('downloads')) d.createObjectStore('downloads',{keyPath:'id'})
    if(!d.objectStoreNames.contains('blobs')) d.createObjectStore('blobs',{keyPath:'id'})
  }})
}
export async function saveDownload(item) { (await db()).put('downloads',{...item,downloadedAt:Date.now()}) }
export async function saveBlob(id,blob) { (await db()).put('blobs',{id,blob}) }
export async function getBlob(id) { const e=await (await db()).get('blobs',id); return e?.blob||null }
export async function getAllDownloads() { return (await db()).getAll('downloads') }
export async function deleteDownload(id) { const d=await db(); d.delete('downloads',id); d.delete('blobs',id) }
export async function isDownloaded(id) { return !!(await (await db()).get('downloads',id)) }
