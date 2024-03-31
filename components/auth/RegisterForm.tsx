import Link from "next/link";

function RegisterForm() {
	return (
		<div className="flex gap-x-4 items-center w-full justify-center h-screen px-4 md:px-6 text-sm">
			<div className="w-full h-screen overflow-hidden hidden md:block py-[70px]">
				<img src="./images/register_img.png" className="w-full object-contain h-full" alt="" />
			</div>
			<form className="md:w-full sm:w-[500px] w-full">
				<h2 className="text-neutral-900 text-3xl font-bold mb-2">Create New Account</h2>
				<h2 className="text-zinc-400 text-base font-normal mb-4">Please enter details</h2>
				<div className="flex-row gap-x-4 xl:w-[550px]">
					<div className="flex items-center gap-x-4">
						<div className="mb-4">
							<label className="block mb-2" htmlFor="firstName">
								First Name
							</label>
							<input id="firstName" required type="text" placeholder="Robert" className="h-14 px-4 pt-4 pb-[17px] rounded-[10px] border border-neutral-900" />
						</div>
						<div className="mb-4 flex-1">
							<label className="block mb-2" htmlFor="lastName">
								Last Name
							</label>
							<input id="lastName" required type="text" placeholder="Fox" className="h-14 px-4 pt-4 pb-[17px] rounded-[10px] w-full border border-neutral-900" />
						</div>
					</div>
					<div className="mb-4">
						<label className="block mb-2" htmlFor="email">
							Email Address
						</label>
						<input id="email" required type="text" placeholder="example@gmail.com" className="w-full h-14 px-4 pt-4 pb-[17px] rounded-[10px] border border-neutral-900" />
					</div>
					<div className="mb-6">
						<label className="block mb-2" htmlFor="password">
							Pasword
						</label>
						<input id="password" required type="text" placeholder="*****************" className="w-full h-14 px-4 pt-4 pb-[17px] rounded-[10px] border border-neutral-900" />
					</div>
					<div className="flex gap-x-2 items-center mb-4">
						<input type="checkbox" id="checkbox" className="w-5 h-4" />
						<label htmlFor="checkbox">
							I agree to the <strong>Terms & Conditions</strong>
						</label>
					</div>
					<p className="float-right underline cursor-pointer mb-4">Forgot Password?</p>
					<button type="submit" className="bg-black text-white w-full rounded-[10px] py-5 mb-4">
						Login
					</button>
				</div>
				<div className="flex justify-center gap-x-2">
					<p>You don't have account?</p>
					<Link className="font-bold" href="/register">
						Register
					</Link>
				</div>
			</form>
		</div>
	);
}

export default RegisterForm;
