import Hero from '../components/Hero'
import About from '../components/About'
import Team from '../components/Team'
import Services from '../components/Services'
import Projects from '../components/Projects'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <main className="space-y-28 px-6 md:px-12 lg:px-24 py-12">
        <About />
        <Services />
        <Projects />
        <Team />
        <Contact />
      </main>
    </>
  )
}
