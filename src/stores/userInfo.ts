import { defineStore } from 'pinia';

export interface IUserInfo {
  isLogined: boolean;
  nickname: string;
}

export const useUserInfoStore = defineStore('userInfo', {
  state: (): IUserInfo => ({
    isLogined: false,
    nickname: '',
  }),
  getters: {
    getUserInfo: (state): IUserInfo => state,
  },
  actions: {
    setLogin(nickname: string) {
      this.isLogined = true;
      this.nickname = nickname;
    },
    setLogout() {
      this.isLogined = false;
      this.nickname = '';
    },
  },
  persist : true
});