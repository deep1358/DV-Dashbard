google.load("visualization", "1", { packages: ["geochart"] });
google.setOnLoadCallback(drawVisualization);

function drawVisualization() {
  var data = google.visualization.arrayToDataTable([
    ["State", "Leading Company", "Delieveries"],
    ["Uttar Pradesh", "Zomato", 81477],
    ["Maharashtra", "Swiggy", 72972],
    ["Bihar", "Food Panda", 4637],
    ["West Bengal", "Domino", 47736],
    ["Madhya Pradesh", "Domino", 42345],
    ["Tamil Nadu", "Zomato", 13456],
    ["Rajasthan", "Domino", 44587],
    ["Karnataka", "Food Panda", 32312],
    ["Gujarat", "Food Panda", 33453],
    ["Andhra Pradesh", "Swiggy", 22312],
    ["Orissa", "Domino", 43456],
    ["Telangana", "Swiggy", 76232],
    ["Kerala", "Domino", 40944],
    ["Jharkhand", "Zomato", 14587],
    ["Assam", "Swiggy", 29685],
    ["Punjab", "Food Panda", 74253],
    ["Chhattisgarh", "Zomato", 14735],
    ["Haryana", "Zomato", 11025],
    ["Jammu and Kashmir", "Domino", 47854],
    ["Uttarakhand", "Food Panda", 34102],
    ["Himachal Pradesh", "Food Panda", 45893],
    ["Tripura", "Zomato", 1102],
    ["Meghalaya", "Swiggy", 22214],
    ["Manipur", "Domino", 44578],
    ["Nagaland", "Zomato", 4571],
    ["Goa", "Zomato", 15487],
    ["Arunachal Pradesh", "Food Panda", 3445],
    ["Mizoram", "Zomato", 1478],
    ["Sikkim", "Domino", 4447],
    ["Delhi", "Swiggy", 24785],
    ["Puducherry", "Swiggy", 2417],
    ["Chandigarh", "Domino", 4478],
    ["Andaman and Nicobar Islands", "Zomato", 150],
    ["Dadra and Nagar Haveli", "Swiggy", 2457],
    ["Daman and Diu", "Swiggy", 2458],
    ["Lakshadweep", "Zomato", 147],
  ]);

  var opts = {
    region: "IN",
    displayMode: "regions",
    resolution: "provinces",
    width: 800,
    height: 600,
    colorAxis: {
      colors: ["blue", "red", "green"],
      minValue: 0,
    },
    backgroundColor: {
      fill: "transparent",
      opacity: 100,
    },
  };
  var geochart = new google.visualization.GeoChart(
    document.getElementById("mapchart")
  );
  geochart.draw(data, opts);
}
