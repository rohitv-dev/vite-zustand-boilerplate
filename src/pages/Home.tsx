import useStore from "../store/store";

function Home() {
	const counter = useStore((state) => state.counter);
	const increment = useStore((state) => state.increment);
	const decrement = useStore((state) => state.decrement);

	return (
		<div className="App">
			<div className="counter">{counter}</div>
			<div>
				<button onClick={increment}>Increment</button>
				<button onClick={decrement}>Decrement</button>
			</div>
		</div>
	);
}

export default Home;
