
    var margin={top:70, bottom:100, left:150, right:50},
    width=1200-margin.left-margin.right,
    height=700-margin.top-margin.bottom;
    var horizontal=d3.scale.ordinal().rangeRoundBands([0,width],0.25),
    vertical=d3.scale.linear().rangeRound([height,0]);
    var color = d3.scale.category20();
    var xAxis=d3.svg.axis()
    .scale(horizontal)
    .orient("bottom");

    var yAxis=d3.svg.axis()
    .scale(vertical)
    .orient("left");
    var svg=d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");
    d3.json("json/newgraduate.json",function(err,data){
      data.forEach(function(d){
        d.AreaName=d.AreaName;
        d.GraduateaboveMales=+d.GraduateaboveMales;
        d.GraduateaboveFemales=+d.GraduateaboveFemales;
      });
      var xData=["GraduateaboveMales","GraduateaboveFemales"];
      var dataIntermediate = xData.map(function (c) {
        return data.map(function (d) {
          return {x: d.AreaName, y: d[c]};
        });
      });
      var dataStackLayout = d3.layout.stack()(dataIntermediate);
      horizontal.domain(dataStackLayout[0].map(function (d) {
        return d.x;
      }));
      vertical.domain([0,
        d3.max(dataStackLayout[dataStackLayout.length - 1],
          function (d) { return d.y0 + d.y;})
        ])
        .nice();
        var layer = svg.selectAll(".stack")
        .data(dataStackLayout)
        .enter().append("g")
        .attr("class", "stack")
        .style("fill", function (d, i) {
          return color(i);
        });
        layer.selectAll("rect")
        .data(function (d) {
          return d;
        })
        .enter().append("rect")

        

        .attr("x", function (d) {
          return horizontal(d.x);
        })
        
        
        .attr("y", function (d) {
          return vertical(d.y + d.y0);
        })
        .attr("height", function (d) {
          return vertical(d.y0) - vertical(d.y + d.y0);
        })
        .attr("width", horizontal.rangeBand());
        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        // .attr("transform",)
        .call(xAxis)
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", function(d) {
              return "rotate(-65)"
              })
        .append("text")
        .attr("transform", "translate(" + width + "0)")
        
        
        .style("font-size","15px")
        .style("font-weight","bold")
        .style("color","red")
        .text("States");
        svg.append("g")
        .attr("class", "axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("dy","1em")
        .style("text-anchor", "end")
        .style("font-size","12px")
        .style("font-weight","bold")
        .style("color","red")
        .text("Graduate Population");
        var legend = svg.selectAll(".legend")
        .data(color.domain().slice().reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 +
        ")"; });
        legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 20)
        .style("fill", color);
        legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .style("fill","red")
        .style("font-weight","bold")
        .style("font-size","14px")
        .text(function(d,i) { return xData[i]+""; });
      });
      