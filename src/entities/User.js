/*
 * @Author: aardpro
 * @Date: 2023-03-19 17:57:43
 * @LastEditors: aardpro
 * @LastEditTime: 2023-03-19 23:20:20
 * @Description: user；类
 */
import Entity from './Entity';
import { getAvatar } from '@/utils';
import SYS_ROLES from '@/const-data/sys-roles';
import USER_GENDERS from '@/const-data/user-genders';

class User extends Entity {
  get avatar() {
    return this.data.avatar_url || getAvatar(this.id);
  }

  get email() { return this.data.email; }

  get mobile() { return this.data.mobile || ''; }

  get roleName() {
    const sysRoleItem = SYS_ROLES.find((item) => item.id === this.data.sys_role);
    if (!sysRoleItem) {
      return '';
    }
    return sysRoleItem.label;
  }

  get roleValue() {
    const sysRoleItem = SYS_ROLES.find((item) => item.id === this.data.sys_role);
    if (!sysRoleItem) {
      return 0;
    }
    return sysRoleItem.value;
  }

  get genderName() {
    const genderItem = USER_GENDERS.find((item) => item.value === this.data.gender);
    if (!genderItem) {
      return '';
    }
    return genderItem.label;
  }

  get isDeleted() {
    return !!this.data.deletedAt;
  }
}

export default User;
