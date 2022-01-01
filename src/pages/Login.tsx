import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Stack, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import PageContainer from "../components/PageContainer";
import { supabase } from "../services/supabase";
import useStore from "../store/store";
import { UserData } from "../store/userStore";
import { errorToast } from "../utils/toast";

function Login() {
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const setUser = useStore((state) => state.setUser);
	const navigate = useNavigate();
	const toast = useToast();

	const handleSubmit = async () => {
		if (data.email === "" || data.password === "") {
			toast(errorToast("All fields are required"));
			return;
		}

		const { user, error } = await supabase.auth.signIn({ email: data.email, password: data.password });

		if (error) toast(errorToast(error.message));
		else {
			const { data: datum } = await supabase.from<UserData>("users").select("*").eq("uid", user!.id);
			if (datum && datum.length > 0) setUser(datum[0]);
			navigate("/");
		}
	};

	return (
		<PageContainer>
			<Stack textAlign="center" spacing="4" mx="auto">
				<Text fontSize="1.5rem" fontWeight="600">
					Login
				</Text>
				<Input value={data.email} placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
				<Input
					type="password"
					value={data.password}
					placeholder="Password"
					onChange={(e) => setData({ ...data, password: e.target.value })}
				/>
				<Button onClick={handleSubmit}>Login</Button>
			</Stack>
		</PageContainer>
	);
}

export default Login;
