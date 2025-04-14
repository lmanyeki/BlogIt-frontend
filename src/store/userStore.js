import { create } from "zustand";
import { persist } from "zustand/middleware";

function userStore(set) {
    return {
        user: null,

        setUserInformation: (userObj) => {
            set({ user: userObj });
        },
        removeUserInformation: () => {
            set({ user: null });
        },
    };
}

const useUserStore = create(persist(userStore, { name:
    "user-info"
}));
export default useUserStore;