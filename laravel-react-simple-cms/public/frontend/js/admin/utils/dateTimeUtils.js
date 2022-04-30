import { handleGetDate } from "./dateTime/handleGetDate";
import { handleGetNowFromServer } from "./dateTime/handleGetNow";

// str có định dạng chuỗi là year-month-day h:i:s
export function convertStringtoDateObj(str) {
    return new Date(str);
}
export function convertToDateObj(obj) {
    return new Date(`${obj.month}/${obj.day}/${obj.year} ${obj.time}`);
}
// so sánh ngày tháng năm của 2 date obj
export function compareTwoDateObj(d1, d2) {
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getYear() === d2.getYear();
}
export function betweenRangeDate(d, dateRange1, dateRange2) {
    return d >= dateRange1 && d <= dateRange2;
}
export function compareDateMonth(d, month) {
    return getMonth(d) === parseInt( month );
}
export function subtractDate(d, dateOffset) {
    const myDate = new Date();
    myDate.setTime(d.getTime() - dateOffset * 86400000);
    return myDate;
}
export function getMonth(d) {
    return d.getMonth() + 1;
}
export function getDate(no) {
    return handleGetDate(no);
}
export function getNowFromServer() {
    return handleGetNowFromServer();
}