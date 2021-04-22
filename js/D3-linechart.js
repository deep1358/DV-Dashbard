var categorical = [
  { name: "schemeAccent", n: 8 },
  { name: "schemeDark2", n: 8 },
  { name: "schemePastel2", n: 8 },
  { name: "schemeSet2", n: 8 },
  { name: "schemeSet1", n: 9 },
  { name: "schemePastel1", n: 9 },
  { name: "schemeCategory10", n: 10 },
  { name: "schemeSet3", n: 12 },
  { name: "schemePaired", n: 12 },
  { name: "schemeCategory20", n: 20 },
  { name: "schemeCategory20b", n: 20 },
  { name: "schemeCategory20c", n: 20 },
];

var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  d3_line_width = 500 - margin.left - margin.right,
  d3_line_height = 350 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#d3-linechart")
  .append("svg")
  .attr("width", d3_line_width + margin.left + margin.right)
  .attr("height", d3_line_height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("../no_of_delivery.csv", function (data) {
  // color.domain(data.map((d) => d.Company));
  // group the data: I want to draw one line per group
  var sumstat = d3
    .nest() // nest function allows to group the calculation per level of a factor
    .key(function (d) {
      return d.Company;
    })
    .entries(data);

  // Add X axis --> it is a date format
  var x = d3
    .scaleLinear()
    .domain(
      d3.extent(data, function (d) {
        return d.year;
      })
    )
    .range([0, d3_line_width]);

  svg
    .append("g")
    .attr("transform", "translate(0," + d3_line_height + ")")
    .call(d3.axisBottom(x).ticks(10));

  // Add Y axis
  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return +d.Number_of_delivery;
      }),
    ])
    .range([d3_line_height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // color palette
  var res = sumstat.map(function (d) {
    return d.key;
  }); // list of group Companys
  var color = d3
    .scaleOrdinal()
    .domain(res)
    .range([
      "#e41a1c",
      "#377eb8",
      "#4daf4a",
      "#984ea3",
      "#ff7f00",
      "#ffff33",
      "#a65628",
      "#f781bf",
      "#999999",
    ]);

  const legendGroup1 = svg
    .append("g")
    .attr("transform", `translate(${d3_line_width + 40},10)`);

  // var color = d3.scaleOrdinal(d3[categorical[9].name]);

  const legend1 = d3
    .legendColor()
    .shape("circle")
    .shapePadding(10)
    .scale(color);

  legendGroup1.call(legend1);
  legendGroup1.selectAll("text").attr("fill", "#dbedf3");

  // Draw the line
  svg
    .selectAll(".line")
    .data(sumstat)
    .enter()
    .append("path")
    .attr("fill", "none")
    .attr("stroke", function (d) {
      return color(d.key);
    })
    .attr("stroke-width", 1.5)
    .attr("d", function (d) {
      return d3
        .line()
        .x(function (d) {
          return x(d.year);
        })
        .y(function (d) {
          return y(+d.Number_of_delivery);
        })(d.values);
    });
});
