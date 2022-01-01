import { Button, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router";
import PageContainer from "../components/PageContainer";
import { errorToast } from "../utils/toast";
import useStore from "../store/store";

function Register() {
	const [data, setData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const setUser = useStore((state) => state.setUser);
	const navigate = useNavigate();
	const toast = useToast();

	const handleSubmit = async () => {
		if (data.email === "" || data.password === "") {
			toast(errorToast("All fields are required"));
			return;
		} else if (data.password !== data.confirmPassword) {
			toast(errorToast("Passwords do not match"));
			return;
		}

		const { user, error } = await supabase.auth.signUp({ email: data.email, password: data.password });

		if (error) toast(errorToast(error.message));
		else {
			await supabase.from("users").insert({ uid: user?.id });
			setUser({ uid: user!.id, role: "user" });
			navigate("/");
		}
	};

	return (
		<PageContainer>
			<Stack justify="center" mx="auto" spacing="4" textAlign="center">
				<Text fontSize="1.5rem" fontWeight="600">
					Register
				</Text>
				<Input value={data.email} placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
				<Input
					type="password"
					value={data.password}
					placeholder="Password"
					onChange={(e) => setData({ ...data, password: e.target.value })}
				/>
				<Input
					type="password"
					value={data.confirmPassword}
					placeholder="Confirm Password"
					onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
				/>
				<Button mt="4" onClick={handleSubmit}>
					Register
				</Button>
			</Stack>
		</PageContainer>
	);
}

export default Register;
