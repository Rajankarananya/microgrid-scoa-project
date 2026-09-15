import { useEffect, useState } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import ComparisonChart from './ComparisonChart'
import HeroSection from './HeroSection'
import HowItWorks from './HowItWorks'
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

function App() {
  const [scheduleData, setScheduleData] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [selectedWeek, setSelectedWeek] = useState('week_normal')
  const [selectedMethod, setSelectedMethod] = useState('hybrid')

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/schedule?week=${selectedWeek}&method=${selectedMethod}`)
      .then((response) => setScheduleData(response.data))
      .catch((error) => {
        console.error(error)
        setErrorMsg(error)
      })
  }, [selectedWeek, selectedMethod])

  if (scheduleData === null && errorMsg === null) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>Loading schedule...</p>
      </div>
    )
  }

  if (errorMsg !== null) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>Failed to load schedule data</p>
      </div>
    )
  }

  const chartData = {
    labels: scheduleData.hours.map((hour) => `Hour ${hour}`),
    datasets: [
      {
        label: 'Battery Power (kW)',
        data: scheduleData.kw,
        borderColor: 'rgb(75,192,192)',
        backgroundColor: 'rgba(75,192,192,0.5)',
      },
    ],
  }

  return (
    <div>
      <HeroSection />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div className="bg-slate-50 py-20 px-6">
        <div id="results" className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl mx-auto my-12">
          <p className="text-sm font-medium text-teal-600">· Live Results</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">See the Optimized Schedule</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">
            Select a scenario and method below to view the exact hour-by-hour battery schedule our hybrid model recommends, based on real solar, wind, and demand data.
          </p>
          <div className="mb-10 flex flex-wrap items-center">
            <span className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 text-sm font-medium text-slate-700 mr-3">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Cost: {scheduleData.cost}
            </span>
            <span className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 text-sm font-medium text-slate-700 mr-3">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              Renewable Utilization: {scheduleData.utilization_pct}%
            </span>
            <span className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 text-sm font-medium text-slate-700 mr-3">
              <span className="w-2 h-2 rounded-full bg-violet-500" />
              Grid Dependency: {scheduleData.grid_dependency_pct}%
            </span>
          </div>
          <div className="mb-8 flex flex-wrap gap-4">
            <div className="flex flex-col">
              <label className="block text-xs font-medium text-gray-500 mb-1">Scenario</label>
              <select className="border border-gray-300 rounded-lg px-4 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" value={selectedWeek} onChange={(event) => setSelectedWeek(event.target.value)}>
                <option value="week_normal">Normal Week</option>
                <option value="week_high_uncertainty">High Uncertainty Week</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="block text-xs font-medium text-gray-500 mb-1">Method</label>
              <select className="border border-gray-300 rounded-lg px-4 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" value={selectedMethod} onChange={(event) => setSelectedMethod(event.target.value)}>
                <option value="baseline">Baseline</option>
                <option value="ga_only">GA Only</option>
                <option value="pso_only">PSO Only</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>
          <div className="mt-8">
            <Line data={chartData} />
          </div>
        </div>
        <div id="comparison">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-medium text-violet-600">· Method Comparison</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Why the Hybrid Approach Wins</h2>
            <p className="text-gray-500 mb-6 max-w-2xl">
              We benchmark our Fuzzy + GA + PSO hybrid against a simple rule-based baseline and each individual optimization technique, across cost, renewable utilization, and grid dependency.
            </p>
          </div>
          <ComparisonChart week={selectedWeek} />
        </div>
      </div>
    </div>
  )
}

export default App
