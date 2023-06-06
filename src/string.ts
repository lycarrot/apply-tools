/**
 * 将数字转换成千分制显示
 * @param num 传入转换的数字
 * @param point  保留小数
 * @returns
 */
export function tranNumber(num: number, point = 1) {
  num = Number(num);
  if (typeof num != "number" || isNaN(num)) return 0;
  let numStr = num.toString();
  // 十万以内直接返回
  if (numStr.length < 5) {
    return numStr;
  }
  //大于8位数是亿
  else if (numStr.length > 8) {
    let decimal = numStr.substring(
      numStr.length - 8,
      numStr.length - 8 + point
    );
    return parseFloat(parseInt(String(num / 100000000)) + "." + decimal) + "亿";
  }
  //大于6位数是十万 (以10W分割 10W以下全部显示)
  else if (numStr.length >= 5) {
    let decimal = numStr.substring(
      numStr.length - 4,
      numStr.length - 4 + point
    );
    return parseFloat(parseInt(String(num / 10000)) + "." + decimal) + "w";
  }
}

/**
 *  在字符串中含有多个空格时，测出来的宽度会一样
 * @param {*} str
 * @param {*} font
 * @returns
 */

export function getTextWidth(str = "", font = 12) {
  const dom = document.createElement("span");
  dom.style.display = "inline-block";
  dom.style.fontSize = font + "px";
  dom.textContent = String(str);
  document.body.appendChild(dom);
  const width = dom.clientWidth;
  document.body.removeChild(dom);
  return width;
}
