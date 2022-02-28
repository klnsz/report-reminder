export default function timeConverter(UNIX_timestamp: string | number | Date) {
  const a = new Date(UNIX_timestamp);
  const zeroPad = (num: number, places: any) =>
    String(num).padStart(places, "0");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = zeroPad(a.getHours(), 2);
  const min = zeroPad(a.getMinutes(), 2);
  const sec = zeroPad(a.getSeconds(), 2);
  const time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}
