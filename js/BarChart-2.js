const bar2_svg = d3
  .select("#barchart2")
  .append("svg")
  .attr("width", 650)
  .attr("height", 800);

const bar2_margin = {
  mt: 50,
  mb: 150,
  ml: 150,
  mr: 100,
};

const graphWidth2 = 650 - bar2_margin.mr - bar2_margin.ml;
const graphHeight2 = 800 - bar2_margin.mt - bar2_margin.mb;

const bar2_graph = bar2_svg
  .append("g")
  .attr("width", graphWidth2)
  .attr("height", graphHeight2)
  .attr("transform", `translate(${bar2_margin.ml},${bar2_margin.mt})`);

const xg2 = bar2_graph
  .append("g")
  .attr("transform", `translate(0,${graphHeight2})`);

const yg2 = bar2_graph.append("g");

var data = [
  {
    Comapany: "Zomato",
    delivery_boys: "700000",
  },
  {
    Comapany: "Swiggy",
    delivery_boys: "600000",
  },
  {
    Comapany: "Food Panda",
    delivery_boys: "300000",
  },
  {
    Comapany: "Domino's Pizza",
    delivery_boys: "100000",
  },
  {
    Comapany: "Others",
    delivery_boys: "250000",
  },
];
const rect2 = bar2_graph.selectAll("rect").data(data);

const y2 = d3
  .scaleLinear()
  .domain([0, d3.max(data, (d) => d.delivery_boys)])
  .range([graphHeight2, 0]);

const x2 = d3
  .scaleBand()
  .domain(data.map((item) => item.Comapany))
  .range([0, graphWidth2])
  .paddingInner(0.3)
  .paddingOuter(0.1);

  var myColor = d3.scaleOrdinal().domain(data)
 .range(d3.schemeSet1)

rect2
  .attr("width", x2.bandwidth)
  .attr("height", (d) => graphHeight2 - y2(d.delivery_boys))
  .attr("fill", d=> myColor(d.Comapany))
  .attr("x", (d, i) => x(d.Comapany))
  .attr("y", (d, i) => x(d.delivery_boys));

rect2
  .enter()
  .append("rect")
  .attr("width", x2.bandwidth)
  .attr("height", (d) => graphHeight2 - y2(d.delivery_boys))
  .attr("fill", d => myColor(d.Comapany))
  .attr("x", (d, i) => x2(d.Comapany))
  .attr("y", (d, i) => y2(d.delivery_boys));

const xAxis2 = d3.axisBottom(x2);
const yAxis2 = d3
  .axisLeft(y2)
  .ticks(10)
  .tickFormat((d) => d + " users");

xg2.call(xAxis2);
yg2.call(yAxis2);

xg2
  .selectAll("text")
  .attr("transform", "rotate(-40)")
  .attr("text-anchor", "end")
  .attr("fill", "#dbedf3");
yg2.selectAll("text").attr("fill", "#dbedf3");
