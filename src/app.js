// if the data you are going to import is small, then you can import it using es6 import
// (I like to use use screaming snake case for imported json)
// import MY_DATA from './app/data/example.json'

import {scatter} from './utils';
import {select, selectAll} from 'd3-selection';
import {scaleLinear, scaleBand, scaleLog} from 'd3-scale';
import {axisBottom, axisLeft} from 'd3-axis';
import {format} from 'd3-format';
import {transition} from 'd3-transition' ; 
import {line} from 'd3-shape';

// this command imports the css file, if you remove it your css wont be applied!
import './main.css';

// this is just one example of how to import data. there are lots of ways to do it!
fetch('./data/global_arr_exp.json')
  .then(response => response.json())
  .then(data => scatter_plot(data))
  .catch(data => {
    console.log(data);
  });

function scatter_plot(data) {
 
  const Japan = data.slice(21,22);
  const others = data.slice(0,21).concat(data.slice(22,45));
  const height = 460;
  const width = 540;
  const margin = {top: 30, bottom: 70, right: 70, left: 90};
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const xDomain = [0, 200];
  const yDomain = [0, 200];

  const xScale = scaleLinear()
    .domain(xDomain)
    .range([0, plotWidth]);
  const yScale = scaleLinear()
    .domain(yDomain)
    .range([plotHeight, 0]);
  
  const svg = select('#my_dataviz')
             .append('svg')
             .attr('height', `${height}px`)
             .attr('width', `${width}px`)
             .append('g')
             .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const axisx = axisBottom(xScale).ticks(3);
  const axisy = axisLeft(yScale).ticks(3);
  let on_off = 0

  svg.append("g")
     .attr("transform", "translate(" + (0) + "," + (height - margin.top - margin.bottom) + ")")
     .call(axisx)
     .append("text")
     .attr("fill", "black")
     .attr("x", (width - margin.left - margin.right) / 2 )
     .attr("y", 35)
     .attr("text-anchor", "middle")
     .attr("font-size", "11pt")
     .text("International tourism reciept (Million USD)");
  
  svg.append("g")
     .attr("transform", "translate(" + 0 + "," + 0 + ")")
     .call(axisy)
     .append("text")
     .attr("fill", "black")
     .attr("x", -(height - margin.top - margin.bottom) / 2)
     .attr("y", -35)
     .attr("transform", "rotate(-90)")
     .attr("text-anchor", "middle")
     .attr("font-size", "11pt")
     .text("Internatiol tourist arrivals (Millions)");
  
  svg.append("text")
     .attr("x", 350) 
     .attr("y", 20) 
     .attr("text-anchor", "bottom")  
     .style("font-size", "22px")
     .attr("font-weight", "bold")
     .attr("font-weight", "normal")
     .text("2010")
     .classed("year",true)
     ;
  
  
  svg.append("g")
     .selectAll("circle")
     .data(others)
     .enter()
     .append("circle")
     .attr("cx", function(d) {
      return xScale(d["Expenditure"][0]/1000);
     })
     .attr("cy", function(d) {
      return yScale(d["Arrivals"][0]/1000);
     })
     .attr("r", 3)
     .classed("Others",true)
     ;
  
  svg.append("g")
     .selectAll("circle")
     .data(Japan)
     .enter()
     .append("circle")
     .attr('cx', function(d) {
      return xScale(d["Expenditure"][0]/1000);
     })
     .attr('cy', function(d) {
      return yScale(d["Arrivals"][0]/1000);
     })
     .attr("r", 5)
     .classed("JPN",true);

  select("#start_button")
     .on("click", function(){
       if(on_off===0){
        svg.selectAll(".JPN")
         .data(Japan)
         .transition()
         .duration(4000)
         .attr('cx', function(d) {
           return xScale(d["Expenditure"][3]/1000);
         })
         .attr('cy', function(d) {
           return yScale(d["Arrivals"][3]/1000);
         })
         .transition()
         .duration(2000)
         .attr('cx', function(d) {
           return xScale(d["Expenditure"][6]/1000);
         })
         .attr('cy', function(d) {
           return yScale(d["Arrivals"][6]/1000);
         })
         .transition()
         .duration(2000)
         .attr('cx', function(d) {
           return xScale(d["Expenditure"][9]/1000);
         })
         .attr('cy', function(d) {
           return yScale(d["Arrivals"][9]/1000);
         });
        svg.selectAll(".Others")
         .data(others)
         .transition()           // apply a transition
         .duration(4000)         // apply it over 4000 milliseconds
         .attr('cx', function(d) {
               return xScale(d["Expenditure"][3]/1000);
         })
         .attr('cy', function(d) {
               return yScale(d["Arrivals"][3]/1000);
         })
         .transition()           // apply a transition
         .duration(2000)         // apply it over 4000 milliseconds
         .attr('cx', function(d) {
               return xScale(d["Expenditure"][6]/1000);
         })
         .attr('cy', function(d) {
               return yScale(d["Arrivals"][6]/1000);
         })
         .transition()           // apply a transition
         .duration(2000)         // apply it over 4000 milliseconds
         .attr('cx', function(d) {
               return xScale(d["Expenditure"][9]/1000);
         })
         .attr('cy', function(d) {
               return yScale(d["Arrivals"][9]/1000);
         });
        on_off = 1
        svg.selectAll(".year")
           .transition()
           .delay(2000)
           .duration(2000)
           .text("2013")
           .transition()
           .delay(1500)
           .duration(500)
           .text("2016")
           .transition()
           .delay(1500)
           .duration(500)
           .text("2019")
           ;
           
      }
     });

     select("#reset_button")
     .on("click", function(){
        svg.selectAll(".Others")
           .data(others)
           .attr("cx", function(d) {
                return xScale(d["Expenditure"][0]/1000);
           })
           .attr("cy", function(d) {
                return yScale(d["Arrivals"][0]/1000);
           })
           .attr("r", 3);

        svg.selectAll(".JPN")
           .data(Japan)
           .attr('cx', function(d) {
            return xScale(d["Expenditure"][0]/1000);
           })
           .attr('cy', function(d) {
            return yScale(d["Arrivals"][0]/1000);
           })
           .attr("r", 5);
        svg.selectAll(".year")
           .text("2010");
        on_off = 0;
     });



   // Title
   //svg.append("text")
   //   .attr("x", -25)             
   //   .attr("y", -65) 
   //   .attr("text-anchor", "left")  
   //   .style("font-size", "16px") 
   //   .style("text-decoration", "underline")
   //   .attr("font-weight", "bold")
   //   .text("Growth of inbound tourism in top 50 countries.");
   // Subtitle
   //svg.append("text")
   //   .attr("x", -25)    
   //   .attr("y", -45) 
   //   .attr("text-anchor", "left")  
   //   .style("font-size", "13px") 
   //   .attr("font-weight", "normal")
   //   .text("Japan showed significant growth in 2010s");
   // Source
   svg.append("text")
      .attr("x", 290) 
      .attr("y", 415) 
      .attr("text-anchor", "bottom")  
      .style("font-size", "12px") 
      .style("text-decoration", "underline")
      .attr("font-weight", "normal")
      .text("Source: UNWTO");
     
}

