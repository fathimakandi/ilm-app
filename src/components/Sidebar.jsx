import './Sidebar.css'
const NAV = [
  { id: 'browse', label: 'Browse', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
  { id: 'library', label: 'My Library', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/></svg> },
]
export default function Sidebar({ page, onNav, isOffline }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-brand" onClick={() => onNav('browse')}>
          <div className="brand-icon">🎧</div>
          <div className="brand-name">Ilm</div>
        </div>
        {isOffline && <div className="offline-badge">⚡ Offline</div>}
        <nav className="sidebar-nav">
          {NAV.map(item => (
            <button key={item.id} className={`nav-item ${page === item.id ? 'active' : ''}`} onClick={() => onNav(item.id)}>
              <span className="nav-icon">{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="sidebar-footer">
        <div className="footer-note">Content from</div>
        <a href="https://kalamullah.com" target="_blank" rel="noreferrer" className="footer-link">kalamullah.com</a>
      </div>
    </aside>
  )
}
