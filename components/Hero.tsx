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

    // seed random positions / sizes / durations for each bubble using CSS variables
    bubbles.forEach((b, i)=>{
      // random left/top within 6%..90% to keep them within hero
      const left = `${Math.floor(6 + Math.random() * 84)}%`
      const top = `${Math.floor(6 + Math.random() * 84)}%`
      const size = `${Math.floor(40 + Math.random() * 80)}px`
      const duration = `${(7 + Math.random() * 6).toFixed(2)}s`
      const delay = `${(Math.random() * 2).toFixed(2)}s`
      b.style.setProperty('--bubble-left', left)
      b.style.setProperty('--bubble-top', top)
      b.style.setProperty('--bubble-size', size)
      b.style.setProperty('--bubble-duration', duration)
      b.style.setProperty('--bubble-delay', delay)
    })

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
    <section id="home" ref={heroRef} className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
      <Particles />

      {/* primary radial background */}

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
      {/* Content: left card + right Lottie preview */}
      <div className="relative z-10 max-w-6xl w-full px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="glass px-6 py-12 rounded-2xl neon-border border relative z-10 w-full md:w-1/2">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight" style={{color:'var(--text-soft)'}}>
              Tobiya Game Studio — Immersive XR Experiences
            </h1>
            <p className="mt-4 text-base md:text-lg opacity-80">Tobiya Game Studio is an innovator in game development, pushing boundaries of storytelling through immersive technologies in Ethiopia.</p>

            <div className="mt-8 flex items-start gap-4">
              <div className="flex flex-col gap-3">
                <motion.a whileHover={{scale:1.03}} whileTap={{scale:0.98}} href="#projects" className="btn btn-primary focus-ring">
                  Enter XR World
                </motion.a>
                <motion.a whileHover={{scale:1.03}} className="btn btn-ghost btn-small" href="#contact">Join Our Journey</motion.a>
              </div>
            </div>
          </motion.div>

          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-full h-auto max-h-[420px] md:max-h-[520px] rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://lottie.host/embed/ae9786b7-e8f8-40bd-a0f4-90f6d61e251c/xao9tzXDBt.lottie"
                title="Tobiya Scene Preview"
                className="w-full h-full border-0 pointer-events-none"
                style={{minHeight: '240px'}}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
