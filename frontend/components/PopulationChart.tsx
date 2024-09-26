"use client"

import { ChartData, Point , CategoryScale, Chart, LinearScale, PointElement, LineElement} from "chart.js";
import { Line } from "react-chartjs-2";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

export default function PopulationChart( {populationChartData} : {populationChartData:ChartData<"line", (number | Point | null)[], unknown>}) {
  return (
    <div>
      <Line data={populationChartData} options={{
    responsive: true,
    plugins: {
      legend:{
        display: true,
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 16
          }
        }
      },
      tooltip: {
        enabled: true,
        bodyColor: 'yellow',
        callbacks: {
          label: function (context) {
            return `Population: ${context.raw}`;
          }
        }

      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    
  }} />
    </div>
  );
}