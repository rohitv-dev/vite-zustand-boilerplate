import create from "zustand";
import userStore, { UserStore } from "./userStore";

export interface Store extends UserStore {
	counter: number;

	increment(): void;
	decrement(): void;
}

const useStore = create<Store>((set, get) => ({
	counter: 0,

	...userStore(set, get),

	increment() {
		set({ counter: get().counter + 1 });
	},
	decrement() {
		set({ counter: get().counter - 1 });
	},
}));

export default useStore;
