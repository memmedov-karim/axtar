import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  // Extract seller names and number of products from data
  const sellerNames = data.map(item => item.sellername);
  const numberOfProducts = data.map(item => item.numberofproduct);

  // Chart data
  const chartData = {
    labels: sellerNames,
    datasets: [
      {
        label: 'Number of Products',
        data: numberOfProducts,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Seller-wise Number of Products</h2>
      <div style={{ height: '500px', width: '100%' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default BarChart;
