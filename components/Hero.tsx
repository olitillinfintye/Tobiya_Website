"use client"
import { motion } from 'framer-motion'
import data from '../data/studio-data'
import Particles from './Particles'
import { useEffect, useRef } from 'react'

export default function Hero(){
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(()=>{
    const el = heroRef.current
    if(!el) return

    const bubbles = Array.from(el.querySelectorAll<HTMLElement>('.hero-bubble'))
    const timeouts: number[] = []

    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        // if hero is mostly out of view (scrolled past), trigger burst
        if(entry.intersectionRatio < 0.05){
          // stagger burst slightly
          bubbles.forEach((b, i)=>{
            const t = window.setTimeout(()=>{
              b.classList.add('burst')
            }, i * 120)
            timeouts.push(t)
            // after burst animation, hide bubble to avoid blocking
            const hideT = window.setTimeout(()=>{
              b.classList.add('hidden')
            }, 120 + 700 + i * 120)
            timeouts.push(hideT)
          })
        } else {
          // reset bubbles: remove burst/hidden classes so they float again
          // clear any pending timeouts
          timeouts.forEach(t=>clearTimeout(t))
          timeouts.length = 0
          bubbles.forEach((b)=>{
            b.classList.remove('burst')
            b.classList.remove('hidden')
            // force reflow to restart CSS animation
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            b.offsetWidth
          })
        }
      })
    }, { threshold: [0, 0.05, 0.2] })

    // smooth grow based on scroll progress while hero is being scrolled past
    function onScroll(){
      if(!el) return
      const rect = el.getBoundingClientRect()
      const h = rect.height || window.innerHeight
      const bottom = rect.bottom
      // progress: 0 when fully visible, 1 when bottom reaches 0 (scrolled past)
      const progress = Math.min(1, Math.max(0, 1 - (bottom / h)))
      // for each bubble set a different multiplier for scale growth
      const multipliers = [1.8, 2.2, 1.6, 2.0]
      bubbles.forEach((b, i)=>{
        const mul = multipliers[i] ?? 1.8
        const scale = 1 + progress * (mul - 1)
        b.style.setProperty('--bubble-scale', String(scale))
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    obs.observe(el)
    return ()=>{
      obs.disconnect()
      timeouts.forEach(t=>clearTimeout(t))
      window.removeEventListener('scroll', onScroll)
    }
  },[])

  return (
    <section ref={heroRef} className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
      <Particles />

      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="w-full h-full" style={{background:'radial-gradient(circle at 25% 25%, rgba(0,245,255,0.06), transparent), radial-gradient(circle at 75% 75%, rgba(157,78,221,0.04), transparent)'}} />
      </div>

      {/* floating bubbles around the hero card (use /logo.png or /logo.svg as placeholder images) */}
      <div aria-hidden>
        <div className="hero-bubble b-1"><div className="bubble-inner" style={{backgroundImage: `url('/logo.png'), url('/logo.svg')`}} /></div>
        <div className="hero-bubble b-2"><div className="bubble-inner" style={{backgroundImage: `url('/logo.png'), url('/logo.svg')`}} /></div>
        <div className="hero-bubble b-3"><div className="bubble-inner" style={{backgroundImage: `url('/logo.png'), url('/logo.svg')`}} /></div>
        <div className="hero-bubble b-4"><div className="bubble-inner" style={{backgroundImage: `url('/logo.png'), url('/logo.svg')`}} /></div>
      </div>

      <motion.div initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="glass px-6 py-12 rounded-2xl max-w-4xl neon-border border relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight" style={{color:'var(--text-soft)'}}>
          Tobiya Game Studio — Immersive XR Experiences
        </h1>
        <p className="mt-4 text-lg md:text-xl opacity-80">{data.about}</p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <motion.a whileHover={{scale:1.03}} whileTap={{scale:0.98}} href="#projects" className="btn btn-primary focus-ring">
            Enter XR World
            <span className="ml-2 w-2 h-2 rounded-full" style={{background:'var(--accent-pink)'}} />
          </motion.a>

          <motion.a whileHover={{scale:1.03}} className="btn btn-ghost btn-small" href="#contact">Join Our Journey</motion.a>
        </div>
      </motion.div>
    </section>
  )
}
