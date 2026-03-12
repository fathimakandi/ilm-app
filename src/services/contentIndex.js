const B='https://www.kalamullah.com'
export const CONTENT=[
  // BOOKS
  {id:'b1',title:'Milestones — Sayyid Qutb',url:`${B}/Books/MILESTONES.pdf`,type:'book',source:'Classical Books',category:'Aqeedah'},
  {id:'b2',title:'The Ideal Muslim',url:`${B}/Books/The%20Ideal%20Muslim.pdf`,type:'book',source:'Classical Books',category:'Character'},
  {id:'b3',title:'Knowing Allah — Said Hawwa',url:`${B}/Books/Knowing%20Allah.pdf`,type:'book',source:'Classical Books',category:'Aqeedah'},
  {id:'b4',title:'The Day of Resurrection',url:`${B}/Books/The%20Day%20of%20Resurrection.pdf`,type:'book',source:'Classical Books',category:'Aqeedah'},
  {id:'b5',title:'Chronology of Islam',url:`${B}/Books/Chronology%20of%20Islam.pdf`,type:'book',source:'Classical Books',category:'History'},
  {id:'b6',title:'Salah Ad-Deen Vol 3',url:`${B}/Books/Salah%20Ad-Deen%20Vol%203.pdf`,type:'book',source:'Classical Books',category:'History'},
  {id:'b7',title:'The Valley Came Alive — Ibn Kathir',url:`${B}/Books/The%20Valley%20Came%20Alive%20-%20Ibn%20Kathir.pdf`,type:'book',source:'Ibn Kathir',category:'Tafsir'},
  {id:'b8',title:'The Lofty Virtues of Ibn Taymiyyah',url:`${B}/Books/TheLoftyVirtuesOfIbnTaymiyyah.pdf`,type:'book',source:'Ibn Taymiyyah',category:'Biography'},
  {id:'b9',title:'Stories of the Prophets — Ibn Kathir',url:`${B}/Books/Stories%20of%20the%20Prophets%20Ibn%20Kathir.pdf`,type:'book',source:'Ibn Kathir',category:'Prophets'},
  {id:'b10',title:'Fortress of the Muslim (Hisnul Muslim)',url:`${B}/Books/Fortress%20of%20the%20Muslim.pdf`,type:'book',source:'Classical Books',category:"Du'a"},
  {id:'b11',title:'Riyad-us-Salihin — Imam An-Nawawi',url:`${B}/Books/Riyad-us-Salihin.pdf`,type:'book',source:'Classical Books',category:'Hadith'},
  {id:'b12',title:'Tafsir Ibn Kathir — Part 1',url:`${B}/Books/Tafsir%20Ibn%20Kathir%20Part%201.pdf`,type:'book',source:'Ibn Kathir',category:'Tafsir'},
  {id:'b13',title:'Tafsir Ibn Kathir — Part 2',url:`${B}/Books/Tafsir%20Ibn%20Kathir%20Part%202.pdf`,type:'book',source:'Ibn Kathir',category:'Tafsir'},
  {id:'b14',title:'Tafsir Ibn Kathir — Part 3',url:`${B}/Books/Tafsir%20Ibn%20Kathir%20Part%203.pdf`,type:'book',source:'Ibn Kathir',category:'Tafsir'},
  {id:'b15',title:'Diseases of the Hearts & Their Cures — Ibn Taymiyyah',url:`${B}/Books/Diseases%20of%20the%20Hearts%20and%20their%20Cures.pdf`,type:'book',source:'Ibn Taymiyyah',category:'Spirituality'},
  {id:'b16',title:'Fiqh us-Sunnah — As-Sayyid Sabiq',url:`${B}/Books/Fiqh-us-Sunnah.pdf`,type:'book',source:'Classical Books',category:'Fiqh'},
  {id:'b17',title:'Sahih Muslim Vol. 6',url:`${B}/Books/Hadith/Sahih%20Muslim%20Vol.%206%20-%205646-6722.pdf`,type:'book',source:'Hadith',category:'Hadith'},
  // AUDIO — Gems & Jewels
  {id:'a1',title:'Gems & Jewels — Part 1',url:`${B}/Lectures/Gems%20and%20Jewels/p%2015-25.mp3`,type:'audio',source:'Gems & Jewels',category:'Lectures'},
  {id:'a2',title:'Gems & Jewels — Part 2',url:`${B}/Lectures/Gems%20and%20Jewels/p%2026-39.mp3`,type:'audio',source:'Gems & Jewels',category:'Lectures'},
  {id:'a3',title:'Gems & Jewels — Part 3',url:`${B}/Lectures/Gems%20and%20Jewels/p%2040-55.mp3`,type:'audio',source:'Gems & Jewels',category:'Lectures'},
  {id:'a4',title:'Gems & Jewels — Part 4',url:`${B}/Lectures/Gems%20and%20Jewels/p%2056-72.mp3`,type:'audio',source:'Gems & Jewels',category:'Lectures'},
  {id:'a5',title:'Gems & Jewels — Part 5',url:`${B}/Lectures/Gems%20and%20Jewels/p%2073-89.mp3`,type:'audio',source:'Gems & Jewels',category:'Lectures'},
  {id:'a6',title:'Gems & Jewels — Part 6',url:`${B}/Lectures/Gems%20and%20Jewels/p%2090-105.mp3`,type:'audio',source:'Gems & Jewels',category:'Lectures'},
  {id:'a7',title:'Gems & Jewels — Part 7',url:`${B}/Lectures/Gems%20and%20Jewels/p%20106-120.mp3`,type:'audio',source:'Gems & Jewels',category:'Lectures'},
  {id:'a8',title:'Gems & Jewels — Part 8',url:`${B}/Lectures/Gems%20and%20Jewels/p%20121-137.mp3`,type:'audio',source:'Gems & Jewels',category:'Lectures'},
  {id:'a9',title:'Gems & Jewels — Part 9',url:`${B}/Lectures/Gems%20and%20Jewels/p%20138-154.mp3`,type:'audio',source:'Gems & Jewels',category:'Lectures'},
  {id:'a10',title:'Gems & Jewels — Part 10',url:`${B}/Lectures/Gems%20and%20Jewels/p%20155-171.mp3`,type:'audio',source:'Gems & Jewels',category:'Lectures'},
]

export function getContent(tab, search, filter) {
  let items = CONTENT
  if (tab==='classical') items=items.filter(i=>i.type==='book')
  else if (tab==='lectures') items=items.filter(i=>i.type==='audio')
  if (filter!=='all') items=items.filter(i=>i.type===filter)
  if (search) { const q=search.toLowerCase(); items=items.filter(i=>i.title.toLowerCase().includes(q)||i.source.toLowerCase().includes(q)||i.category.toLowerCase().includes(q)) }
  return items
}
