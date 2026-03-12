import { useState, useEffect } from 'react'
import { PlayerProvider } from './context/PlayerContext'
import Sidebar from './components/Sidebar'
import AudioPlayer from './components/AudioPlayer'
import Browse from './pages/Browse'
import Library from './pages/Library'
import './App.css'
export default function App() {
  const [page, setPage] = useState('browse')
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  useEffect(() => {
    const on = () => setIsOffline(false), off = () => setIsOffline(true)
    window.addEventListener('online', on); window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])
  return (
    <PlayerProvider>
      <div className="app">
        <Sidebar page={page} onNav={setPage} isOffline={isOffline} />
        <main className="main-content">
          <div className="page-header">
            <h1 className="page-title">{page === 'browse' ? 'Good listening' : 'Your Library'}</h1>
            {isOffline && page === 'browse' && <div className="offline-notice">⚡ Offline — saved content only</div>}
          </div>
          <div className="page-body">
            {page === 'browse' ? <Browse /> : <Library onNav={setPage} />}
          </div>
        </main>
        <AudioPlayer />
      </div>
    </PlayerProvider>
  )
}
