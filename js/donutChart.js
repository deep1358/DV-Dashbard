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

var firebaseConfig = {
  apiKey: "AIzaSyBubUU3nCmnBBsw-60zaZ-HnpcRQdP4_KM",
  authDomain: "d3-project-1-3e96f.firebaseapp.com",
  databaseURL: "https://d3-project-1-3e96f-default-rtdb.firebaseio.com",
  projectId: "d3-project-1-3e96f",
  storageBucket: "d3-project-1-3e96f.appspot.com",
  messagingSenderId: "727108553669",
  appId: "1:727108553669:web:18bdc63d1cfc260f6219ac",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

const dims = { height: 300, width: 300, radius: 150 };
const cent = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };

const donut_svg = d3
  .select("#donutchart")
  .append("svg")
  .attr("width", dims.width + 150)
  .attr("height", dims.height + 150);

const donut_graph = donut_svg.append("g").attr(
  "transform",
  `translate
(${cent.x},${cent.y})`
);

const pie = d3
  .pie()
  .sort(null)
  .value((d) => d.cost);

const arcPath = d3
  .arc()
  .outerRadius(dims.radius)
  .innerRadius(dims.radius / 2);

// const color = d3.scaleOrdinal(d3["schemeSet3"]);
var color = d3.scaleOrdinal(d3[categorical[9].name]);

const legendGroup = donut_svg
  .append("g")
  .attr("transform", `translate(${dims.width + 40},10)`);

const legend = d3.legendColor().shape("circle").shapePadding(10).scale(color);

const tip = d3
  .tip()
  .attr("class", "tip card")
  .html((d) => {
    let content = `<div class="name">Company: ${d.data.name}</div>`;
    content += `<div class="cost">5 stars rating: ${d.data.cost}</div>`;
    return content;
  });

donut_graph.call(tip);

const update = (data) => {
  color.domain(data.map((d) => d.name));

  legendGroup.call(legend);
  legendGroup.selectAll("text").attr("fill", "#dbedf3");

  const paths = donut_graph.selectAll("path").data(pie(data));

  paths.exit().transition().duration(750).attrTween("d", arcTweenExit).remove();

  paths
    .attr("d", arcPath)
    .transition()
    .duration(750)
    .attrTween("d", arcTweenUpdate);

  paths
    .enter()
    .append("path")
    .attr("class", "arc")
    .attr("stroke", "#fff")
    .attr("stroke-width", 3)
    .attr("fill", (d) => color(d.data.name))
    .each(function (d) {
      this._current = d;
    })
    .transition()
    .duration(750)
    .attrTween("d", arcTweenEnter);

  donut_graph
    .selectAll("path")
    .on("mouseover", (d, i, n) => {
      tip.show(d, n[i]);
    })
    .on("mouseout", (d, i, n) => {
      tip.hide();
    });
};

var donut_data = [];

db.collection("expenses").onSnapshot((res) => {
  res.docChanges().forEach((change) => {
    const doc = { ...change.doc.data(), id: change.doc.id };

    switch (change.type) {
      case "added":
        donut_data.push(doc);
        break;
      case "modified":
        const index = donut_data.findIndex((item) => item.id == doc.id);
        donut_data[index] = doc;
        break;
      case "removed":
        donut_data = donut_data.filter((item) => item.id !== doc.id);
        break;
      default:
        break;
    }
  });

  update(donut_data);
});

const arcTweenEnter = (d) => {
  var i = d3.interpolate(d.endAngle, d.startAngle);

  return function (t) {
    d.startAngle = i(t);
    return arcPath(d);
  };
};

const arcTweenExit = (d) => {
  var i = d3.interpolate(d.startAngle, d.endAngle);

  return function (t) {
    d.startAngle = i(t);
    return arcPath(d);
  };
};

function arcTweenUpdate(d) {
  var i = d3.interpolate(this._current, d);

  return function (t) {
    d = i(t);
    return arcPath(d);
  };
}
