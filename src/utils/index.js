export function formatTimeToAmPm(isoString) {
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const format = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero if needed
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds; // Add leading zero if needed

  return `${hours}:${formattedMinutes}:${formattedSeconds} ${format}`;
}

// thousand separator
export const thousandSeparator = (value) => {
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// prevent auto form submission
export function onKeyDown(keyEvent) {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault();
  }
}

// console.log(truncateString("Hello, world!", 5)); // Output: "Hello..."
export function truncateString(str, num) {
  if (str) return str?.length > num ? `${str?.substring(0, num)}...` : str;
}
