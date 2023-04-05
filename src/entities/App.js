/*
 * @Author: aardpro
 * @Date: 2023-03-19 17:57:43
 * @LastEditors: aardpro
 * @LastEditTime: 2023-04-02 00:30:12
 * @Description: app类
 */
import Entity from './Entity';
import { getAvatar, safeJsonStringify } from '@/utils';
// import { safeJsonParse } from '@/utils/index'

class App extends Entity {
  get keyValue() {
    return this.data.key_value || '';
  }

  get avatar() {
    return this.data.avatar_url || getAvatar(this.id);
  }

  get requiredName() {
    return this.data.is_required ? '是' : '否';
  }

  get optionString() {
    return safeJsonStringify(this.data.option);
  }
}

export default App;
