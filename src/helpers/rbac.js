// import SYS_ROLES from "@/const-data/sys_roles"
import storage from '@/utils/local-storage';

import User from '@/entities/User';

export function canUpdate(user) {
  try {
    const selfUser = new User(storage.getItem('user'));
    const userEntity = user instanceof User ? user : new User(user);
    return selfUser.roleValue > userEntity.roleValue;
  } catch (err) {
    console.error(err.message);
    return false;
  }
}
export function canTrash(user) {
  try {
    const selfUser = new User(storage.getItem('user'));
    const userEntity = user instanceof User ? user : new User(user);
    return selfUser.roleValue > 2 && selfUser.roleValue > userEntity.roleValue;
  } catch (err) {
    console.error(err.message);
    return false;
  }
}
