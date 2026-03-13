import { useState, useEffect, useMemo } from 'react'
import { getContent, CONTENT } from '../services/contentIndex'
import { useDownload } from '../hooks/useDownload'
import { usePlayer } from '../context/PlayerContext'
import ContentCard from '../components/ContentCard'
import './Browse.css'

const TABS = [{ id: 'all', label: 'All' }, { id: 'classical', label: 'Books' }, { id: 'lectures', label: 'Lectures' }]
const BOOK_TOPICS = ['all', 'Hadith', 'Tafsir', 'Aqeedah', 'Fiqh', 'Seerah', 'Character', 'Spirituality']
const AUDIO_AUTHORS = ['all', 'Anwar Al-Awlaki', 'Gems & Jewels']

const FEATURED = CONTENT.find(i => i.type === 'audio' && i.source === 'Anwar Al-Awlaki') || CONTENT.find(i => i.type === 'audio')

export default function Browse() {
  const [tab, setTab] = useState('all')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const { downloading, downloaded, download, remove, checkDownloaded } = useDownload()
  const { play } = usePlayer()

  useEffect(() => { setFilter('all') }, [tab])

  const items = useMemo(() => getContent(tab, search, filter), [tab, search, filter])
  useEffect(() => { items.forEach(i => checkDownloaded(i.id)) }, [])

  const pills = tab === 'classical'
    ? BOOK_TOPICS.map(t => ({ id: t, label: t === 'all' ? 'All Topics' : t }))
    : tab === 'lectures'
    ? AUDIO_AUTHORS.map(s => ({ id: s, label: s === 'all' ? 'All Authors' : s }))
    : [{ id: 'all', label: 'All' }, { id: 'audio', label: '🎙️ Audio' }, { id: 'book', label: '📖 Books' }]

  const grouped = useMemo(() => {
    if (search || filter !== 'all' || tab === 'all') return null
    const key = tab === 'classical' ? 'category' : 'source'
    return items.reduce((acc, i) => { acc[i[key]] = acc[i[key]] || []; acc[i[key]].push(i); return acc }, {})
  }, [items, tab, search, filter])

  const useRowLayout = tab === 'lectures' || (tab === 'all' && filter === 'audio')

  const renderList = list => (
    <div className="track-list">
      {list.map(item => <ContentCard key={item.id} item={item} onDownload={download} onRemove={remove} downloaded={downloaded[item.id]} downloading={downloading[item.id]} row={item.type === 'audio'} />)}
    </div>
  )

  const renderGrid = list => (
    <div className="card-grid">
      {list.map(item => <ContentCard key={item.id} item={item} onDownload={download} onRemove={remove} downloaded={downloaded[item.id]} downloading={downloading[item.id]} />)}
    </div>
  )

  const showHero = !search && tab !== 'classical' && FEATURED

  return (
    <div className="browse">
      {/* Hero card */}
      {showHero && (
        <div className="discover-hero" onClick={() => play(FEATURED, downloaded[FEATURED.id] || null)}>
          <div className="hero-art">🎙️</div>
          <div className="hero-content">
            <div className="hero-badge">Featured Series</div>
            <div className="hero-title">{FEATURED.title}</div>
            <div className="hero-source">{FEATURED.source}</div>
          </div>
          <button className="hero-play" onClick={e => { e.stopPropagation(); play(FEATURED, downloaded[FEATURED.id] || null) }}>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </button>
        </div>
      )}

      {/* Filters */}
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
            {pills.map(p => <button key={p.id} className={`pill${filter === p.id ? ' active' : ''}`} onClick={() => setFilter(p.id)}>{p.label}</button>)}
          </div>
        </div>
      </div>

      {/* Results */}
      {items.length === 0
        ? <div className="state-msg"><span>🔍</span><p>No results{search ? ` for "${search}"` : ''}.</p></div>
        : grouped
          ? Object.entries(grouped).map(([group, list]) => (
              <section key={group} className="browse-section">
                <div className="section-header">
                  <h2 className="section-title">{group}</h2>
                  <span className="results-count">{list.length} item{list.length !== 1 ? 's' : ''}</span>
                </div>
                {tab === 'lectures' ? renderList(list) : renderGrid(list)}
              </section>
            ))
          : <>
              <div className="results-count">{items.length} item{items.length !== 1 ? 's' : ''}</div>
              {useRowLayout ? renderList(items) : renderGrid(items)}
            </>
      }
    </div>
  )
}
