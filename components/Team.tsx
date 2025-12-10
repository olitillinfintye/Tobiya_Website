"use client"
import { motion } from 'framer-motion'
import data from '../data/studio-data'

export default function Team(){
  return (
    <section id="team" className="space-y-6">
      <h2 className="text-2xl font-semibold">Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.team.map((m, i) => (
          <motion.div key={m.name} whileHover={{y:-6, scale:1.02}} className="glass p-5 rounded-2xl">
            <div className="h-36 bg-gradient-to-br from-[#071026] to-[#0b0b18] rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-xl font-bold">{m.name.split(' ')[0]}</div>
                <div className="text-xs opacity-70">{m.role}</div>
              </div>
            </div>
            <div className="text-sm opacity-80">Hover to see role</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
