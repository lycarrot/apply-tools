(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["apply-tools"] = {}));
})(this, (function (exports) { 'use strict';

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
        var now = new Date();
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
            nowDay: nowDay,
            nowDayOfWeek: nowDayOfWeek,
            nowMonth: nowMonth,
            nowYear: nowYear,
            lastMonth: lastMonth,
        };
    }
    //获得上n周的开始日期
    function getLastWeekStartDate(n) {
        var _a = getDate(), nowDay = _a.nowDay, nowDayOfWeek = _a.nowDayOfWeek, nowMonth = _a.nowMonth, nowYear = _a.nowYear;
        var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7 * n);
        return formatDate(weekStartDate);
    }
    //获得上周的结束日期
    function getLastWeekEndDate() {
        var _a = getDate(), nowDay = _a.nowDay, nowDayOfWeek = _a.nowDayOfWeek, nowMonth = _a.nowMonth, nowYear = _a.nowYear;
        var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
        return formatDate(weekEndDate);
    }
    //获得某月的天数
    function getMonthDay(myMonth) {
        var nowYear = getDate().nowYear;
        var monthStartDate = +new Date(nowYear, myMonth, 1);
        var monthEndDate = +new Date(nowYear, myMonth + 1, 1);
        var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
        return days;
    }
    //获得上n月开始时间
    function getLastMonthStartDate(n) {
        n = n - 1;
        var _a = getDate(), nowYear = _a.nowYear, lastMonth = _a.lastMonth;
        if (lastMonth == 11) {
            var lastMonthStartDate = new Date(nowYear - 1, lastMonth - n, 1);
        }
        else {
            var lastMonthStartDate = new Date(nowYear, lastMonth - n, 1);
        }
        return formatDate(lastMonthStartDate);
    }
    //获得上月结束时间
    function getLastMonthEndDate() {
        var _a = getDate(), nowYear = _a.nowYear, lastMonth = _a.lastMonth;
        if (lastMonth == 11) {
            var lastMonthEndDate = new Date(nowYear - 1, lastMonth, getMonthDay(lastMonth));
        }
        else {
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
    function getDateRange(start, end) {
        var s1 = +new Date(start); //开始的时间
        var s2 = +new Date(end); //结束的时间
        var se = s2 - s1; //计算两个时间之间的秒数
        var days = Math.floor(se / (24 * 3600 * 1000));
        return days;
    }

    /**
     * 防抖
     * @param fn
     * @param delay
     * @returns
     */
    var throttle = function (fn, delay) {
        var timeout;
        var called = false;
        return function () {
            if (timeout) {
                clearTimeout(timeout);
            }
            if (!called) {
                fn();
                called = true;
                setTimeout(function () {
                    called = false;
                }, delay);
            }
            else {
                timeout = setTimeout(fn, delay);
            }
        };
    };
    /**
     * 节流
     * @param fn
     * @param wait
     * @param immediate
     * @returns
     */
    var debounce = function (fn, wait, immediate) {
        var timeout;
        return function () {
            var context = this;
            var args = arguments;
            // 立即执行
            if (immediate) {
                // 第一次timeout为null，则可以执行，一定时间内timeout始终不为null
                var dos = !timeout;
                timeout = setTimeout(function () {
                    timeout = null;
                }, wait);
                if (dos) {
                    fn.apply(context, args);
                }
            }
            else {
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    fn.apply(context, args);
                }, wait);
            }
        };
    };

    /**
     * 简单深克隆
     * @param {*} target
     * @returns
     */
    function deepCopy(target) {
        if (typeof target == "object") {
            var result = Array.isArray(target) ? [] : {};
            for (var key in target) {
                if (typeof target[key] == "object") {
                    result[key] = deepCopy(target[key]);
                }
                else {
                    result[key] = target[key];
                }
            }
            return result;
        }
        return target;
    }
    /**
     * 数组根据对象id去重
     * @param {*} arr
     * @param {*} key 对象去重key
     * @returns
     */
    function filterArr(arr, key) {
        var obj = {};
        arr = arr.reduce(function (item, next) {
            obj[next[key]] ? "" : (obj[next[key]] = item.push(next));
            return item;
        }, []);
        return arr;
    }

    /**
     * 将数字转换成千分制显示
     * @param num 传入转换的数字
     * @param point  保留小数
     * @returns
     */
    function tranNumber(num, point) {
        if (point === void 0) { point = 1; }
        num = Number(num);
        if (typeof num != "number" || isNaN(num))
            return 0;
        var numStr = num.toString();
        // 十万以内直接返回
        if (numStr.length < 5) {
            return numStr;
        }
        //大于8位数是亿
        else if (numStr.length > 8) {
            var decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
            return parseFloat(parseInt(String(num / 100000000)) + "." + decimal) + "亿";
        }
        //大于6位数是十万 (以10W分割 10W以下全部显示)
        else if (numStr.length >= 5) {
            var decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point);
            return parseFloat(parseInt(String(num / 10000)) + "." + decimal) + "w";
        }
    }
    /**
     *  在字符串中含有多个空格时，测出来的宽度会一样
     * @param {*} str
     * @param {*} font
     * @returns
     */
    function getTextWidth(str, font) {
        if (str === void 0) { str = ""; }
        if (font === void 0) { font = 12; }
        var dom = document.createElement("span");
        dom.style.display = "inline-block";
        dom.style.fontSize = font + "px";
        dom.textContent = String(str);
        document.body.appendChild(dom);
        var width = dom.clientWidth;
        document.body.removeChild(dom);
        return width;
    }

    /**
     * 将时间转变成多久前
     * @param dateTimeStamp
     * @returns
     */
    var getTimeAgo = function (dateTimeStamp) {
        var result;
        var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
        var hour = minute * 60;
        var day = hour * 24;
        var week = day * 7;
        var month = day * 30;
        var now = new Date().getTime(); //获取当前时间毫秒
        var diffValue = now - dateTimeStamp; //时间差
        if (diffValue < 0) {
            return;
        }
        var minC = diffValue / minute; //计算时间差的分，时，天，周，月
        var hourC = diffValue / hour;
        var dayC = diffValue / day;
        var weekC = diffValue / week;
        var monthC = diffValue / month;
        if (monthC >= 1 && monthC < 4) {
            result = " " + parseInt(String(monthC)) + "月前";
        }
        else if (weekC >= 1 && monthC < 1) {
            result = " " + parseInt(String(weekC)) + "周前";
        }
        else if (dayC >= 1 && dayC < 7) {
            result = " " + parseInt(String(dayC)) + "天前";
        }
        else if (hourC >= 1 && hourC < 24) {
            result = " " + parseInt(String(hourC)) + "小时前";
        }
        else if (minC >= 1 && minC < 60) {
            result = " " + parseInt(String(minC)) + "分钟前";
        }
        else if (diffValue >= 0 && diffValue <= minute) {
            result = "刚刚";
        }
        else {
            var datetime = new Date();
            datetime.setTime(dateTimeStamp);
            var Nyear = datetime.getFullYear();
            var Nmonth = datetime.getMonth() + 1 < 10
                ? "0" + (datetime.getMonth() + 1)
                : datetime.getMonth() + 1;
            var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
            // var Nhour =
            //   datetime.getHours() < 10
            //     ? "0" + datetime.getHours()
            //     : datetime.getHours();
            // var Nminute =
            //   datetime.getMinutes() < 10
            //     ? "0" + datetime.getMinutes()
            //     : datetime.getMinutes();
            // var Nsecond =
            //   datetime.getSeconds() < 10
            //     ? "0" + datetime.getSeconds()
            //     : datetime.getSeconds();
            result = Nyear + "-" + Nmonth + "-" + Ndate;
        }
        return result;
    };

    // 电话号码
    function validatePhone(phone) {
        var reg = /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/;
        return reg.test(phone);
    }
    //身份证
    function validateCard(card) {
        var reg = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/;
        return reg.test(card);
    }
    //邮箱
    function validateEmail(email) {
        var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    }
    //密码
    function validatePassword(password) {
        var reg = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
        return reg.test(password);
    }
    // 银行卡
    function validatebankCard(card) {
        var reg = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
        return reg.test(card);
    }

    exports.debounce = debounce;
    exports.deepCopy = deepCopy;
    exports.filterArr = filterArr;
    exports.getDateRange = getDateRange;
    exports.getLastMonthEndDate = getLastMonthEndDate;
    exports.getLastMonthStartDate = getLastMonthStartDate;
    exports.getLastWeekEndDate = getLastWeekEndDate;
    exports.getLastWeekStartDate = getLastWeekStartDate;
    exports.getTextWidth = getTextWidth;
    exports.getTimeAgo = getTimeAgo;
    exports.throttle = throttle;
    exports.tranNumber = tranNumber;
    exports.validateCard = validateCard;
    exports.validateEmail = validateEmail;
    exports.validatePassword = validatePassword;
    exports.validatePhone = validatePhone;
    exports.validatebankCard = validatebankCard;

}));
