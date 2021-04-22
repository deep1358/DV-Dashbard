google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Company", "Market Share"],
    ["Zomato", 40],
    ["Food Panda", 13],
    ["Swiggy", 33],
    ["Domino's Pizza online delivery", 7],
    ["Others", 7],
  ]);

  var options = {
    title: "Market Share of company",
    backgroundColor: {
      fill: "transparent",
      opacity: 100,
    },
    titleTextStyle: { color: "#dbedf3", fontSize: 18 },
    legend: { textStyle: { color: "#dbedf3", fontSize: 16 } },
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);
}
