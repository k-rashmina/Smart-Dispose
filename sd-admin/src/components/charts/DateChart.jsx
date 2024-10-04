import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

export default function DateChart() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    // Function to fetch inquiry data
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/inquiry/getInquiry');
        setInquiries(response.data);
      } catch (err) {
        console.error('Error fetching inquiry data:', err);
      }
    };

    // Fetch inquiries initially
    fetchInquiries();

    // Set up an interval to fetch the data periodically
    const interval = setInterval(fetchInquiries, 5000); // Update every 5 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
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