function unique(data, key) {
  return Array.from(data.reduce((acc, row) => acc.add(row[key]), new Set()));
}

fetch('./data/ranking.json')
  .then(response => response.json())
  .then(data => horiz_bar_chart(data))
  .catch(e => {
    console.log(e);
  });

function horiz_bar_chart(data) {
  const data_ = data;
  const data_2010 = data_[2010].reverse();
  const data_2016 = data_[2016].reverse();
  const data_2013 = data_[2013].reverse();
  const data_2019 = data_[2019].reverse();

  // set the dimensions and margins of the graph
  const margin = {top: 30, right: 20, bottom: 30, left: 100}
  const width = 600 - margin.left - margin.right
  const height = 400 - margin.top - margin.bottom

  // set the ranges
  const y = scaleBand()
              .range([height, 0])
              .padding(0.1);

  const x = scaleLinear()
              .range([0, width]);

  const svg = select("#ranking").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", 
                  "translate(" + margin.left + "," + margin.top + ")");

  x.domain([0, 9])
  y.domain(unique(data_2010, "Country/Area"));
  
  svg.selectAll(".bar")
     .data(data_2010)
     .enter().append("rect")
     .classed("bar_c",true)
     .attr("x", 0)
     .attr("width", function(d) {return x(d["Arrivals"]); } )
     .attr("y", function(d) {return y(d["Country/Area"]); })
     .attr("height", y.bandwidth())
     .style("fill", function(d) {
      return "rgb(0, 0, " + (d["Arrivals"] * 80) + ")";
    });

  select("#to_2013")
    .on("click", function(){
       svg.select(".y-axis")
          .call(axisLeft(y.domain(unique(data_2013, "Country/Area"))));
       selectAll("rect")
         .data(data_2013)
         .style("fill", function(d) {
            return "rgb(0, 0, " + (d["Arrivals"]/1000 * 80) + ")";
         }) 
         .attr("width", function(d) {return x(d["Arrivals"]/1000);})
         .attr("y", function(d) {return y(d["Country/Area"]);})
       svg.selectAll(".year_bar")
          .text("2013")
     });
  
  select("#to_2016")
    .on("click", function(){
        svg.select(".y-axis")
           .call(axisLeft(y.domain(unique(data_2016, "Country/Area"))));
        selectAll("rect")
           .data(data_2016)
           .style("fill", function(d) {
            return "rgb(0, 0, " + (d["Arrivals"]/1000 * 80) + ")";
           }) 
           .attr("width", function(d) {return x(d["Arrivals"]/1000);})
           .attr("y", function(d) {return y(d["Country/Area"]);})
        svg.selectAll(".year_bar")
           .text("2016")
      });
  

  select("#to_2019")
    .on("click", function(){
      svg.select(".y-axis")
         .call(axisLeft(y.domain(unique(data_2019, "Country/Area"))));
      selectAll("rect")
         .data(data_2019)
         .style("fill", function(d) {
          return "rgb(0, 0, " + (d["Arrivals"]/1000 * 80) + ")";
         }) 
         .attr("width", function(d) {return x(d["Arrivals"]/1000);})
         .attr("y", function(d) {return y(d["Country/Area"]);})
      svg.selectAll(".year_bar")
         .text("2019")
    });

    select("#to_2010")
      .on("click", function(){
      svg.select(".y-axis")
         .call(axisLeft(y.domain(unique(data_2010, "Country/Area"))));
      selectAll("rect")
         .data(data_2010)
         .style("fill", function(d) {
          return "rgb(0, 0, " + (d["Arrivals"] * 80) + ")";
         }) 
         .attr("width", function(d) {return x(d["Arrivals"]);})
         .attr("y", function(d) {return y(d["Country/Area"]);})
      svg.selectAll(".year_bar")
         .text("2010")
    });
  
  
    // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x));

    // add the y Axis
  svg.append("g")
     .call(axisLeft(y))
     .attr("class", "y-axis");

     //Show year.
  svg.append("text")
     .attr("x", 400) 
     .attr("y", -10) 
     .attr("text-anchor", "bottom")  
     .style("font-size", "22px")
     .attr("font-weight", "bold")
     .attr("font-weight", "normal")
     .text("2010")
     .classed("year_bar",true)
     ;

}

