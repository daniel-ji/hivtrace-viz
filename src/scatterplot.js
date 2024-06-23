var d3 = require("d3");

function hivtrace_render_scatterplot(points, w, h, id, labels, dates) {
  const _defaultFloatFormat = d3.format(",.2r");
  const _defaultDateViewFormatShort = d3.time.format("%B %Y");

  var margin = {
    top: 10,
    right: 10,
    bottom: 100,
    left: 100,
  },
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;

  var x = (dates ? d3.time.scale() : d3.scale.linear())
    .domain(
      d3.extent(points, (p) => p.x)
    )
    .range([0, width]);

  var y = (dates ? d3.time.scale() : d3.scale.linear())
    .domain(
      d3.extent(points, (p) => p.y)
    )
    .range([height, 0]);

  var xAxis = d3.svg
    .axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(dates ? _defaultDateViewFormatShort : _defaultFloatFormat);

  var yAxis = d3.svg
    .axis()
    .scale(y)
    .orient("left")
    .tickFormat(dates ? _defaultDateViewFormatShort : _defaultFloatFormat);

  var histogram_svg = d3.select(id).selectAll("svg");

  if (!histogram_svg.empty()) {
    histogram_svg.remove();
  }

  histogram_svg = d3
    .select(id)
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  points = histogram_svg.selectAll("circle").data(points);
  points.enter().append("circle");

  points
    .attr("cx", (d) => x(d.x))
    .attr("cy", (d) => y(d.y))
    .attr("r", 3)
    .classed("node scatter", true);

  points.each(function (d) {
    if ("title" in d) {
      d3.select(this).append("title").text(d.title);
    }
  });

  var x_axis = histogram_svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  x_axis
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .attr("dx", "-.5em")
    .attr("dy", ".25em")
    .style("text-anchor", "end");
  x_axis
    .append("text")
    .text(labels.x)
    .attr("transform", "translate(" + width + ",0)")
    .attr("dy", "-1em")
    .attr("text-anchor", "end");

  var y_axis = histogram_svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0," + 0 + ")")
    .call(yAxis);

  y_axis
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .attr("dx", "-.5em")
    .attr("dy", ".25em")
    .style("text-anchor", "end");
  y_axis
    .append("text")
    .text(labels.y)
    .attr("transform", "rotate(-90)")
    .attr("dy", "1em")
    .attr("text-anchor", "end");
}

module.exports.scatterPlot = hivtrace_render_scatterplot;
