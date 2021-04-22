const area_color = ["#f9de99", "#f6bb78", "#f29662", "#eb6f59", "#de425b"];
// Create SVG and padding for the chart
const area_svg = d3
  .select("#areachart")
  .append("svg")
  .attr("class","area_svg")
  .attr("height", 400)
  .attr("width", 750);

const strokeWidth = 1.5;
const area_margin = { top: 0, bottom: 20, left: 50, right: 20 };
const chart = area_svg
  .append("g")
  .attr("transform", `translate(${area_margin.left},0)`);

const width =
  +area_svg.attr("width") -
  area_margin.left -
  area_margin.right -
  strokeWidth * 2;
const height = +area_svg.attr("height") - area_margin.top - area_margin.bottom;
const grp = chart
  .append("g")
  .attr(
    "transform",
    `translate(-${area_margin.left - strokeWidth},-${area_margin.top})`
  );

const area_data = d3.json("/js/Area.json", (area_data) => {
  // console.log(area_data.data);
  // Create stack
  const stack = d3
    .stack()
    .keys(["zomato", "swiggy", "foodPanda", "dominos", "others"]);
  const stackedValues = stack(area_data);
  const stackedData = [];
  // Copy the stack offsets back into the data.
  stackedValues.forEach((layer, index) => {
    const currentStack = [];
    layer.forEach((d, i) => {
      // console.log(d);
      currentStack.push({
        values: d,
        year: area_data[i].year,
      });
    });
    stackedData.push(currentStack);
  });

  // console.log(d3.max(stackedValues[stackedValues.length - 1], (dp) => dp[1]));

  // Create scales
  const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([
      0,
      d3.max(stackedValues[stackedValues.length - 1], (dp) => dp[1]),
    ]);

  // console.log(yScale);
  const xScale = d3
    .scaleLinear()
    .range([0, width])
    .domain(d3.extent(area_data, (dataPoint) => dataPoint.year));

  const area = d3
    .area()
    .x((dataPoint) => xScale(dataPoint.year))
    .y0((dataPoint) => yScale(dataPoint.values[0]))
    .y1((dataPoint) => yScale(dataPoint.values[1]));

  const series = grp
    .selectAll(".series")
    .data(stackedData)
    .enter()
    .append("g")
    .attr("class", "series");

  //    var colors = statusArray.map(function (d, i) {
  //     return d3.interpolateWarm(i / statusArray.length);
  //   });

  //   var colorScale = d3.scaleOrdinal()
  //     .domain(statusArray)
  //     .range(colors);

  // var legendOffset3 = 500;

  //   var legend3 = d3.legendColor()
  //     .shapeWidth(30)
  //     .cells(5)
  //     .orient("horizontal")
  //     .scale(colorScale)

  series
    .append("path")
    .attr("transform", `translate(${area_margin.left},0)`)
    .style("fill", (d, i) => area_color[i])
    // .style("fill-opacity", 0.5)
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 2)
    .attr("d", (d) => area(d));

  // Add the X Axis
  chart
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).ticks(area_data.length));

  // Add the Y Axis
  chart
    .append("g")
    .attr("transform", `translate(0, 0)`)
    .call(d3.axisLeft(yScale));
});
