import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const ChartWithProductNamesAndPrices = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(item => item.title),
          datasets: [
            {
              label: 'Price New',
              data: data.map(item => parseFloat(item.pricenew?.replace('₼', '').trim())),
              backgroundColor: 'rgba(255, 99, 132, 0.5)'
            },
            {
              label: 'Price Old',
              data: data.map(item => parseFloat(item.priceold?.replace('₼', '').trim())),
              backgroundColor: 'rgba(54, 162, 235, 0.5)'
            },
            {
              label: 'Endirim',
              data: data.map(item => item?.endirim),
              backgroundColor: 'rgba(75, 192, 192, 0.5)'
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          onClick: (event, elements) => {
            if (elements && elements.length) {
              const dataIndex = elements[0].index;
              const { productlink } = data[dataIndex];
              window.open(productlink, '_blank');
            }
          }
        }
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default ChartWithProductNamesAndPrices;
