"use client"
import dynamic from 'next/dynamic'
import { useState } from 'react'

// Placeholder: user can replace with a proper GLTF/GLB viewer using three.js, react-three-fiber or model-viewer
export default function ModelViewer({ src }: { src?: string }){
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="glass p-4 rounded-lg">
      <div className="h-64 flex items-center justify-center">
        {!loaded && <div className="text-sm opacity-70">3D model placeholder</div>}
        <canvas aria-hidden className="w-full h-full" />
      </div>
      <div className="mt-3 flex justify-between">
        <button onClick={()=>setLoaded(s=>!s)} className="px-3 py-1 bg-accent1 text-black rounded">Toggle Model</button>
        <div className="text-xs opacity-80">Model viewer integration pending</div>
      </div>
    </div>
  )
}
