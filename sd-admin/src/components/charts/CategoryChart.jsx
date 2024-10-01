// src/components/CategoryChart.js
import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

export default function CategoryChart() {
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
      {/* <h2>Inquiries by Category</h2> */}
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
