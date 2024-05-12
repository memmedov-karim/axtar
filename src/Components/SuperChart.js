import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

const SuperChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Aggregate data based on sellers
      const sellerData = {};
      data.forEach(item => {
        item.seller.forEach(seller => {
          if (!sellerData[seller]) {
            sellerData[seller] = {
              pricenewTotal: 0,
              priceoldTotal: 0,
              endirimTotal: 0,
              count: 0
            };
          }
          sellerData[seller].pricenewTotal += parseFloat(item.pricenew?.replace('₼', '').trim()) || 0;
          sellerData[seller].priceoldTotal += parseFloat(item.priceold?.replace('₼', '').trim()) || 0;
          sellerData[seller].endirimTotal += item.endirim || 0;
          sellerData[seller].count++;
        });
      });

      const sellerLabels = Object.keys(sellerData);
      const totalPricesNew = sellerLabels.map(seller => sellerData[seller].pricenewTotal);
      const totalPricesOld = sellerLabels.map(seller => sellerData[seller].priceoldTotal);
      const totalEndirim = sellerLabels.map(seller => sellerData[seller].endirimTotal);

      const colors = ['red', 'blue', 'green']; // Add as many colors as you need

      const createGradients = (ctx, count) => {
        const gradients = [];
        for (let i = 0; i < count; i++) {
          const gradient = ctx.createLinearGradient(0, 0, 0, 400); // Create vertical gradient
          gradient.addColorStop(0, 'rgba(255, 0, 0, 0.5)'); // Add color stops
          gradient.addColorStop(1, 'rgba(0, 0, 255, 0.5)');
          gradients.push(gradient); // Push the same gradient for each dataset
        }
        return gradients;
      };

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: sellerLabels,
          datasets: [
            {
              label: 'Total Price New',
              data: totalPricesNew,
              backgroundColor: createGradients(ctx, totalPricesNew.length),
            },
            {
              label: 'Total Price Old',
              data: totalPricesOld,
              backgroundColor: createGradients(ctx, totalPricesOld.length),
            },
            {
              label: 'Total Endirim',
              data: totalEndirim,
              backgroundColor: createGradients(ctx, totalEndirim.length),
            },
          ],
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default SuperChart;