import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export const getTimeAgo = (dateString) => {
  const cleanDate = dateString.replace(".000000Z", "Z");
  const date = dayjs(cleanDate);

  //   console.log('Original date string:', dateString);
  // console.log('Cleaned date string:', cleanDate);
  // console.log('Parsed date:', date.format());
  //   console.log('Current time:', dayjs().format());

  if (!date.isValid()) {
    console.error("Invalid date:", dateString);
    return "Invalid date";
  }

  const diffInMinutes = dayjs().diff(date, "minute");

  if (diffInMinutes < 1) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  } else if (diffInMinutes < 1440) {
    // less than 24 hours
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
};

export const formatDate = (dateString, format) => {
  try {
    if (!dateString) throw new Error("No date provided");

    const cleanDate = dateString.replace(".000000Z", "Z");
    const date = dayjs(cleanDate);

    if (!date.isValid()) {
      throw new Error(`Invalid date format: ${dateString}`);
    }

    switch (format) {
      case 1:
        return date.format("MMM D, YYYY h:mm A"); // Aug 16, 2018 8:02 PM
      case 2:
        return date.format("MMM D, YYYY"); // Aug 16, 2018
      case 3:
        return date.format("MMMM D, YYYY"); // August 16, 2018
      case 4:
        return date.format("MM/DD/YYYY"); // 08/16/2018
      default:
        throw new Error(`Invalid format type: ${format}`);
    }
  } catch (error) {
    console.error("Error formatting date:", error.message);
    return "Invalid date";
  }
};

