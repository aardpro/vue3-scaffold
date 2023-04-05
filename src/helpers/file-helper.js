/**
 * @description: 格式化输出文件尺寸
 * @param {Number} fileSize 字节数
 * @param {Number} pointLength 小数点后面的位数
 * @param {Array.<String>} units 单位数组
 * @return {String}
 */
export function getFilesize(
  fileSize = 0,
  pointLength = 2,
  units = ['B', 'K', 'M', 'G', 'TB'],
) {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(+fileSize)) {
    return '';
  }
  let size = +fileSize;
  let unit;
  // eslint-disable-next-line no-cond-assign
  while ((unit = units.shift()) && size > 1024) {
    size /= 1024;
  }
  return (unit === 'B' ? size : size.toFixed(pointLength)) + (unit || '');
}

/**
 * @description: 获取文件名，不带扩展名
 * @param {String} filename
 * @return {String}
 */
export function getFileName(filename) {
  if (!filename) {
    return '';
  }
  return filename.substring(0, filename.indexOf('.'));
}
/**
 * @description  获取文件的后缀
 * @param {String} filename 如abc.txt
 * @return {String} 如txt
 */
export function getFileExt(filename) {
  if (!filename) {
    return '';
  }
  return filename.substring(filename.lastIndexOf('.') + 1);
}

/**
 * @description: 制作新的文件名
 * @param {String} key 如"avatar123"
 * @param {String} oldFileFullName 文件全名，一般是file对象的name如"dapin mapfodsm .jpg"
 * @return {String} 如"avatar123.jpg"
 */
export function makeFileName(key, oldFileFullName) {
  return [key, getFileExt(oldFileFullName)].filter((item) => !!item).join('.');
}
