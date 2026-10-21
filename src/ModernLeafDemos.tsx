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
  <div className="ml-demo-top"><span>01 / TASTE DIRECTION</span><button type="button" onClick={()=>setPlaying(!playing)} aria-pressed={playing}>{playing?'Pause preview':'Play preview'}</button></div>
  <p className="serif ml-demo-question">What feels more like you?</p>
  <div className="ml-choices">{choices.map((choice,index)=><button key={choice.name} type="button" className={`ml-choice ${selected===index?'is-selected':''}`} aria-pressed={selected===index} onClick={()=>{setPlaying(false);setSelected(index)}}><div className="ml-choice-photo"><img src={`/images/modern-leaf-proposal/${choice.image}`} alt={choice.name==='Color & contrast'?'Cabinetry with dark blue doors, timber and turquoise tile':'Natural timber vanity with soft integrated lighting'}/><span className="ml-choice-check" aria-hidden="true">{selected===index?'✓':'+'}</span></div><span className="ml-choice-label">{choice.name}</span></button>)}</div>
  <div className="ml-brief"><span className="ml-small-label">YOUR EXAMPLE BRIEF</span><p className="serif" key={selected}>{choices[selected].note}</p></div>
  <p className="ml-demo-footnote">Interactive concept · Try either image. Example preferences only; nothing is saved.</p>
 </div>
}
export function LightingDemo(){
 const video=useRef<HTMLVideoElement>(null)
 const [playing,setPlaying]=useState(false)
 useEffect(()=>{
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)')
  const update=()=>{if(preference.matches)video.current?.pause();else video.current?.play().catch(()=>{})}
  update();preference.addEventListener('change',update)
  return ()=>preference.removeEventListener('change',update)
 },[])
 const toggle=()=>{if(!video.current)return;if(video.current.paused)video.current.play().catch(()=>{});else video.current.pause()}
 return <div className="ml-demo ml-light-demo">
  <div className="ml-demo-top"><span>02 / VIRTUAL SHOWROOM</span><button type="button" onClick={toggle} aria-pressed={playing}>{playing?'Pause preview':'Play preview'}</button></div>
  <video ref={video} className="ml-showroom-video" muted loop playsInline preload="metadata" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} poster="/video/modern-leaf/bathroom-showcase-poster.jpg" aria-label="Virtual showroom concept: a rendered bathroom with custom cabinetry and integrated lighting">
   <source src="/video/modern-leaf/bathroom-showcase.mp4" type="video/mp4"/>
   Your browser does not support this video. <a href="/video/modern-leaf/bathroom-showcase.mp4">View the showroom concept</a>.
  </video>
  <div className="ml-light-caption"><p className="serif">Explore the space.</p><span>Materials, proportions, and integrated light.</span></div>
  <p className="ml-demo-footnote">Illustrative 3D concept · This is a rendered example, not a completed client project.</p>
 </div>
}
const steps=[
 ['01','Days 1–10','A stronger website now','Shop visit, content review, and the focused first release within 7–10 business days.'],
 ['02','Weeks 2–4','Name & identity','Collaborative moodboards, one integrated recommendation, then refinement.'],
 ['03','Weeks 4–7','Build the full experience','Website, project stories, Ideas, guided inquiry, and virtual showroom.'],
 ['04','Weeks 7–8','Review & launch','Test, refine, complete the handoff, and launch after approval.'],
]
export function ModernLeafTimeline(){
 const track=useRef<HTMLDivElement>(null)
 const [active,setActive]=useState(0)
 useEffect(()=>{
  let frame=0
  const update=()=>{
   frame=0
   if(!track.current)return
   const nodes=Array.from(track.current.querySelectorAll<HTMLElement>('.ml-milestone'))
   if(window.innerWidth<768){setActive(nodes.filter(node=>node.getBoundingClientRect().top<window.innerHeight*.75).length)}
   else{const top=track.current.getBoundingClientRect().top;setActive(Math.max(0,Math.min(4,Math.ceil((window.innerHeight*.8-top)/(window.innerHeight*.45)*4))))}
  }
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)}
  update();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule)
  return ()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule)}
 },[])
 return <div className="ml-timeline"><div ref={track} className="ml-timeline-track">{steps.map(([n,time,title,body],index)=><div className={`ml-milestone ${index<active?'is-active':''}`} key={n}><span className="ml-timeline-dot">{n}</span><p className="eyebrow text-ink-2">{time}</p><h3 className="serif">{title}</h3><p className="ml-timeline-body">{body}</p>{n==='01'&&<span className="ml-release">First release</span>}{n==='04'&&<span className="ml-release">Full launch</span>}</div>)}</div><div className="ml-followup"><div><span className="eyebrow text-ink-2">30 days after launch</span><h3 className="serif">Post-launch review</h3></div><p>Review early search and inquiry results, make the included small improvements, and agree on next steps.</p></div></div>}
