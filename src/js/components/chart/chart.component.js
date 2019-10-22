import template from './chart.component.html';

const BLUE_COLOR = '0, 255, 255';
const PINK_COLOR = '255, 99, 132';
const CHART_OPTIONS = {
  tooltips: {
    position: 'nearest'
  },
  responsive: true,
  aspectRatio: 2,
  title: {
    display: true,
    text: 'London & Kyiv temperatures',
  },
  scales: {
    yAxes: [
      {
        ticks: {
          max: 35,
          min: -10,
          stepSize: 5,
          beginAtZero: true,
        },
      },
    ],
  },
};

export class ChartController {
  // @ngInject
  constructor(WEATHER_DATA) {
    this.WEATHER_DATA = WEATHER_DATA;
  }

  $onInit() {
    this.ctx = document.getElementById('myChart').getContext('2d');
    this.createChart();
  }

  getAverageTemperature(temperatureArray) {
    const sumTemperature = temperatureArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });

    return sumTemperature / temperatureArray.length;
  }

  setAverageLine() {
    CHART_OPTIONS.averageHorizontalLine = [
      {
        y: this.getAverageTemperature(this.WEATHER_DATA.temperatureKyiv),
        style: `rgba(${BLUE_COLOR})`,
      },
      {
        y: this.getAverageTemperature(this.WEATHER_DATA.temperatureLondon),
        style: `rgba(${PINK_COLOR})`,
      },
    ];
  }

  addGradientToChartBackground(color) {
    let gradient = this.ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, `rgba(${color}, 0.9)`);
    gradient.addColorStop(1, `rgba(${color}, 0.1)`);

    return gradient;
  }

  createChart() {
    this.setAverageLine();

    new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.WEATHER_DATA.months,
        datasets: [
          {
            label: 'London',
            backgroundColor: this.addGradientToChartBackground(PINK_COLOR),
            data: this.WEATHER_DATA.temperatureLondon,
            borderColor: [`rgba(${PINK_COLOR}, 1)`],
            borderWidth: 1,
            pointRadius: 5,
            pointBackgroundColor: 'white',
            pointBorderColor: `rgba(${PINK_COLOR}, 1)`,
            pointHoverBackgroundColor: `rgba(${PINK_COLOR}, 1)`,
          },
          {
            label: 'Kyiv',
            data: this.WEATHER_DATA.temperatureKyiv,
            backgroundColor: this.addGradientToChartBackground(BLUE_COLOR),
            borderColor: [`rgba(${BLUE_COLOR}, 1)`],
            borderWidth: 1,
            pointRadius: 5,
            pointBackgroundColor: 'white',
            pointBorderColor: `rgba(${BLUE_COLOR}, 1)`,
            pointHoverBackgroundColor: `rgba(${BLUE_COLOR}, 1)`,
          },
        ],
      },
      options: CHART_OPTIONS,
    });
  }
}

export const chartComponent = {
  template,
  controller: ChartController,
};
