var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 70, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleOrdinal()
  .range([0, width]);

var y = d3.scaleLinear()
  .range([height, 0]);

var xAxis = d3.axisBottom()
  .scale(x);

var yAxis = d3.axisLeft()
  .scale(y);

var line = d3.line()
  .x(function(d) { return x(d.properties.name); })
  .y(function(d) { return y(d.properties.annee2013); });

d3.json("/dist/json/expats_qualifie.json", function(error, data) {

  x.domain(d3.extent(data.features, function(d) { return d.properties.name; }));
  y.domain(d3.extent(data.features, function(d) { return d.properties.annee2013; }));

  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")  
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function(d) { return "rotate(-65)" });

  g.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Nombre d'expatriés");

  g.append("path")
    .datum(data.features)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);

});
