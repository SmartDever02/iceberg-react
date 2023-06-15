import { ReactElement } from 'react';
import ReactECharts from 'echarts-for-react';

export default function ChartView({
  chartData,
}: {
  chartData: IChartData[];
}): ReactElement {
  return (
    <ReactECharts
      theme='dark'
      option={{
        backgroundColor: 'transparent',
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ['name', 'data', 'user data'],
          source: chartData,
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [{ type: 'bar' }, { type: 'line' }],
      }}
    />
  );
}
