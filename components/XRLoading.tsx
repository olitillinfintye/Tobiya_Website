"use client"
import { motion } from 'framer-motion'

export default function XRLoading(){
  return (
    <div role="status" aria-live="polite" className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div animate={{rotate:360}} transition={{repeat: Infinity, duration: 1}} className="w-24 h-24 rounded-full glass flex items-center justify-center">
        <div className="w-12 h-12 rounded-full" style={{background:'linear-gradient(90deg,var(--accent-cyan),var(--accent-purple))'}} />
      </motion.div>
    </div>
  )
}
