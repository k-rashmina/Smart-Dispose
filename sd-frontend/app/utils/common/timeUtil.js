// timeUtil.js
export const ConvertToUTC = (localDateString) => {
  const localDate = new Date(localDateString);
  const utcDate = new Date(
    localDate.getTime() - localDate.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];
  return utcDate;
};
