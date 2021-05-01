const bar_svg = d3
  .select("#barchart")
  .append("svg")
  .attr("width", 650)
  .attr("height", 800);

const bar_margin = {
  mt: 50,
  mb: 150,
  ml: 120,
  mr: 100,
};

const graphWidth = 650 - bar_margin.mr - bar_margin.ml;
const graphHeight = 800 - bar_margin.mt - bar_margin.mb;

const bar_graph = bar_svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(170,${bar_margin.mt})`);

const xg = bar_graph
  .append("g")
  .attr("transform", `translate(0,${graphHeight})`);

const yg = bar_graph.append("g");

var data = [
  {
    Comapany: "Zomato",
    delivery_boys: "7000",
  },
  {
    Comapany: "Swiggy",
    delivery_boys: "6000",
  },
  {
    Comapany: "Food Panda",
    delivery_boys: "3000",
  },
  {
    Comapany: "Domino's Pizza",
    delivery_boys: "1000",
  },
  {
    Comapany: "Others",
    delivery_boys: "2500",
  },
];
const rect = bar_graph.selectAll("rect").data(data);

const y = d3
  .scaleLinear()
  .domain([0, d3.max(data, (d) => d.delivery_boys)])
  .range([graphHeight, 0]);
console.log();
const x = d3
  .scaleBand()
  .domain(data.map((item) => item.Comapany))
  .range([0, graphWidth])
  .paddingInner(0.3)
  .paddingOuter(0.1);

var myColor = d3.scaleOrdinal().domain(data)
 .range(d3.schemeSet3)

rect
  .attr("width", x.bandwidth)
  .attr("height", (d) => graphHeight - y(d.delivery_boys))
  .attr("fill", d => myColor(d.Comapany))
  .attr("x", (d, i) => x(d.Comapany))
  .attr("y", (d, i) => x(d.delivery_boys));

rect
  .enter()
  .append("rect")
  .attr("width", x.bandwidth)
  .attr("height", (d) => graphHeight - y(d.delivery_boys))
  .attr("fill", d => myColor(d.Comapany))
  .attr("x", (d, i) => x(d.Comapany))
  .attr("y", (d, i) => y(d.delivery_boys));

const xAxis = d3.axisBottom(x);
const yAxis = d3
  .axisLeft(y)
  .ticks(10)

  .tickFormat((d) => d + " delivery_boys");

xg.call(xAxis);
yg.call(yAxis);

xg.selectAll("text")
  .attr("transform", "rotate(-40)")
  .attr("text-anchor", "end")
  .attr("fill", "#dbedf3");
yg.selectAll("text").attr("fill", "#dbedf3");
