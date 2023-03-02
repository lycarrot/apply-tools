export function tranNumber(num, point = 1) {
  num = Number(num);
  console.log(num == NaN);
  if (typeof num != "number" || isNaN(num)) return 0;
  let numStr = num.toString();
  // 十万以内直接返回
  if (numStr.length < 5) {
    return numStr;
  }
  //大于8位数是亿
  // else if (numStr.length > 8) {
  // let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
  // return parseFloat(parseInt(num / 100000000) + ‘.’ + decimal) + ‘亿’;
  // }
  //大于6位数是十万 (以10W分割 10W以下全部显示)
  else if (numStr.length >= 5) {
    let decimal = numStr.substring(
      numStr.length - 4,
      numStr.length - 4 + point
    );
    return parseFloat(parseInt(num / 10000) + "." + decimal) + "w";
  }
}
