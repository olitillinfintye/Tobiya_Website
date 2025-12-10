"use client"
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import data from '../data/studio-data'
import ProjectModal from './ProjectModal'

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
}

const item = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function Projects(){
  const [showAll, setShowAll] = useState(false)
  const [selected, setSelected] = useState<null | { title: string, description: string, videoUrl?: string }>(null)
  const visibleProjects = showAll ? data.projects : data.projects.slice(0, 6)

  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <section id="projects" className="space-y-6">
      <h2 className="text-2xl font-semibold">Projects</h2>

      <motion.div key={`projects-${showAll}`} ref={containerRef} variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProjects.map((p, i) => (
          <motion.div key={p.title} variants={item} whileHover={{ rotateX: 6, rotateY: -6, scale:1.02 }} className="glass p-6 rounded-3xl perspective-1000">
            <div className="h-40 bg-gradient-to-br from-[#071026] to-[#0b0b18] rounded-lg flex items-center justify-center mb-4">
              <div className="text-center px-4">
                <div className="font-semibold">{p.title}</div>
                <div className="text-xs opacity-70 mt-2">{p.description.substring(0, 90)}{p.description.length>90 ? '…' : ''}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button onClick={()=>setSelected(p)} className="btn-ghost btn-small">View</button>
              <button onClick={()=>setSelected(p)} className="btn btn-secondary btn-small">Open</button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {data.projects.length > 6 && (
        <div className="flex justify-center">
          <button aria-expanded={showAll} onClick={()=>{
            if(!showAll){
              setShowAll(true)
              // allow the DOM to update then scroll smoothly to the projects container
              setTimeout(()=>{
                if(containerRef.current){
                  containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }, 120)
            } else {
              setShowAll(false)
              setTimeout(()=>{
                if(containerRef.current){
                  containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }, 120)
            }
          }} className="mt-4 px-4 py-2 bg-transparent border border-white/10 glass rounded-md focus-ring">
            {showAll ? 'Show less' : `Show more (${data.projects.length - 6})`}
          </button>
        </div>
      )}

      {selected && (
        <ProjectModal project={selected} onClose={()=>setSelected(null)} />
      )}
    </section>
  )
}
