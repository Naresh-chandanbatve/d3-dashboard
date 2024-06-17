import { useState, useRef, useEffect } from "react";
import "./App.css";
import LeftPanel from "./component/LeftPanel.jsx";
import Chart2 from "./component/chart2.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./component/navbar.jsx";
import PieChart2 from "./component/Piechart2.jsx";
import PieChart from "./component/Piechart.jsx";
import Map from "./component/Map.jsx";
function App() {
  const svgRef = useRef(null);
  const svgRef2 = useRef(null);
  const svgRef3 = useRef(null);
  const tooltipRef = useRef(null);
  const svgRef4 = useRef(null);
  const [data, setData] = useState(0)

  

  useEffect(() => {
    fetch('https://d3-dashboard-server.vercel.app/api/v1/data')
      .then(response => {
        if (!response.ok) {
          console.log(response)
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        setData(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);
  

  return (
    <ChakraProvider>
      {data ?
      <div className="flex flex-row w-[98.5vw]">
        <LeftPanel className="" />
        <div className="w-[80vw] ml-[18vw]">
          <Navbar />
          <h1 className="text-xl text-left mx-12 mt-10 font-bold">
            Hi, Welcome back!
            </h1>
            {/* <div className="px-9 pt-9 drop-shadow-xl ml-12 mt-8 bg-[#f5f5f5] w-fit rounded-xl">
              <h3 className="text-left font-bold text-black text-xl w-fit mb-9">
                Intensity bar
              </h3>
              <Chart svgRef={svgRef} data={data} />
            </div> */}

          
            <Chart2 svgRef={svgRef2} tooltipRef={tooltipRef} initialData={data} />
          
          <div className="flex flex-row">
            <div className="px-9 pt-9 drop-shadow-xl ml-12 mt-8 bg-[#f5f5f5] w-fit rounded-xl">
              <h3 className="text-left font-bold text-black text-xl w-fit mb-9">
                Sector Distribution
              </h3>
              <PieChart svgRef3={svgRef3} data={data} />
            </div>
            <div className="px-9 pt-9 drop-shadow-xl ml-12 mt-8 bg-[#f5f5f5] w-fit rounded-xl">
              <h3 className="text-left font-bold text-black text-xl w-fit mb-9">
                Source Distribution
              </h3>
              <PieChart2 svgRef3={svgRef3} data={data} />
            </div>
          </div>

          <div className="px-9 pt-9 drop-shadow-xl ml-12 mt-8 bg-[#f5f5f5] w-fit rounded-xl">
            <h3 className="text-left font-bold text-black text-xl w-fit mb-9">
              Country Wise Data
            </h3>
            <Map svgRef4={svgRef4} data={data} className="m-8" />
          </div>
        </div>
      </div>:<div className="text-xl">Loading ...</div>
      }
    </ChakraProvider>
  );
}

export default App;
