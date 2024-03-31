import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import Header from "@/components/home/Header";

export default function Home() {
	return (
		<div>
			<Header />
			{/* <LoginForm /> */}
			<RegisterForm />
		</div>
	);
}
