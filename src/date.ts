/**
 * 获取月份有多少天
 * @param {*} year  2022
 * @param {*} month 0-11
 * @returns
 */

//格式化日期：yyyy-MM-dd
function formatDate(date) {
  var myyear = date.getFullYear();
  var mymonth = date.getMonth() + 1;
  var myweekday = date.getDate();
  if (mymonth < 10) {
    mymonth = "0" + mymonth;
  }
  if (myweekday < 10) {
    myweekday = "0" + myweekday;
  }
  return myyear + "-" + mymonth + "-" + myweekday;
}

function getDate() {
  var now: Date = new Date();
  var nowDay = now.getDate(); //当前日
  var nowDayOfWeek = now.getDay() - 1; //今天本周的第几天
  var nowMonth = now.getMonth(); //当前月
  var nowYear = now.getYear(); //当前年
  nowYear += nowYear < 2000 ? 1900 : 0; //
  var lastMonthDate = new Date(); //上月日期
  lastMonthDate.setDate(1);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  var lastMonth = lastMonthDate.getMonth();
  return {
    nowDay,
    nowDayOfWeek,
    nowMonth,
    nowYear,
    lastMonth,
  };
}

//获得上n周的开始日期
export function getLastWeekStartDate(n) {
  let { nowDay, nowDayOfWeek, nowMonth, nowYear } = getDate();
  var weekStartDate = new Date(
    nowYear,
    nowMonth,
    nowDay - nowDayOfWeek - 7 * n
  );
  return formatDate(weekStartDate);
}
//获得上周的结束日期
export function getLastWeekEndDate() {
  let { nowDay, nowDayOfWeek, nowMonth, nowYear } = getDate();
  var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
  return formatDate(weekEndDate);
}

//获得某月的天数
function getMonthDay(myMonth) {
  let { nowYear } = getDate();
  var monthStartDate = +new Date(nowYear, myMonth, 1);
  var monthEndDate = +new Date(nowYear, myMonth + 1, 1);
  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
}

//获得上n月开始时间
export function getLastMonthStartDate(n) {
  n = n - 1;
  let { nowYear, lastMonth } = getDate();
  if (lastMonth == 11) {
    var lastMonthStartDate = new Date(nowYear - 1, lastMonth - n, 1);
  } else {
    var lastMonthStartDate = new Date(nowYear, lastMonth - n, 1);
  }
  return formatDate(lastMonthStartDate);
}
//获得上月结束时间
export function getLastMonthEndDate() {
  let { nowYear, lastMonth } = getDate();
  if (lastMonth == 11) {
    var lastMonthEndDate = new Date(
      nowYear - 1,
      lastMonth,
      getMonthDay(lastMonth)
    );
  } else {
    var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDay(lastMonth));
  }
  return formatDate(lastMonthEndDate);
}

/**
 * 获取时间之间的跨度
 * @param {*} start
 * @param {*} end
 * @returns
 */
export function getDateRange(start, end) {
  var s1 = +new Date(start); //开始的时间
  var s2 = +new Date(end); //结束的时间
  var se = s2 - s1; //计算两个时间之间的秒数
  var days = Math.floor(se / (24 * 3600 * 1000));
  return days;
}
