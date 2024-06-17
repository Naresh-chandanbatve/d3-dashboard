import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({ initialData }) => {
  const svgRef = useRef(null);
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState({
    endYear: "",
    topics: "",
    sector: "",
    region: "",
  });
  const unique = (value, index, self) => self.indexOf(value) === index;

  const endYears = initialData
    .map((item) => item.end_year)
    .filter((end_year) => end_year !== null && end_year !== "")
    .filter(unique);
  const topics = initialData
    .map((item) => item.topic)
    .filter((topic) => topic && topic.trim() !== "")
    .filter(unique);
  const sectors = initialData
    .map((item) => item.sector)
    .filter((sector) => sector && sector.trim() !== "")
    .filter(unique);
  const regions = initialData
    .map((item) => item.region)
    .filter((region) => region && region.trim() !== "")
    .filter(unique);

  useEffect(() => {
    let filteredData = initialData;

    if (filters.endYear) {
      filteredData = filteredData.filter(
        (item) => item.end_year === filters.endYear
      );
      console.log(filters.endYear, filteredData);
    }
    if (filters.topics) {
      filteredData = filteredData.filter(
        (item) => item.topic === filters.topics
      );
    }
    if (filters.sector) {
      filteredData = filteredData.filter(
        (item) => item.sector === filters.sector
      );
    }
    if (filters.region) {
      filteredData = filteredData.filter(
        (item) => item.region === filters.region
      );
    }

    setData(filteredData);
  }, [filters, initialData]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 6000 - margin.left - margin.right ;
      const height = 400 - margin.top - margin.bottom;

      const processedData = data.reduce((acc, curr) => {
        if (!acc[curr.topic]) {
          acc[curr.topic] = {
            count: 0,
            totalIntensity: 0,
            totalRelevance: 0,
            totalLikelihood: 0,
          };
        }
        acc[curr.topic].count += 1;
        acc[curr.topic].totalIntensity += curr.intensity;
        acc[curr.topic].totalRelevance += curr.relevance;
        acc[curr.topic].totalLikelihood += curr.likelihood;
        return acc;
      }, {});

      const chartData = Object.keys(processedData).map((key) => ({
        topic: key,
        count: processedData[key].count,
        avgIntensity:
          processedData[key].totalIntensity / processedData[key].count,
        avgRelevance:
          processedData[key].totalRelevance / processedData[key].count,
        avgLikelihood:
          processedData[key].totalLikelihood / processedData[key].count,
      }));

      
      svg.attr("width", 6000);

      const xScale = d3
        .scaleBand()
        .domain(chartData.map((d) => d.topic))
        .range([margin.left, width - margin.right])
        .padding(0.2);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(chartData, (d) => d.count)])
        .range([height, margin.top + 80]);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale));

      
      const tooltip = svg
        .append("g")
        .attr("class", "tooltip")
        .style("display", "none");

      tooltip
        .append("rect")
        .attr("width", 200)
        .attr("height", 80)
        .attr("fill", "#cccccc")
        .style("z-index", 99)
        .style("opacity", 1)
        .attr("stroke", "#ccc");

      const text = tooltip
        .append("text")
        .attr("x", 5)
        .attr("y", 15)
        .style("font-size", "13px")
        .style("font-weight", "bold")
        .attr("fill", "black");

      // Drawing bars
      svg
        .selectAll(".bar")
        .data(chartData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => xScale(d.topic))
        .attr("y", (d) => yScale(d.count))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - yScale(d.count))
        .attr("fill", "steelblue")
        .on("mouseover", function (_, d) {
          tooltip
            .style("display", null)
            .attr(
              "transform",
              `translate(${xScale(d.topic) + xScale.bandwidth() / 2 - 100}, ${
                yScale(d.count) - 90
              })`
            );
          text.html(""); 
          text
            .append("tspan")
            .text(`Count: ${d.count}`)
            .attr("x", 5)
            .attr("dy", 0);
          text
            .append("tspan")
            .text(`Avg Intensity: ${d.avgIntensity.toFixed(2)}`)
            .attr("x", 5)
            .attr("dy", 20);
          text
            .append("tspan")
            .text(`Avg Relevance: ${d.avgRelevance.toFixed(2)}`)
            .attr("x", 5)
            .attr("dy", 20);
          text
            .append("tspan")
            .text(`Avg Likelihood: ${d.avgLikelihood.toFixed(2)}`)
            .attr("x", 5)
            .attr("dy", 20);
        })
        .on("mouseout", function () {
          tooltip.style("display", "none");
        });
    }
  }, [data]);

  return (
    <div className="px-9 pt-9 drop-shadow-xl ml-12 mt-8 bg-[#f5f5f5] w-fit rounded-xl">
      <h3 className="text-left font-bold text-black text-xl w-fit mb-9">
        Topic wise Data
      </h3>
      <div className="flex flex-row">
        <div className="w-fit m-2 shadow-md p-1 bg-slate-200 rounded-lg">
          <label>
            End Year:
            <select
              value={filters.endYear}
              onChange={(e) => handleFilterChange("endYear", e.target.value)}
              className="m-1 rounded-md"
            >
              <option value="">Select a Year</option>
              {endYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="w-fit m-2 shadow-md p-1 bg-slate-200 rounded-lg">
          <label>
            Topics:
            <select
              value={filters.topics}
              onChange={(e) => handleFilterChange("topics", e.target.value)}
              className="m-1 rounded-md"
            >
              <option value="">Select a Topic</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="w-fit m-2 shadow-md p-1 bg-slate-200 rounded-lg">
          <label>
            Sector:
            <select
              value={filters.sector}
              onChange={(e) => handleFilterChange("sector", e.target.value)}
              className="m-1 rounded-md"
            >
              <option value="">Select a Sector</option>
              {sectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="w-fit m-2 shadow-md p-1 bg-slate-200 rounded-lg">
          <label>
            Region:
            <select
              value={filters.region}
              onChange={(e) => handleFilterChange("region", e.target.value)}
              className="m-1 rounded-md"
            >
              <option value="">Select a Region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div id="chart" className="overflow-x-auto w-[800px] pt-5">
        <svg ref={svgRef} height="500px">
          <defs>
            <clipPath id="clip">
              <rect width="800" height="500"></rect>
            </clipPath>
          </defs>
          <g id="chartContent" clip-path="url(#clip)"></g>
        </svg>
      </div>
    </div>
  );
};

export default BarChart;
