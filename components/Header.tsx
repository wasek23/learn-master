import Image from 'next/image';
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton, } from '@clerk/nextjs';

import NavItems from './NavItems';

const Header = () => {
	return <nav className='header'>
		<Link href='/' className='flex items-center gap-2.5 cursor-pointer'>
			<Image className='object-contain' src='/images/logo.svg' alt='Learn Master' width={46} height={46} />
		</Link>

		<div className='flex items-center gap-8'>
			<NavItems />

			<SignedOut>
				<SignInButton>
					<button className='btn-signin'>Sign In</button>
				</SignInButton>
			</SignedOut>

			<SignedIn>
				<UserButton afterSignOutUrl='/' />
			</SignedIn>
		</div>
	</nav>
}
export default Header;