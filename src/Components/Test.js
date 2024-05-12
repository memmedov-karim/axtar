import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuperChart from './SuperChart';
import BarChart from './BarChart';
import ChartWithProductNamesAndPrices from './ChartWithProductNamesAndPrices';
export default function Test() {
  const [page, setPage] = useState("1");
  const [data, setData] = useState([]);
  const [databar, setDatabar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setData([]);
      setDatabar([]);
      try {
        const response = await axios.get(`https://squid-app-9rute.ondigitalocean.app/api/data?page=${page}`);
        setData(response.data.data);
        setDatabar(response.data.sellersanalytics);
      } catch (error) {
        alert(error.name);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handlePageChange = (e) => {
    setPage(e.target.value);
  };

  return (
    <div>
      <input type='text' value={page} placeholder='Enter page number' onChange={handlePageChange} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <SuperChart data={data} />
          <hr />
          <BarChart data={databar} />
          <hr />
          <ChartWithProductNamesAndPrices data={data} />
        </>
      )}
    </div>
  );
}
