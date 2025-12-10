export default function Footer(){
  return (
    <footer className="w-full py-6 mt-12 border-t border-white/6 bg-transparent">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">© {new Date().getFullYear()} Tobiya Game Studio — Addis Ababa</div>
        <div className="flex items-center gap-4">
          <a href="#" aria-label="twitter" className="text-accent1">Twitter</a>
          <a href="#" aria-label="linkedin" className="text-accent2">LinkedIn</a>
          <a href="#" aria-label="youtube" className="text-accent3">YouTube</a>
        </div>
      </div>
    </footer>
  )
}
