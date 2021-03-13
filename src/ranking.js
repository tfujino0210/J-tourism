import {select} from 'd3-selection';
import {scaleLinear, scaleBand, scaleLog} from 'd3-scale';
import {axisBottom, axisLeft} from 'd3-axis';
import {transition} from 'd3-transition' ; 
import './main.css';

fetch('./data/ranking.json')
  .then(response => response.json())
  .then(data => horiz_bar_chart(data))
  .catch(e => {
    console.log(e);
  });

function horiz_bar_chart(data) {

  const data_used = data[0];
  const rank_array = data_used

  // set the dimensions and margins of the graph
  const margin = {top: 20, right: 20, bottom: 30, left: 40}
  const width = 480 - margin.left - margin.right
  const height = 250 - margin.top - margin.bottom

  // set the ranges
  const y = scaleBand()
              .range([height, 0])
              .padding(0.1);

  const x = scaleLinear()
              .range([0, width]);

  var svg = select("#app").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", 
                  "translate(" + margin.left + "," + margin.top + ")");

  x.domain([0, d3.max(data[0], function(d){ return Object.values(d); })]);
  y.domain(data_used.map(function(d) { return Object.keys(d); }));
  
  svg.selectAll(".bar")
     .data(data_used)
     .enter().append("rect")
     .attr("class", "bar")
     //.attr("x", function(d) { return x(d.sales); })
     .attr("width", function(d) {return x(Object.values(d)); } )
     .attr("y", function(d) { return y(Object.keys(d)); })
     .attr("height", y.bandwidth());
  
    // add the x Axis
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(axisBottom(x));

    // add the y Axis
    svg.append("g")
    .call(axisLeft(y));
  

  console.log(Object.keys(data[0]));
  
  // EXAMPLE FIRST FUNCTION
  //select('#app')
  //  .append('h1')
  //  .text('hi!');
}