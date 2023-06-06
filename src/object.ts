/**
 * 简单深克隆
 * @param {*} target
 * @returns
 */
export function deepCopy(target) {
  if (typeof target == "object") {
    const result = Array.isArray(target) ? [] : {};
    for (const key in target) {
      if (typeof target[key] == "object") {
        result[key] = deepCopy(target[key]);
      } else {
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

export function filterArr(arr, key) {
  var obj = {};
  arr = arr.reduce(function (item, next) {
    obj[next[key]] ? "" : (obj[next[key]] = true && item.push(next));
    return item;
  }, []);
  return arr;
}
