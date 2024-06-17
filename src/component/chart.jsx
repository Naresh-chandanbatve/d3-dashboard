import React, { useEffect } from "react";
import * as d3 from "d3";

const chart = ({ svgRef, data }) => {
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = svg.attr("width") - margin.left - margin.right;
    const height = svg.attr("height") - margin.top - margin.bottom;

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.topic)) 
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d?.intensity)]) 
      .range([height - margin.bottom, margin.top]);

   

    

    // const g = svg
    //   .append("g")
    //   .attr("transform", `translate(0, ${height - margin.bottom})`)
    //   .call(d3.axisBottom(xScale))


      svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

  // Add the y-axis.
  svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
      .ticks;
      

    svg.selectAll("rect")
      .data(data) 
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d?.topic))
      .attr("y", (d) => yScale(d?.intensity))
      .attr("width", xScale.bandwidth() )
      .attr("height", (d) => yScale(0) - yScale(d?.intensity))
      .attr("fill", "steelblue");
      
  }, [data]);

  return <svg ref={svgRef} width={800} height={400}></svg>;
};

export default chart;
