// 电话号码
export function validatePhone(phone: string): boolean {
  let reg = /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/;
  return reg.test(phone);
}
//身份证
export function validateCard(card: string): boolean {
  let reg =
    /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/;
  return reg.test(card);
}

//邮箱
export function validateEmail(email: string): boolean {
  let reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

//密码
export function validatePassword(password: string): boolean {
  let reg =
    /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
  return reg.test(password);
}

// 银行卡
export function validatebankCard(card: string): boolean {
  let reg =
    /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
  return reg.test(card);
}
