import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
	return <nav className='navbar'>
		<Link href='/'>
			<div className='flex items-center gap-2.5 cursor-pointer'>
				<Image className='object-contain' src='/images/logo.svg' alt='Learn Master' width={46} height={46} />
			</div>
		</Link>

		<div className='flex items-center gap-8'>
			<Link href='/'>Home</Link>
			<Link href='/'>Companions</Link>
			<Link href='/'>My Journey</Link>
			<Link href='/'>Sign In</Link>
		</div>
	</nav>
}
export default Navbar;