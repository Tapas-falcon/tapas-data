/**
 * 计算有多少小数
 * @param num
 */
export default function countDecimalPlaces(num:number|string) {
  // 将数字转为字符串
  var str = num.toString();
  // 匹配小数点后的数字
  var decimalMatch = str.match(/\.(\d+)/);
  if (decimalMatch&&decimalMatch.length>1) {
    let [n,f]=decimalMatch;
    // 返回小数部分的长度
    return (f as string).length;
  } else {
    // 如果没有小数部分，则返回 0
    return 0;
  }
}
