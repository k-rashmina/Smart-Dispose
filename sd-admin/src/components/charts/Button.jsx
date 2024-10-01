import React from "react";

// Floating Button Component
export default function FloatingButton({ onClick }) {
  return (
    <button 
      onClick={onClick} 
      className="floating-btn"
      title="Generate Report"
    >
      Generate Report
    </button>
  );
}

// CSS styles for the floating button
const floatingBtnStyle = `
.floating-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 30px;
  background-color: #1DB954;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}

.floating-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}
`;

// Inject the styles into the document head
const style = document.createElement("style");
style.innerHTML = floatingBtnStyle;
document.head.appendChild(style);
