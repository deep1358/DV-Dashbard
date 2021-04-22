google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawSeriesChart);

function drawSeriesChart() {
  var data = google.visualization.arrayToDataTable([
    ["ID", "Users", "Best Offers", "Company", "City Covered"],
    ["ZAM", 937359, 9, "Zomato", 500],
    ["SWG", 719053, 8, "Swiggy", 450],
    ["FP", 754230, 7, "Food Panda", 400],
    ["DOM", 259716, 8, "Dominos", 350],
    ["OTH", 361801, 7.5, "Others", 300],
  ]);

  var options = {
    title: "Best Offers",
    hAxis: { title: "Users" },
    vAxis: { title: "Best Offers" },
    bubble: { textStyle: { fontSize: 11 } },
    height: "1500px",
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
    chartArea: { width: "70%", height: "70%" },
  };

  var chart = new google.visualization.BubbleChart(
    document.getElementById("bubblechart")
  );
  chart.draw(data, options);
}
