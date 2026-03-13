import { useEffect, useRef, useMemo } from 'react'
import { usePlayer } from '../context/PlayerContext'
import './AudioPlayer.css'

const fmt = s => !s || isNaN(s) ? '0:00' : `${Math.floor(s/60)}:${Math.floor(s%60).toString().padStart(2,'0')}`

// Deterministic pseudo-random waveform heights seeded by index
const BARS = 40
const heights = Array.from({ length: BARS }, (_, i) => {
  const x = Math.sin(i * 2.3 + 1.7) * 0.5 + Math.sin(i * 0.7) * 0.3 + 0.5
  return Math.max(0.15, Math.min(1, Math.abs(x)))
})

export default function AudioPlayer() {
  const { audioRef, current, isPlaying, duration, currentTime, speed, volume, toggle, seek, skip, changeSpeed, changeVolume, setDuration, setCurrentTime, setIsPlaying } = usePlayer()
  const prev = useRef(null)

  useEffect(() => {
    const a = audioRef.current; if (!a || !current) return
    const src = current.blobUrl || current.url
    if (src !== prev.current) { a.src = src; prev.current = src; a.load(); a.playbackRate = speed; a.volume = volume; a.play().catch(() => {}) }
    const onL = () => setDuration(a.duration), onT = () => setCurrentTime(a.currentTime), onE = () => setIsPlaying(false), onP = () => setIsPlaying(true), onPa = () => setIsPlaying(false)
    a.addEventListener('loadedmetadata', onL); a.addEventListener('timeupdate', onT); a.addEventListener('ended', onE); a.addEventListener('play', onP); a.addEventListener('pause', onPa)
    return () => { a.removeEventListener('loadedmetadata', onL); a.removeEventListener('timeupdate', onT); a.removeEventListener('ended', onE); a.removeEventListener('play', onP); a.removeEventListener('pause', onPa) }
  }, [current])

  if (!current) return null
  const pct = duration ? (currentTime / duration) * 100 : 0
  const playedBars = Math.round((pct / 100) * BARS)

  const handleSeek = e => {
    const r = e.currentTarget.getBoundingClientRect()
    seek(((e.clientX - r.left) / r.width) * duration)
  }

  return (
    <div className="audio-player">
      <audio ref={audioRef} />

      {/* Left */}
      <div className="player-info">
        <div className="player-thumb">🎙️</div>
        <div className="player-meta">
          <div className="player-title">{current.title}</div>
          <div className="player-source">{current.source}</div>
        </div>
        <button className="player-like" title="Save">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>

      {/* Center */}
      <div className="player-controls-center">
        <div className="player-buttons">
          <button className="ctrl-btn" onClick={() => skip(-15)} title="Back 15s">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>
          </button>
          <button className="ctrl-btn play-btn" onClick={toggle}>
            {isPlaying
              ? <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              : <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>}
          </button>
          <button className="ctrl-btn" onClick={() => skip(15)} title="Forward 15s">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/></svg>
          </button>
        </div>

        <div className="player-progress-wrap">
          <span className="player-time">{fmt(currentTime)}</span>
          <div className="player-progress" onClick={handleSeek}>
            <div className="waveform">
              {heights.map((h, i) => (
                <div key={i} className={`waveform-bar${i < playedBars ? ' played' : ''}`} style={{ height: `${h * 100}%` }} />
              ))}
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <span className="player-time">{fmt(duration)}</span>
        </div>
      </div>

      {/* Right */}
      <div className="player-right">
        <select className="speed-select" value={speed} onChange={e => changeSpeed(parseFloat(e.target.value))}>
          {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(s => <option key={s} value={s}>{s}x</option>)}
        </select>
        <div className="volume-wrap">
          <svg className="vol-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
          <input type="range" min="0" max="1" step="0.05" value={volume} onChange={e => changeVolume(parseFloat(e.target.value))} className="volume-slider" />
        </div>
      </div>
    </div>
  )
}
