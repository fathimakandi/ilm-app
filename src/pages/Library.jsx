import{useState,useEffect}from'react'
import{getAllDownloads}from'../services/storage'
import{useDownload}from'../hooks/useDownload'
import ContentCard from'../components/ContentCard'
import'./Library.css'
export default function Library(){
  const[items,setItems]=useState([])
  const[loading,setLoading]=useState(true)
  const{downloading,downloaded,remove,checkDownloaded}=useDownload()
  useEffect(()=>{getAllDownloads().then(all=>{setItems(all.sort((a,b)=>b.downloadedAt-a.downloadedAt));setLoading(false);all.forEach(i=>checkDownloaded(i.id))}),[]},[])
  const handleRemove=async id=>{await remove(id);setItems(p=>p.filter(i=>i.id!==id))}
  const fmt=b=>!b?'':b<1048576?`${(b/1024).toFixed(0)} KB`:`${(b/1048576).toFixed(1)} MB`
  if(loading)return<div className="lib-loading"><div className="spinner"/></div>
  if(!items.length)return<div className="lib-empty"><div className="empty-icon">📥</div><h2>No offline content yet</h2><p>Download from Browse to listen offline.</p></div>
  const audio=items.filter(i=>i.type==='audio'),books=items.filter(i=>i.type==='book'),total=items.reduce((a,i)=>a+(i.size||0),0)
  return(
    <div className="library">
      <div className="lib-stats">
        {[{n:items.length,l:'Downloads'},{n:audio.length,l:'Lectures'},{n:books.length,l:'Books'},{n:fmt(total),l:'Stored'}].map(s=>(
          <div key={s.l} className="stat"><span className="stat-num">{s.n}</span><span className="stat-label">{s.l}</span></div>
        ))}
      </div>
      {audio.length>0&&<section><h2 className="section-title">🎙️ Lectures</h2><div className="card-list">{audio.map(i=><ContentCard key={i.id} item={i} onRemove={handleRemove} onDownload={()=>{}} downloaded={downloaded[i.id]} downloading={downloading[i.id]}/>)}</div></section>}
      {books.length>0&&<section><h2 className="section-title">📄 Books</h2><div className="card-list">{books.map(i=><ContentCard key={i.id} item={i} onRemove={handleRemove} onDownload={()=>{}} downloaded={downloaded[i.id]} downloading={downloading[i.id]}/>)}</div></section>}
    </div>
  )
}
