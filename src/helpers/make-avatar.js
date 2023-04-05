/*
 * @Author: aardpro
 * @Date: 2022-10-27 22:32:23
 * @LastEditors: aardpro
 * @LastEditTime: 2022-10-27 22:34:23
 * @Description:
 */
export default function makeAvatar(avatarName, prefix = 'avatar-') {
  // 如果avatarName是非空的字符串或者数字，直接用；
  if (avatarName && ['string', 'number'].includes(typeof avatarName)) {
    return `https://api.multiavatar.com/${prefix}${avatarName}.png`;
  }
  // 如没有提供合适参数，则用随机数字
  const randomNumber = `${Math.random().toString().slice(2)}`;
  return `https://api.multiavatar.com/${prefix}${randomNumber}.png`;
}
