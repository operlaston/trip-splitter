import { create } from 'zustand'

const useTrip = create((set) => ({
  isCreatingTransaction: false,
  setIsCreatingTransaction: (val) => set({ isCreatingTransaction: val })
}))

export default useTrip
