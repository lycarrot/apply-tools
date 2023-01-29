/**
 * 防抖
 * @param fn 
 * @param delay 
 * @returns 
 */
export const throttle = (fn: () => any, delay: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    let called = false;
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      if (!called) {
        fn();
        called = true;
        setTimeout(() => {
          called = false
        }, delay);
      } else {
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
  export const debounce = (fn:() => any, wait, immediate?:boolean) => {
    let timeout: ReturnType<typeof setTimeout>
    return function () {
      const context = this;
      const args: any = arguments;
      // 立即执行
      if (immediate) {
        // 第一次timeout为null，则可以执行，一定时间内timeout始终不为null
        const dos = !timeout;
        timeout = setTimeout(() => {
          timeout = null;
        }, wait);
        if (dos) {
          fn.apply(context, args);
        }
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          fn.apply(context, args);
        }, wait);
      }
    }
  }