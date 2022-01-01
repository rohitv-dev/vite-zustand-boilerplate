import { Box, Button, Container, Flex, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import useStore from "../store/store";

function Home() {
	const counter = useStore((state) => state.counter);
	const increment = useStore((state) => state.increment);
	const decrement = useStore((state) => state.decrement);

	const session = useStore((state) => state.session);
	const user = useStore((state) => state.user);

	const navigate = useNavigate();

	console.log(user);

	return (
		<Flex direction="column" align="center" justify="center" height="100%" textAlign="center">
			{/* <Text fontSize="1.5rem" fontWeight="600">
				{counter}
			</Text>
			<Stack direction="row" mt="4">
				<Button onClick={increment}>Increment</Button>
				<Button onClick={decrement}>Decrement</Button>
			</Stack> */}
			{!session && (
				<Stack mt="4">
					<Button onClick={() => navigate("/login")}>Login</Button>
					<Button onClick={() => navigate("/register")}>Register</Button>
				</Stack>
			)}
			{session && <Text mt="4">
				Currently logged in using {session?.user?.email} and role is {user.role}
			</Text>}
			{session && (
				<Button mt="4" onClick={() => supabase.auth.signOut()}>
					Logout
				</Button>
			)}
		</Flex>
	);
}

export default Home;
