/*
 * @Author: aardpro
 * @Date: 2023-01-09 14:14:04
 * @LastEditors: aardpro
 * @LastEditTime: 2023-01-09 17:12:23
 * @Description: 带命名空间的sessionStorage
 */

import NamespaceStorage from '@/entities/NamespaceStorage';

export default new NamespaceStorage(sessionStorage);
