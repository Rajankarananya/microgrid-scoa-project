import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const techniques = [
  {
    title: 'Fuzzy Logic',
    content: 'Handles uncertainty in solar and wind forecasts by converting vague conditions into confidence scores.',
  },
  {
    title: 'Genetic Algorithm',
    content: 'Searches thousands of possible 24-hour schedules and evolves toward the strongest structural plan.',
  },
  {
    title: 'Particle Swarm Optimization',
    content: 'Fine-tunes the exact kW values within the schedule structure GA finds.',
  },
  {
    title: 'Baseline Comparison',
    content: 'A simple rule-based method used to prove the hybrid approach actually performs better.',
  },
]

function HowItWorks() {
  const [openIndex, setOpenIndex] = useState(1)

  return (
    <section className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2">
      <div>
        <p className="text-sm font-medium text-teal-600">· How It Works</p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900">Three techniques, working together</h2>
        <div className="mt-8 space-y-3">
          {techniques.map((technique, index) => {
            const isOpen = openIndex === index

            return (
              <div key={technique.title} className="overflow-hidden rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between p-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-slate-900">{technique.title}</span>
                  <span className="text-xl text-slate-500">{isOpen ? '−' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-4 pb-4 text-sm leading-6 text-gray-500">{technique.content}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>

      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1974&auto=format&fit=crop"
          alt="Solar panels in a renewable energy field"
          className="h-[400px] w-full rounded-2xl object-cover"
        />
        <div className="absolute -bottom-6 -left-6 rounded-xl bg-white p-4 shadow-lg">
          <p className="text-2xl font-bold text-lime-600">60%</p>
          <p className="text-xs text-gray-500">Cost Reduction vs Baseline</p>
        </div>
      </div>
    </section>
  )
}

export { HowItWorks }
export default HowItWorks
