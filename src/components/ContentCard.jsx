import{usePlayer}from'../context/PlayerContext'
import'./ContentCard.css'
export default function ContentCard({item,onDownload,onRemove,downloaded,downloading}){
  const{play,current,isPlaying}=usePlayer()
  const isActive=current?.id===item.id,isDown=!!downloaded,isPending=typeof downloading==='number',isError=downloading==='error'
  const handlePlay=()=>item.type==='audio'?play(item,downloaded||null):window.open(downloaded||item.url,'_blank')
  const handleDl=e=>{e.stopPropagation();isDown?onRemove(item.id):onDownload(item)}
  return(
    <div className={`content-card${isActive?' active':''}`} onClick={handlePlay}>
      <div className={`card-thumb ${item.type}`}>
        {item.type==='audio'?'🎙️':'📄'}
        {isActive&&isPlaying&&<div className="playing-indicator"><span/><span/><span/></div>}
      </div>
      <div className="card-body">
        <div className="card-title">{item.title}</div>
        <div className="card-meta">
          <span className={`card-type ${item.type}`}>{item.type==='audio'?'MP3':'PDF'}</span>
          {item.source&&<span className="card-source">{item.source}</span>}
          {isDown&&<span className="card-offline">✓ Offline</span>}
        </div>
      </div>
      <div className="card-actions" onClick={e=>e.stopPropagation()}>
        {item.type==='audio'&&<button className={`card-play-btn${isActive&&isPlaying?' playing':''}`} onClick={handlePlay}>{isActive&&isPlaying?<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>:<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M8 5v14l11-7z"/></svg>}</button>}
        <button className={`card-dl-btn${isDown?' downloaded':''}${isPending?' pending':''}${isError?' error':''}`} onClick={handleDl} title={isDown?'Remove':isPending?'Downloading…':'Download for offline'}>
          {isError?<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          :isPending?<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" className="spin"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
          :isDown?<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>
          :<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>}
        </button>
      </div>
    </div>
  )
}
