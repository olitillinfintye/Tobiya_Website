"use client"
import { useEffect, useState } from 'react'

export default function CustomCursor(){
  const [pos, setPos] = useState({ x: -100, y: -100 })

  useEffect(()=>{
    const move = (e: MouseEvent)=> setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return ()=> window.removeEventListener('mousemove', move)
  },[])

  return (
    <div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[9999]">
      <div style={{transform:`translate3d(${pos.x}px, ${pos.y}px,0)`}} className="-translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 rounded-full bg-accent1/80" style={{background:'linear-gradient(90deg,var(--accent-cyan),var(--accent-purple))', boxShadow:'0 0 18px rgba(0,245,255,0.12)'}} />
      </div>
    </div>
  )
}
