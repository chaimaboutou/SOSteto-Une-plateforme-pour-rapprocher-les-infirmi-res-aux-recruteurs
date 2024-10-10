import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";




const UsersPieChart = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API
        const response = await fetch("http://localhost:3000/api/users/count");
        const data = await response.json();
        console.log(data)
        
        // Transform data to match the format expected by Google Charts
        const chartData = [
          ["Utilisateurs", "Nombres"],
          ["infirmiers", data[0]],
          ["recruteurs", data[1]],
        ];

        setChartData(chartData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Chart
      chartType="PieChart"
      data={chartData}
      options={{
        title: "Utilisateurs",
      }}
      width={"100%"}
      height={"400px"}
    />
  );
};

export default UsersPieChart;
