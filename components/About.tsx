"use client"
import { motion } from 'framer-motion'
import data from '../data/studio-data'

export default function About(){
  return (
    <section id="about" aria-labelledby="about-title" className="grid md:grid-cols-2 gap-8 items-center">
      <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="glass p-8 rounded-2xl">
        <h2 id="about-title" className="text-2xl font-semibold">About</h2>
        <p className="mt-4 text-sm opacity-90">{data.about}</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 glass rounded">
            <h3 className="font-medium">Mission</h3>
            <p className="text-sm mt-2">{data.mission}</p>
          </div>
          <div className="p-4 glass rounded">
            <h3 className="font-medium">Vision</h3>
            <p className="text-sm mt-2">{data.vision}</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="p-6">
        <h3 className="text-xl font-semibold">Objectives</h3>
        <ul className="mt-4 grid grid-cols-1 gap-3">
          {data.objectives.map((o, idx) => (
            <li key={idx} className="glass p-4 rounded flex items-start gap-3">
              <div className="w-3 h-3 rounded-full" style={{background:'var(--accent-cyan)'}} />
              <p className="text-sm">{o}</p>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}
