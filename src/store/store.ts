import create from "zustand";

interface Store {
	counter: number;

	increment(): void;
	decrement(): void;
}

const useStore = create<Store>((set, get) => ({
	counter: 0,

	increment() {
		set({ counter: get().counter + 1 });
	},
	decrement() {
		set({ counter: get().counter - 1 });
	},
}));

export default useStore;
