import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function ChartComponent({ title, type, categories, series }) {
  const options = {
    chart: { type },
    title: { text: title },
    xAxis: { categories },
    yAxis: {
      title: { text: "Average kWh" }
    },
    series
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}