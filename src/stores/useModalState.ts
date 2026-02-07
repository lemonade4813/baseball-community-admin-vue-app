import { defineStore } from 'pinia';

export interface IModalState {
  isOpen: boolean;
  message: string;
  callback?: () => void;
}

const initialState: IModalState = {
  isOpen: false,
  message: '',
  callback: () => {},
};

export const useModalState = defineStore('modalState', {
  state: (): IModalState => ({ ...initialState }),

  actions: {
    openModal(message: string, callback?: () => void) {
      this.isOpen = true;
      this.message = message;
      this.callback = callback;
    },
    closeModal() {
      Object.assign(this, initialState);
    },
  },
});
