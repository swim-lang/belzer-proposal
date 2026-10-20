import { useEffect, useRef, useState } from 'react'
import './modern-leaf.css'

export function TasteDemo() {
 const [selected,setSelected]=useState(0)
 const [playing,setPlaying]=useState(false)
 const [visible,setVisible]=useState(false)
 const ref=useRef<HTMLDivElement>(null)
 useEffect(()=>{
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)setPlaying(true)
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.4})
  if(ref.current)observer.observe(ref.current)
  return ()=>observer.disconnect()
 },[])
 useEffect(()=>{
  if(!playing||!visible)return
  const timer=window.setInterval(()=>setSelected(previous=>1-previous),3500)
  return ()=>window.clearInterval(timer)
 },[playing,visible])
 const choices=[{name:'Warm & understated',image:'reference-one.jpg',note:'Natural materials · soft light · quiet detail'}, {name:'Color & contrast',image:'reference-two.jpg',note:'Rich tones · expressive surfaces · contrast'}]
 return <div ref={ref} className="ml-demo">
  <div className="ml-demo-top"><span>01 / YOUR DIRECTION</span><button type="button" onClick={()=>setPlaying(!playing)} aria-pressed={playing}>{playing?'Pause preview':'Play preview'}</button></div>
  <p className="serif ml-demo-question">What feels more like you?</p>
  <div className="ml-choices">{choices.map((choice,index)=><button key={choice.name} type="button" className={`ml-choice ${selected===index?'is-selected':''}`} aria-pressed={selected===index} onClick={()=>{setPlaying(false);setSelected(index)}}><div className="ml-choice-photo"><img src={`/images/modern-leaf-proposal/${choice.image}`} alt={choice.name==='Color & contrast'?'Cabinetry with dark blue doors, timber and turquoise tile':'Natural timber vanity with soft integrated lighting'}/><span className="ml-choice-check" aria-hidden="true">{selected===index?'✓':'+'}</span></div><span className="ml-choice-label">{choice.name}</span></button>)}</div>
  <div className="ml-brief"><span className="ml-small-label">YOUR EXAMPLE BRIEF</span><p className="serif" key={selected}>{choices[selected].note}</p></div>
  <p className="ml-demo-footnote">Interactive concept · Try either image. Example preferences only; nothing is saved.</p>
 </div>
}
export function LightingDemo(){
 const [lit,setLit]=useState(false)
 return <div className={`ml-demo ml-light-demo ${lit?'is-lit':''}`}>
  <div className="ml-demo-top"><span>02 / SET THE ATMOSPHERE</span><button type="button" role="switch" aria-checked={lit} aria-label="Integrated lighting" onClick={()=>setLit(!lit)} className="ml-switch"><span aria-hidden="true"/></button></div>
  <svg viewBox="0 0 600 320" className="ml-room" role="img" aria-label={lit?'Illustrated cabinetry with warm integrated lighting':'Illustrated cabinetry in daylight'}>
   <defs><linearGradient id="ml-wall" x2="0" y2="1"><stop stopColor="#e5e0d6"/><stop offset="1" stopColor="#c9c0af"/></linearGradient><linearGradient id="ml-glow" x2="0" y2="1"><stop stopColor="#ffd48e" stopOpacity=".9"/><stop offset="1" stopColor="#ffd48e" stopOpacity="0"/></linearGradient><filter id="ml-soft"><feGaussianBlur stdDeviation="5"/></filter></defs>
   <path fill="url(#ml-wall)" d="M0 0h600v320H0z"/><path fill="#d2c9b9" d="M0 265h600v55H0z"/>
   <g stroke="#7d7464" strokeWidth="1"><path fill="#a89b83" d="M56 38h488v102H56z"/><path d="M178 38v102m122-102v102m122-102v102"/><path fill="#c4b69c" d="M56 194h488v93H56z"/><path d="M178 194v93m122-93v93m122-93v93"/><path fill="#e8e2d7" d="M45 184h510v12H45z"/></g>
   <path fill="#3b3d35" d="M258 187v-28q0-20 17-20t17 20v7h-5v-7q0-15-12-15t-12 15v28z"/><ellipse cx="390" cy="179" rx="29" ry="7" fill="#a9a08f"/><path d="M367 166q3 18 23 18t23-18z" fill="#ddd6c8"/>
   <g className="ml-room-glow"><path fill="url(#ml-glow)" d="M55 141h490v43H55z"/><path stroke="#ffe4ac" strokeWidth="5" filter="url(#ml-soft)" d="M57 141h486M57 289h486"/><path stroke="#ffe8bb" strokeWidth="2" d="M57 141h486M57 289h486"/><path fill="url(#ml-glow)" d="M55 290h490v30H55z"/></g>
  </svg>
  <div className="ml-light-caption"><p className="serif">{lit?'The room, transformed.':'The detail is already there.'}</p><span>{lit?'Integrated light on':'Integrated light off'}</span></div>
  <p className="ml-demo-footnote">Interactive concept · Illustrative scene, not a lighting simulation.</p>
 </div>
}
const steps=[
 ['01','Days 1–10','A stronger website now','Shop visit, content review, and the focused first release within 7–10 business days.'],
 ['02','Weeks 2–4','Name & identity','Collaborative moodboards, one integrated recommendation, then refinement.'],
 ['03','Weeks 4–7','Build the full experience','Website, project stories, Ideas, guided inquiry, and lighting interaction.'],
 ['04','Weeks 7–8','Review & launch','Test, refine, complete the handoff, and launch after approval.'],
]
export function ModernLeafTimeline(){return <div className="ml-timeline"><div className="ml-timeline-track">{steps.map(([n,time,title,body])=><div className="ml-milestone" key={n}><span className="ml-timeline-dot">{n}</span><p className="eyebrow text-ink-2">{time}</p><h3 className="serif">{title}</h3><p className="ml-timeline-body">{body}</p>{n==='01'&&<span className="ml-release">First release</span>}{n==='04'&&<span className="ml-release">Full launch</span>}</div>)}</div><div className="ml-followup"><span className="eyebrow text-ink-2">30 days after launch</span><p className="serif">Review what is working. Refine the next step.</p><p>Review early search and inquiry signals, make the included small adjustments, and agree on useful priorities.</p></div></div>}
