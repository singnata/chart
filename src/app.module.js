import angular from 'angular';
import 'chart.js';

import { registerChartPlugin } from './js/chart-plugins/horizonal-line-plugin';
import { chartComponent } from './js/components/chart/chart.component';
import { WEATHER_DATA } from './js/constants/weather-data';
import './css/main.css';

angular
  .module('myApp', ['chart.js'])
  .constant('WEATHER_DATA', WEATHER_DATA)
  .component('chart', chartComponent)
  .run(registerChartPlugin);
