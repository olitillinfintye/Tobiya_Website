"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function NavBar(){
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'dark'|'light'>(() => typeof window !== 'undefined' && (localStorage.getItem('tobiya-theme') as 'dark'|'light') || 'dark')

  useEffect(()=>{
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])

  useEffect(()=>{
    // initialize theme: prefer saved, else prefer-system
    try{
      const saved = localStorage.getItem('tobiya-theme') as 'dark'|'light' | null
      if(saved){
        setTheme(saved)
        document.documentElement.classList.toggle('theme-light', saved === 'light')
      } else {
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
        const initial = prefersLight ? 'light' : 'dark'
        setTheme(initial)
        document.documentElement.classList.toggle('theme-light', initial === 'light')
      }
    }catch(err){/* ignore */}
  },[])

  const toggleTheme = ()=>{
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try{ localStorage.setItem('tobiya-theme', next) }catch(e){}
    document.documentElement.classList.toggle('theme-light', next === 'light')
  }

  const links = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#team', label: 'Team' },
    { href: '#contact', label: 'Contact' }
  ]

  return (
    <nav aria-label="Primary" className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-300 ${scrolled ? 'top-3' : 'top-6'}`}>
      <div className="max-w-6xl w-full px-4">
        <div className={`glass backdrop-blur-sm neon-border flex items-center justify-between gap-4 p-3 md:py-4 md:px-5 rounded-full shadow-lg`}> 
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Tobiya Home">
              <img src="/logo.png" alt="Tobiya Studio" className="h-15 md:h-12 w-auto" onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/logo.svg'}} />
            </Link>
            <div className="hidden md:flex items-center gap-3">
              {links.map(l => (
                <a key={l.href} href={l.href} className="text-sm opacity-90 hover:text-white/100 px-3 py-2 rounded focus-ring">{l.label}</a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a className="hidden sm:inline-block btn btn-primary btn-small focus-ring" href="#projects">Enter XR World</a>

            <button onClick={toggleTheme} aria-pressed={theme === 'light'} aria-label="Toggle theme" title="Toggle light / dark" className="theme-toggle btn-icon focus-ring hidden sm:inline-flex bg-transparent">
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="url(#)" stroke="currentColor" strokeWidth="0.6" opacity="0.95" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              )}
            </button>

            <button aria-expanded={open} aria-label="Toggle menu" onClick={()=>setOpen(v=>!v)} className="md:hidden btn-icon p-2 rounded focus-ring">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <motion.div initial={{opacity:0, y:-10}} animate={{opacity: open ? 1 : 0, y: open ? 0 : -10}} transition={{duration:0.18}} className={`md:hidden mt-3 ${open ? 'block' : 'hidden'}`}>
          <div className="glass p-3 rounded-lg space-y-2">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={()=>setOpen(false)} className="block px-3 py-2 rounded focus-ring">{l.label}</a>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  )
}
