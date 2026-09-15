import { motion } from 'framer-motion'

function HeroSection() {
  return (
    <div>
      <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-10 py-6">
        <span className="text-2xl font-extrabold text-white">Microgrid AI</span>
        <div className="flex gap-6 text-sm text-white/90">
          <a href="#how-it-works" className="transition-colors hover:text-lime-300">How It Works</a>
          <a href="#results" className="transition-colors hover:text-lime-300">Results</a>
          <a href="#comparison" className="transition-colors hover:text-lime-300">Comparison</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/Rajankarananya/microgrid-scoa-project" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/80 transition-colors hover:text-white">
            <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M10 1.5a8.5 8.5 0 0 0-2.69 16.56c.43.08.59-.19.59-.42v-1.63c-2.4.52-2.91-1.02-2.91-1.02-.39-.99-.95-1.25-.95-1.25-.78-.53.06-.52.06-.52.86.06 1.31.89 1.31.89.77 1.31 2.02.93 2.51.71.08-.55.3-.93.55-1.14-1.92-.22-3.94-.96-3.94-4.27 0-.94.34-1.7.89-2.3-.09-.22-.39-1.09.08-2.27 0 0 .73-.23 2.35.88A8.2 8.2 0 0 1 10 5.45c.74 0 1.48.1 2.17.29 1.61-1.11 2.34-.88 2.34-.88.47 1.18.18 2.05.09 2.27.55.6.88 1.36.88 2.3 0 3.32-2.02 4.05-3.95 4.27.31.27.58.8.58 1.62v2.4c0 .23.16.5.6.42A8.5 8.5 0 0 0 10 1.5Z" />
            </svg>
            GitHub
          </a>
          <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/80 transition-colors hover:text-white">
            <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="M5 2.5h7l3 3v12H5v-15Z" />
              <path d="M12 2.5v3h3M7.5 9h5M7.5 12h5M7.5 15h3" />
            </svg>
            Research Paper
          </a>
        </div>
      </nav>

      <div className="relative flex h-[700px] items-start bg-cover bg-center pt-32" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />
        <div className="relative z-[1] max-w-xl px-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white"
          >
            Brighter Future Begins with Optimized Power
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-gray-200"
          >
            A Fuzzy Logic + Genetic Algorithm + PSO hybrid system for renewable microgrid battery scheduling.
          </motion.p>
        </div>
        <div className="absolute bottom-24 left-0 z-[1] w-full overflow-hidden text-center text-6xl font-bold tracking-tighter text-white/60 md:text-8xl">
          MICROGRID AI
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 mx-auto -mt-16 grid max-w-5xl grid-cols-2 divide-x divide-gray-100 rounded-2xl bg-white shadow-xl md:grid-cols-4"
      >
        <div className="p-6 text-center">
          <p className="text-3xl font-bold text-teal-600">47.56%</p>
          <p className="text-sm text-gray-500">Renewable Utilization</p>
        </div>
        <div className="p-6 text-center">
          <p className="text-3xl font-bold text-violet-600">3.89%</p>
          <p className="text-sm text-gray-500">Grid Dependency</p>
        </div>
        <div className="p-6 text-center">
          <p className="text-3xl font-bold text-amber-600">0.86</p>
          <p className="text-sm text-gray-500">Optimized Cost</p>
        </div>
        <div className="p-6 text-center">
          <p className="text-3xl font-bold text-slate-800">4</p>
          <p className="text-sm text-gray-500">Methods Compared</p>
        </div>
      </motion.div>
    </div>
  )
}

export { HeroSection }
export default HeroSection
