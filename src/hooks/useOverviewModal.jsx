import { create } from 'zustand'

export const useOverviewModal = create((set) => ({
	isOpen: false,
	onOpen: () => set(() => ({ isOpen: true })),
	onClose: () => set(() => ({ isOpen: false })),
	toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))
