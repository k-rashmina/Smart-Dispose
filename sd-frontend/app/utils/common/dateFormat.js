export const formatDateRange = (startDateString, endDateString) => {
  // Convert the date strings to Date objects
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  // Helper function to format a single date without the month
  const formatDay = (date) => String(date.getDate()).padStart(2, "0");

  // Format both dates
  const formattedStartDate = formatDay(startDate);
  const formattedEndDate = formatDay(endDate);
  const month = endDate.toLocaleString("default", { month: "short" });
  const year = endDate.getFullYear();

  return `${formattedStartDate} to ${formattedEndDate}-${month}-${year}`;
};
