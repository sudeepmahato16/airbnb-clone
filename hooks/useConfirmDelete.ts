import { create } from "zustand";

interface ConfirmDeleteStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useConfirmDelete = create<ConfirmDeleteStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useConfirmDelete;