fetch('./data/jpn_arr_exp.json')
  .then(response => response.json())
  .then(data => simple_line_chart(data))
  .catch(e => {
    console.log(e);
 });

 function simple_line_chart(data){
    const height = 400;
    const width = 650;
    const margin = {top: 80, bottom: 50, right: 40, left: 80};
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const xDomain = [1995, 2019];
    const yDomain = [0, 35];
    const xScale = scaleLinear()
                   .domain(xDomain)
                   .range([0, plotWidth]);
    const yScale = scaleLinear()
                   .domain(yDomain)
                   .range([plotHeight, 0]);

    const svg = select('#line_chart_1')
                .append('svg')
                .attr('height', `${height}px`)
                .attr('width', `${width}px`)
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const axisx = axisBottom(xScale).ticks(5);
    const axisy = axisLeft(yScale).ticks(10);

    svg.append("g")
       .attr("transform", "translate(" + (0) + "," + (height - margin.top - margin.bottom) + ")")
       .call(axisx)
       .append("text")
       .attr("fill", "black")
       .attr("x", (width - margin.left - margin.right) / 2 )
       .attr("y", -25)
       .attr("text-anchor", "middle")
       .attr("font-size", "10pt")
       .attr("font-weight", "bold");
 
    svg.append("g")
       .attr("transform", "translate(" + 0 + "," + 0 + ")")
       .call(axisy)
       .append("text")
       .attr("fill", "black")
       .attr("x", -(height - margin.top - margin.bottom) / 2)
       .attr("y", -40)
       .attr("transform", "rotate(-90)")
       .attr("text-anchor", "middle")
       .attr("font-size", "11pt")
       .text("Internatiol tourist arrivals (Millions)");
  
    const line_ = line()
                  .x(function(d,i){
                     return xScale(d.year);
                  })
                  .y(function(d,i){
                     return yScale(d.arrivals);      
                  });

    const path = svg.append("path")
                    .attr("fill", "red")
                    .attr("class", "line")
                    .attr("d", line_(data))
                    .style("stroke-width", 2);

    const pathLength = path.node().getTotalLength();
  
    path.attr("stroke-dasharray", pathLength + " " + pathLength)
        .attr("stroke-dashoffset", pathLength)
        .transition()
        .duration(4000)
        .attr("stroke-dashoffset", 0);
    
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 0)
        .attr("cx", function(d){
          return xScale(d["year"]);
        })
        .attr("cy", function(d){
          return yScale(d["arrivals"]);
        })
        .attr("fill","blue")
        .transition()
        .delay(function(d,i){
          return 1200+(i*100);
        })
        .attr("r", 3);

    //svg.append("text")
    //   .attr("x", 1000)             
    //   .attr("y", 25) 
    //   .attr("text-anchor", "left")  
    //   .style("font-size", "12px")
    //   .text("32 Millions")

    // Title
    svg.append("text")
        .attr("x", 0)             
        .attr("y", -35) 
        .attr("text-anchor", "left")  
        .style("font-size", "17px") 
        .style("text-decoration", "underline")
        .attr("font-weight", "bold")
        .text("Growing inbound visitors to Japan grew in 2010s.");
    // Subtitle
    svg.append("text")
           .attr("x", 0)    
           .attr("y", -15) 
           .attr("text-anchor", "left")  
           .style("font-size", "13px") 
           .attr("font-weight", "normal")
           .text("The number of inbound travelers in 2019 was four times of that in 2010.");
    // Source
    svg.append("text")
           .attr("x", 250) 
           .attr("y", 315) 
           .attr("text-anchor", "bottom")  
           .style("font-size", "12px") 
           .style("text-decoration", "underline")
           .attr("font-weight", "normal")
           .text("Source: UNWTO (the World Tourism Organization)");
 }

