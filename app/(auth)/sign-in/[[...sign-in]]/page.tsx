import { SignIn } from '@clerk/nextjs';

const AuthSignIn = () => {
	return <main className='flex items-center justify-center'>
		<SignIn />
	</main>
}
export default AuthSignIn;