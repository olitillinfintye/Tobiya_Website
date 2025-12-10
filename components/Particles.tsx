"use client"
import { useEffect, useRef } from 'react'

export default function Particles(){
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(()=>{
    const canvas = ref.current!
    if(!canvas) return
    const ctx = canvas.getContext('2d')!
    let dpr = Math.max(1, window.devicePixelRatio || 1)

    function resize(){
      const w = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth
      const h = canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    type Particle = { x:number, y:number, vx:number, vy:number, r:number, hue:number }
    const isMobile = window.matchMedia && window.matchMedia('(pointer: coarse)').matches
    const N = isMobile ? 40 : 80
    const particles: Particle[] = []
    for(let i=0;i<N;i++){
      particles.push({
        x: Math.random() * (canvas.clientWidth || window.innerWidth),
        y: Math.random() * (canvas.clientHeight || window.innerHeight),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.6,
        hue: 180 + Math.random() * 160
      })
    }

    const mouse = { x: -9999, y: -9999 }

    function setMousePosition(clientX: number, clientY: number){
      const rect = canvas.getBoundingClientRect()
      mouse.x = clientX - rect.left
      mouse.y = clientY - rect.top
    }

    function onMove(e: MouseEvent){ setMousePosition(e.clientX, e.clientY) }
    function onTouch(e: TouchEvent){ if(e.touches && e.touches[0]) setMousePosition(e.touches[0].clientX, e.touches[0].clientY) }
    function onLeave(){ mouse.x = -9999; mouse.y = -9999 }

    // repulse burst on click/tap
    function onClick(e: MouseEvent | TouchEvent){
      let cx = 0, cy = 0
      if((e as TouchEvent).touches && (e as TouchEvent).touches[0]){
        cx = (e as TouchEvent).touches[0].clientX
        cy = (e as TouchEvent).touches[0].clientY
      } else if((e as MouseEvent).clientX !== undefined){
        cx = (e as MouseEvent).clientX
        cy = (e as MouseEvent).clientY
      }

      const rect = canvas.getBoundingClientRect()
      const mx = cx - rect.left
      const my = cy - rect.top

      for(const p of particles){
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx*dx + dy*dy)
        if(dist < 160){
          const force = (160 - dist) / 160
          const ang = Math.atan2(dy, dx)
          p.vx += Math.cos(ang) * 4 * force
          p.vy += Math.sin(ang) * 4 * force
        }
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', onLeave)
    window.addEventListener('click', onClick)
    window.addEventListener('touchstart', onClick, { passive: true })

    let raf = 0
    function frame(){
      if(document.hidden){
        raf = requestAnimationFrame(frame)
        return
      }

      const w = canvas.clientWidth || window.innerWidth
      const h = canvas.clientHeight || window.innerHeight
      ctx.clearRect(0,0,w,h)

      // subtle translucent overlay to create trails
      ctx.fillStyle = 'rgba(5,6,12,0.12)'
      ctx.fillRect(0,0,w,h)

      for(const p of particles){
        // interaction with mouse - gentle attraction/repel depending on distance
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx*dx + dy*dy)
        if(dist < 140){
          const force = (140 - dist) / 140
          // nearer: stronger repel, further: slight attraction
          const sign = dist < 60 ? -1 : 0.15
          p.vx += (sign * -dx/dist) * (0.15 * force)
          p.vy += (sign * -dy/dist) * (0.15 * force)
        }

        // velocity damping and movement
        p.vx *= 0.98
        p.vy *= 0.98
        p.x += p.vx
        p.y += p.vy

        // wrap
        if(p.x < -10) p.x = w + 10
        if(p.x > w + 10) p.x = -10
        if(p.y < -10) p.y = h + 10
        if(p.y > h + 10) p.y = -10

        // draw particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6)
        gradient.addColorStop(0, `hsla(${p.hue},100%,65%,0.95)`)
        gradient.addColorStop(0.3, `hsla(${(p.hue+60)%360},90%,55%,0.35)`)
        gradient.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI*2)
        ctx.fill()
      }

      // subtle connecting lines
      ctx.lineWidth = 1
      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist2 = dx*dx + dy*dy
          if(dist2 < 10000){
            const alpha = 0.02 * (1 - dist2/10000)
            ctx.strokeStyle = `rgba(0,245,255,${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)

    return ()=>{
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', onLeave)
      window.removeEventListener('click', onClick)
      window.removeEventListener('touchstart', onClick)
    }
  },[])

  return (
    <canvas ref={ref} className="pointer-events-none absolute inset-0 w-full h-full -z-20" aria-hidden />
  )
}
