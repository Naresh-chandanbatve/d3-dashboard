import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';

const WorldMap = ({ data }) => {
    const svgRef = useRef();

    const processData = (data) => {
        const countryData = {};
      
        data.forEach(item => {
          const country = item.country;
          if (country) {
            if (!countryData[country]) {
              countryData[country] = {
                count: 0,
                totalIntensity: 0,
                totalRelevance: 0,
                totalLikelihood: 0,
              };
            }
      
            countryData[country].count++;
            countryData[country].totalIntensity += item.intensity;
            countryData[country].totalRelevance += item.relevance;
            countryData[country].totalLikelihood += item.likelihood;
          }
        });
      
        Object.keys(countryData).forEach(country => {
          const data = countryData[country];
          data.avgIntensity = data.totalIntensity / data.count;
          data.avgRelevance = data.totalRelevance / data.count;
          data.avgLikelihood = data.totalLikelihood / data.count;
      
          delete data.totalIntensity;
          delete data.totalRelevance;
          delete data.totalLikelihood;
        });
      
        return countryData;
      };

      
    const countryScores = processData(data); 
    useEffect(() => {
        const countries = feature(world, world.objects.countries).features; 

        const svg = d3.select(svgRef.current);
        const projection = d3.geoMercator().fitSize([800, 400], countries[0]);
        const pathGenerator = d3.geoPath().projection(projection);

      
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("background", "#fff")
            .style("border", "1px solid #ddd")
            .style("padding", "10px")
            .style("border-radius", "5px")
            .style("pointer-events", "none");
            

        svg.selectAll("path")
            .data(countries)
            .join("path")
            .attr("d", pathGenerator)
            .attr("fill", d => {
                const country = countryScores[d.properties.name]; 
                return country ? d3.scaleSequential([1, 10], d3.interpolateBlues)(country.avgIntensity) : "#ccc";
            })
            .on("mouseover", function (event, d) {
                const country = countryScores[d.properties.name];
                if (country) {
                    tooltip.html(
                        `Country: ${d.properties.name}<br>
                         Avg Intensity: ${country.avgIntensity.toFixed(2)}<br>
                         Avg Relevance: ${country.avgRelevance.toFixed(2)}<br>
                         Avg Likelihood: ${country.avgLikelihood.toFixed(2)}`
                    ).style("visibility", "visible")
                     .style("left", `${event.pageX}px`)
                     .style("top", `${event.pageY}px`);
                }
            })
            .on("mousemove", function (event) {
                tooltip.style("left", `${event.pageX}px`)
                       .style("top", `${event.pageY}px`);
            })
            .on("mouseout", function () {
                tooltip.style("visibility", "hidden");
            });

    }, [data]); 

    return <svg ref={svgRef} width="800" height="450"></svg>;
};

export default WorldMap;
