import Image from 'next/image';
import Link from 'next/link';
import NavItems from './NavItems';

const Header = () => {
	return <nav className='header'>
		<Link href='/'>
			<div className='flex items-center gap-2.5 cursor-pointer'>
				<Image className='object-contain' src='/images/logo.svg' alt='Learn Master' width={46} height={46} />
			</div>
		</Link>

		<div className='flex items-center gap-8'>
			<NavItems />
			<Link href='/sign-in'>Sign In</Link>
		</div>
	</nav>
}
export default Header;