import { Box, Button, Container, Flex, Stack, Text } from "@chakra-ui/react";
import useStore from "../store/store";

function Home() {
	const counter = useStore((state) => state.counter);
	const increment = useStore((state) => state.increment);
	const decrement = useStore((state) => state.decrement);

	return (
		<Container height="100vh">
			<Flex direction="column" align="center" justify="center" height="100%">
				<Text fontSize="1.5rem" fontWeight="600">
					{counter}
				</Text>
				<Stack direction="row" mt="4">
					<Button onClick={increment}>Increment</Button>
					<Button onClick={decrement}>Decrement</Button>
				</Stack>
			</Flex>
		</Container>
	);
}

export default Home;
