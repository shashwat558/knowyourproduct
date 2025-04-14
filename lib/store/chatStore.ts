
import { create } from "zustand";

export type ChatStoreType = {
    sessionId: string | null,
    setSessionId: (id: string) => void
}

export const useChatStore = create<ChatStoreType>((set) => ({
    sessionId: null,
    setSessionId: (id) => set({sessionId: id})
}))