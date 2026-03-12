import { createContext, useContext, useRef, useState, useCallback } from 'react'
const PlayerContext = createContext(null)
export function PlayerProvider({ children }) {
  const audioRef = useRef(null)
  const [current, setCurrent] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [volume, setVolume] = useState(1)
  const play = useCallback((item, blobUrl) => {
    const src = blobUrl || item.url
    if (current?.id === item.id && audioRef.current) { audioRef.current.play(); setIsPlaying(true); return }
    setCurrent({ ...item, blobUrl: src }); setIsPlaying(true)
  }, [current])
  const pause = useCallback(() => { audioRef.current?.pause(); setIsPlaying(false) }, [])
  const toggle = useCallback(() => { if (isPlaying) pause(); else { audioRef.current?.play(); setIsPlaying(true) } }, [isPlaying, pause])
  const seek = useCallback((time) => { if (audioRef.current) { audioRef.current.currentTime = time; setCurrentTime(time) } }, [])
  const skip = useCallback((s) => { if (audioRef.current) audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + s)) }, [duration])
  const changeSpeed = useCallback((s) => { setSpeed(s); if (audioRef.current) audioRef.current.playbackRate = s }, [])
  const changeVolume = useCallback((v) => { setVolume(v); if (audioRef.current) audioRef.current.volume = v }, [])
  return (
    <PlayerContext.Provider value={{ audioRef, current, isPlaying, duration, currentTime, speed, volume, play, pause, toggle, seek, skip, changeSpeed, changeVolume, setDuration, setCurrentTime, setIsPlaying }}>
      {children}
    </PlayerContext.Provider>
  )
}
export const usePlayer = () => useContext(PlayerContext)
