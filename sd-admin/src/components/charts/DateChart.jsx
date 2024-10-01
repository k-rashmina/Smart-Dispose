// src/components/DateChart.js
import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

export default function DateChart() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    // Fetch inquiry data from the API
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/inquiry/getInquiry');
        setInquiries(response.data);
      } catch (err) {
        console.error('Error fetching inquiry data:', err);
      }
    };

    fetchInquiries();
  }, []);

  // Process data for the date chart
  const getDateData = () => {
    const dateMap = {};
    inquiries.forEach((inquiry) => {
      const date = new Date(inquiry.creationDate).toISOString().split('T')[0]; // Extract date part
      dateMap[date] = (dateMap[date] || 0) + 1;
    });
    return [['Date', 'Number of Inquiries'], ...Object.entries(dateMap)];
  };

  return (
    <div className="date-chart">
      {/* <h2>Inquiries by Date</h2> */}
      <Chart
        chartType="LineChart"
        data={getDateData()}
        options={{
          title: 'Inquiries Received Over Time',
          hAxis: { title: 'Date' },
          vAxis: { title: 'Number of Inquiries' },
          curveType: 'function',
          legend: { position: 'bottom' },
        }}
        width="100%"
        height="400px"
      />
    </div>
  );
}
