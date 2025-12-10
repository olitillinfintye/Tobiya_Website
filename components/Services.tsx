"use client"
import { motion } from 'framer-motion'
import data from '../data/studio-data'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } }
}

const item = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } }
}

export default function Services(){
  return (
    <section id="services" className="space-y-6">
      <h2 className="text-2xl font-semibold">Services</h2>

      <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.services.map((s, idx)=> (
          <motion.div
            key={s}
            variants={item}
            whileHover={{ scale: 1.06, y: -6 }}
            whileTap={{ scale: 0.98 }}
            className="glass p-6 rounded-2xl text-center transition-shadow duration-200"
            role="button"
            tabIndex={0}
            aria-label={`Service: ${s}`}
          >
            <div className="mx-auto w-14 h-14 rounded-full mb-4" style={{background:'linear-gradient(90deg,var(--accent-cyan),var(--accent-purple))'}} />
            <h3 className="font-medium">{s}</h3>
            <p className="text-sm opacity-80 mt-2">Professional XR-first approach and rapid prototyping.</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
