import { useEffect, useState } from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

function ComparisonChart({ week }) {
  const [compareData, setCompareData] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/compare?week=${week}`)
      .then((response) => setCompareData(response.data))
      .catch((error) => {
        console.error(error)
        setErrorMsg(error)
      })
  }, [week])

  if (compareData === null && errorMsg === null) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>Loading comparison...</p>
      </div>
    )
  }

  if (errorMsg !== null) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>Failed to load comparison data</p>
      </div>
    )
  }

  const methods = [
    compareData.baseline,
    compareData.ga_only,
    compareData.pso_only,
    compareData.hybrid,
  ]

  const chartData = {
    labels: ['Baseline', 'GA Only', 'PSO Only', 'Hybrid'],
    datasets: [
      {
        label: 'Cost',
        data: methods.map((method) => method.cost),
        backgroundColor: 'rgba(244, 163, 64, 0.7)',
        borderRadius: 6,
        barPercentage: 0.85,
        categoryPercentage: 0.7,
      },
      {
        label: 'Renewable Utilization %',
        data: methods.map((method) => method.utilization_pct),
        backgroundColor: 'rgba(79, 209, 197, 0.7)',
        borderRadius: 6,
        barPercentage: 0.85,
        categoryPercentage: 0.7,
      },
      {
        label: 'Grid Dependency %',
        data: methods.map((method) => method.grid_dependency_pct),
        backgroundColor: 'rgba(124, 92, 252, 0.7)',
        borderRadius: 6,
        barPercentage: 0.85,
        categoryPercentage: 0.7,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        offset: true,
        grid: {
          display: false,
        },
        ticks: {
          align: 'center',
          font: {
            size: 13,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          padding: 8,
        },
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
      },
    },
    layout: {
      padding: {
        top: 4,
        right: 8,
        bottom: 4,
        left: 4,
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
  }

  return (
    <div className="mx-auto my-12 max-w-5xl rounded-2xl bg-white p-8 shadow-lg">
      <div className="relative h-[360px] w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}

export { ComparisonChart }
export default ComparisonChart