fetch('./data/ranking_from.json')
  .then(response => response.json())
  .then(data => multi_line_chart(data))
  .catch(data => {
    console.log(data);
  });

function multi_line_chart(data){

  const height = 500;
  const width = 600;
  const margin = {top: 80, bottom: 50, right: 40, left: 80};
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const xDomain = [2010, 2019];
  const yDomain = [0, 1.5];
  const xScale = scaleLinear()
                 .domain(xDomain)
                 .range([0, plotWidth]);
  const yScale = scaleLinear()
                 .domain(yDomain)
                 .range([plotHeight, 0]);

  const svg = select("#lines")
              .append('svg')
              .attr('height', `${height}px`)
              .attr('width', `${width}px`)
              .append('g')
              .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const axisx = axisBottom(xScale).ticks(9);
  const axisy = axisLeft(yScale).ticks(5);

  const tooltip = select("#lines").append("div").attr("class", "tooltip")
                    .style("background-color", "white")
                    .style("border-width", "1px")
                    .style("border-radius", "5px");

  svg.append("g")
     .attr("transform", "translate(" + (0) + "," + (height - margin.top - margin.bottom) + ")")
     .call(axisx)
     .append("text")
     .attr("fill", "black")
     .attr("x", (width - margin.left - margin.right) / 2 )
     .attr("y", -25)
     .attr("text-anchor", "middle")
     .attr("font-size", "10pt")
     .attr("font-weight", "bold");

  svg.append("g")
     .attr("transform", "translate(" + 0 + "," + 0 + ")")
     .call(axisy)
     .append("text")
     .attr("fill", "black")
     .attr("x", -(height - margin.top - margin.bottom) / 2)
     .attr("y", -40)
     .attr("transform", "rotate(-90)")
     .attr("text-anchor", "middle")
     .attr("font-size", "11pt")
     .text("Internatiol tourist arrivals (Millions)");
  
  const line_ = line()
                 .x(function(d){ return xScale(d.year); })
                 .y(function(d){ return yScale(d.arrivals); });
  const colorArr = ['blue', '#3498DB', '#2ECC71', '#9B59B6', '#34495e',
                  '#E7A23C', '#652681', '#4E2E2A', '#73261E', "#F08D82", "#5A9A53"];
  const countries = ['Australia', 'Canada', 'France', 'Indonesia', 'Malaysia', 'Philippines', 
                      'Singapore', 'Thailand', 'United Kingdom', 'United States', 'Vietnam']

  for(var i = 0; i < data.length; i++) {
      let dataset = data[i][countries[i]];
      let country = countries[i];
      svg.append("path")
         .attr("class", "line_c")
         .attr("d", line_(dataset))
         .attr("stroke", colorArr[i])
         .attr("stroke-width", "3px")
         .attr("fill", "none")
         .attr("style", "pointer-events: auto;")
         .on("mouseover", function() {
            select(this) 
              .style('opacity', 0.3);
            tooltip
              .style("visibility", "visible")
              .html(country + "<br>2010 : " + dataset[0]["arrivals"].toFixed(2) + " m<br> 2019 : " + dataset[9]["arrivals"].toFixed(2)+ " m")
              .style("top", 2100 + "px")
              .style("left", 470 + "px");        
          })
         .on("mouseout", function() { 
            select(this)
              .style('opacity', 1.0)
            tooltip.style("visibility", "hidden");
          });
  }
  // Title
   svg.append("text")
       .attr("x", -20)             
       .attr("y", -45) 
       .attr("text-anchor", "left")  
       .style("font-size", "16px") 
       .style("text-decoration", "underline")
       .attr("font-weight", "bold")
       .text("Don’t forget the growth in tourists from other countries.");
       //.text("Tourist arrivals from other regions also went up.");
   // Subtitle
   svg.append("text")
      .attr("x", -20)    
      .attr("y", -27) 
      .attr("text-anchor", "left")  
      .style("font-size", "13px") 
      .attr("font-weight", "normal")
      .text("The number of tourists from USA in 2019 was four times of that in 2011.");

   svg.append("text")
      .attr("x", -20)    
      .attr("y", -10) 
      .attr("text-anchor", "left")  
      .style("font-size", "12px") 
      .attr("font-weight", "normal")
      .text("(Top 15 countries/areas excluding top 4)");
   // Source
   svg.append("text")
      .attr("x", 250) 
      .attr("y", 410) 
      .attr("text-anchor", "bottom")  
      .style("font-size", "11px") 
      .style("text-decoration", "underline")
      .text('Source: Japan National Tourism Organization');

}
