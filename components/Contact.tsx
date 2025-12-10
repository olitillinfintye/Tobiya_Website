"use client"
import data from '../data/studio-data'
import { motion } from 'framer-motion'

export default function Contact(){
  return (
    <section id="contact" className="glass p-8 rounded-2xl">
      <div className="md:flex md:justify-between md:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="mt-2 opacity-90">{data.tagline}</p>
        </div>

        <div className="mt-6 md:mt-0 space-y-2 text-sm">
          <div><strong>Website:</strong> <a href={`https://${data.contact.website}`} className="text-accent1">{data.contact.website}</a></div>
          <div><strong>Email:</strong> <a href={`mailto:${data.contact.email}`} className="text-accent1">{data.contact.email}</a></div>
          <div><strong>Phone:</strong> <a href={`tel:${data.contact.phone}`} className="text-accent1">{data.contact.phone}</a></div>
          <div><strong>Location:</strong> {data.contact.location}</div>
        </div>
      </div>
    </section>
  )
}
