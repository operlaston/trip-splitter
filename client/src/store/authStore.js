import { create } from 'zustand'

const useAuth = create((set) => ({
  isSignup: false,
  setLogin: () => set({ isSignup: false }),
  setSignup: () => set({ isSignup: true })
}))

export default useAuth
