import { useState, useEffect, useMemo } from 'react'
import { getContent } from '../services/contentIndex'
import { useDownload } from '../hooks/useDownload'
import ContentCard from '../components/ContentCard'
import './Browse.css'
const TABS = [{ id: 'all', label: 'All' }, { id: 'classical', label: 'Books' }, { id: 'lectures', label: 'Lectures' }]
export default function Browse() {
  const [tab, setTab] = useState('all')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const { downloading, downloaded, download, remove, checkDownloaded } = useDownload()
  const items = useMemo(() => getContent(tab, search, filter), [tab, search, filter])
  useEffect(() => { items.forEach(i => checkDownloaded(i.id)) }, [])
  return (
    <div className="browse">
      <div className="browse-header">
        <div className="tabs">
          {TABS.map(t => <button key={t.id} className={`tab${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>)}
        </div>
        <div className="browse-filters">
          <div className="search-wrap">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input className="search-input" placeholder="Search titles, scholars, topics…" value={search} onChange={e => setSearch(e.target.value)} />
            {search && <button className="search-clear" onClick={() => setSearch('')}>✕</button>}
          </div>
          <div className="filter-pills">
            {['all', 'audio', 'book'].map(f => <button key={f} className={`pill${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f === 'all' ? 'All' : f === 'audio' ? '🎙️ MP3' : '📖 PDF'}</button>)}
          </div>
        </div>
      </div>
      {items.length === 0
        ? <div className="state-msg"><span>🔍</span><p>No results{search ? ` for "${search}"` : ''}.</p></div>
        : <>
            <div className="results-count">{items.length} item{items.length !== 1 ? 's' : ''}</div>
            <div className="card-grid">
              {items.map(item => <ContentCard key={item.id} item={item} onDownload={download} onRemove={remove} downloaded={downloaded[item.id]} downloading={downloading[item.id]} />)}
            </div>
          </>
      }
    </div>
  )
}
