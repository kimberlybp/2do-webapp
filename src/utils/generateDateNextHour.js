export default function generateDateNextHour(date) {
  date.setHours(date.getHours() + 1);
  date.setMinutes(0);
  return date;
}