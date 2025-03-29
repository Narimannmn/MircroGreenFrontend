import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { useGetRecordsById } from "@/entities/Journal/hooks/useGetRecordsById";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineGraph = () => {
  const { id } = useParams<{ id: string }>();
  const { data: records, isLoading } = useGetRecordsById({
    seedbed_id: id,
    page: 1,
    page_size: 100,
  });

  // Prepare the data for the chart
  const labels = records?.records.map((item) =>
    new Date(item.created_at).toLocaleString(),
  );
  const waterTemperatureData =
    records?.records.map((item) => item.water_temperature) || [];
  const airTemperatureData =
    records?.records.map((item) => item.air_temperature) || [];
  const airHumidityData =
    records?.records.map((item) => item.air_humidity) || [];
  const lightLevelData = records?.records.map((item) => item.light_level) || [];
  const heightPlantData =
    records?.records.map((item) => item.height_plant) || [];

  // Chart.js data structure
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Water Temperature (°C)",
        data: waterTemperatureData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Air Temperature (°C)",
        data: airTemperatureData,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Air Humidity (%)",
        data: airHumidityData,
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Light Level (lux)",
        data: lightLevelData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Plant Height (cm)",
        data: heightPlantData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Chart.js options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Plant Metrics Over Time",
      },
      legend: {
        position: "top" as const, // Explicitly cast to ensure correct type
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
        min: 0,
      },
    },
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <Line
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default LineGraph;
