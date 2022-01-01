import { Container, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { supabase } from "./services/supabase";
import useStore from "./store/store";

function App() {
	const setSession = useStore((state) => state.setSession);
	const user = useStore((state) => state.user);
	const session = useStore((state) => state.session);

	useEffect(() => {
		setSession(supabase.auth.session());

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<Container height="100vh">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</Container>
	);
}

export default App;
