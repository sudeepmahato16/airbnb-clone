import { create } from "zustand";

interface ConfirmDeleteStore {
  openId: string;
  onOpen: (val: string) => void;
  onClose: () => void;
}

const useConfirmDelete = create<ConfirmDeleteStore>((set) => ({
  openId: "",
  onOpen: (val) => set({ openId: val }),
  onClose: () => set({ openId: "" }),
}));

export default useConfirmDelete;
