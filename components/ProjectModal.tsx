"use client"
import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ProjectModal({ project, onClose }: { project: { title: string, description: string, videoUrl?: string }, onClose: ()=>void }){
  useEffect(()=>{
    function onKey(e: KeyboardEvent){ if(e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return ()=> document.removeEventListener('keydown', onKey)
  },[onClose])

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-60 flex items-center justify-center">
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-black/60" onClick={onClose} />

      <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} exit={{y:10, opacity:0}} transition={{duration:0.28}} className="relative z-70 max-w-3xl w-[92%] md:w-3/4 bg-[rgba(6,8,15,0.9)] p-6 rounded-2xl glass">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="mt-2 text-sm opacity-90">{project.description}</p>
          </div>

          <button onClick={onClose} className="ml-4 btn-icon focus-ring" aria-label="Close project details">✕</button>
        </div>

        <div className="mt-4">
          {project.videoUrl ? (
            <div className="aspect-video w-full bg-black rounded overflow-hidden">
              <iframe className="w-full h-full" src={project.videoUrl} title={project.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          ) : (
            <div className="aspect-video w-full bg-black/60 rounded flex items-center justify-center text-sm opacity-80">No demo video available</div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
