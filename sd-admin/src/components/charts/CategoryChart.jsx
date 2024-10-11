import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

export default function CategoryChart() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    // Function to fetch inquiry data from the API
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/inquiry/getInquiry');
        setInquiries(response.data);
      } catch (err) {
        console.error('Error fetching inquiry data:', err);
      }
    };

    // Initial data fetch
    fetchInquiries();

    // Set up an interval to fetch data every 5 seconds
    const interval = setInterval(() => {
      fetchInquiries(); // Re-fetch inquiry data
    }, 5000); // Adjust the interval time as needed (5000ms = 5 seconds)

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array to ensure this effect runs only once on mount

  // Process data for the category chart
  const getCategoryData = () => {
    const categoryMap = {};
    inquiries.forEach((inquiry) => {
      categoryMap[inquiry.category] = (categoryMap[inquiry.category] || 0) + 1;
    });
    return [['Category', 'Number of Inquiries'], ...Object.entries(categoryMap)];
  };

  return (
    <div className="category-chart">
      <Chart
        chartType="PieChart"
        data={getCategoryData()}
        options={{
          title: 'Inquiry Distribution by Category',
          is3D: true,
          pieSliceText: 'value',
        }}
        width="100%"
        height="400px"
      />
    </div>
  );
}






