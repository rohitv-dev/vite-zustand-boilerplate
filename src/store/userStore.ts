import { Session } from "@supabase/gotrue-js";
import { GetState, SetState } from "zustand";
import { Store } from "./store";

export interface UserData {
	uid: string;
	role: string;
}

export interface UserStore {
	user: UserData;
	session: Session | null;
	setSession(session: Session | null): void;
	setUser(user: UserData): void;
}

const userStore = (set: SetState<Store>, get: GetState<Store>): UserStore => ({
	user: { uid: "", role: "" },
	session: null,
	setSession(session) {
		set({ session });
	},
	setUser(user) {
		set({ user });
	},
});

export default userStore;
