google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    [
      "Year",
      "Zomato",
      "Food Panda",
      "Swiggy",
      "Domino's Pizza online delivery",
      "Swiggy",
    ],
    ["2013", 103, 540, 100, 200, 300],
    ["2014", 1010, 1140, 600, 500, 300],
    ["2015", 1130, 2140, 2000, 1200, 1300],
    ["2016", 2030, 3140, 3100, 2200, 2300],
    ["2017", 3030, 4140, 4100, 3300, 3300],
    ["2018", 4030, 6140, 5100, 4400, 4300],
    ["2019", 5030, 5140, 5100, 4800, 5300],
    ["2020", 6030, 7140, 6100, 4700, 5300],
  ]);

  var options = {
    title: "number of downloads in year in K",
    curveType: "function",
    legend: { position: "bottom" },
    backgroundColor: {
      fill: "transparent",
      opacity: 100,
    },
    titleTextStyle: { color: "#dbedf3", fontSize: 18 },
    legend: { textStyle: { color: "#dbedf3", fontSize: 16 } },
    hAxis: {
      textStyle: { color: "white" },
    },
    vAxis: {
      textStyle: { color: "white" },
    },
    chartArea: { left: 70, top: 80, width: "60%", height: "60%" },
  };

  var chart = new google.visualization.LineChart(
    document.getElementById("linechart")
  );

  chart.draw(data, options);
}
