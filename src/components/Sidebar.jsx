import './Sidebar.css'
const NAV=[
  {id:'browse',label:'Browse',icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>},
  {id:'library',label:'My Library',icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>},
]
export default function Sidebar({page,onNav,isOffline}){
  return(
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">📚</div>
        <div><div className="brand-name">Ilm</div><div className="brand-sub">Books & Lectures</div></div>
      </div>
      {isOffline&&<div className="offline-badge">⚡ Offline mode</div>}
      <nav className="sidebar-nav">
        {NAV.map(item=>(
          <button key={item.id} className={`nav-item ${page===item.id?'active':''}`} onClick={()=>onNav(item.id)}>
            <span className="nav-icon">{item.icon}</span>{item.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="footer-note">Content from</div>
        <a href="https://kalamullah.com" target="_blank" rel="noreferrer" className="footer-link">kalamullah.com</a>
      </div>
    </aside>
  )
}
