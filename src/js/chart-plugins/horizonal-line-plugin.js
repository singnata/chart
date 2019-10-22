export function registerChartPlugin() {
  var horizonalLinePlugin = {
    afterDraw: function(chartInstance) {
      var yValue;
      var yScale = chartInstance.scales['y-axis-0'];
      var canvas = chartInstance.chart;
      var ctx = canvas.ctx;
      var index;
      var line;
      var style;

      if (chartInstance.options.averageHorizontalLine) {
        for (index = 0; index < chartInstance.options.averageHorizontalLine.length; index++) {
          line = chartInstance.options.averageHorizontalLine[index];

          if (!line.style) {
            style = 'rgba(169,169,169, .6)';
          } else {
            style = line.style;
          }

          if (line.y) {
            yValue = yScale.getPixelForValue(line.y);
          } else {
            yValue = 0;
          }

          ctx.lineWidth = 2;
          ctx.setLineDash([15, 5]);

          if (yValue) {
            ctx.beginPath();
            ctx.moveTo(35, yValue);
            ctx.lineTo(canvas.width - 30, yValue);
            ctx.strokeStyle = style;
            ctx.stroke();
          }
        }
        return;
      }
    },
  };
  Chart.pluginService.register(horizonalLinePlugin);
}
