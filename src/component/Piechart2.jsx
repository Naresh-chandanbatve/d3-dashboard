import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) {
      console.log("No data available.");
      return;
    }

    const sourceCounts = data.reduce((acc, item) => {
      const source = item.source;
      if (source && source.trim() !== '') {
        acc[source] = (acc[source] || 0) + 1;
      }
      return acc;
    }, {});

    const dataset = Object.keys(sourceCounts).map(key => ({
      source: key,
      count: sourceCounts[key]
    }));

    if (dataset.length === 0) {
      console.log("No valid source data available.");
      return;
    }

    const totalCount = dataset.reduce((sum, current) => sum + current.count, 0);

    const width = 350;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    d3.select(svgRef.current).selectAll("*").remove();
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const pie = d3.pie().value(d => d.count);
    const data_ready = pie(dataset);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    
    const slices = svg.selectAll('path')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.source))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);


    const tooltip = svg.append("text")
      .attr("class", "tooltip")
      .style("visibility", "hidden")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("font-size", "13px")
      .style("font-weight", "bold")
      .style("fill", "black");

    slices.on('mouseover', (event, d) => {
        const [x, y] = arc.centroid(d);
        const percentage = (d.data.count / totalCount * 100).toFixed(1);
        tooltip
          .attr("x", x)
          .attr("y", y)
          .text(`${d.data.source}: ${percentage}%`)
          .style("visibility", "visible");
      })
      .on('mouseout', () => {
        tooltip.style("visibility", "hidden");
      });

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default PieChart;
