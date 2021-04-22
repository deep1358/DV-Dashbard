google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable(
    [
      ["Mon", 20, 28, 38, 45],
      ["Tue", 31, 38, 55, 66],
      ["Wed", 50, 55, 77, 80],
      ["Thu", 77, 77, 66, 50],
      ["Fri", 68, 66, 22, 15],
      // Treat first row as data as well.
    ],
    true
  );

  var options = {
    legend: "none",
    backgroundColor: {
      fill: "transparent",
      opacity: 100,
    },
  };

  var chart = new google.visualization.CandlestickChart(
    document.getElementById("candlestickchart")
  );

  chart.draw(data, options);
}
