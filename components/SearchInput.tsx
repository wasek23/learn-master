'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';

import { Input } from './ui/input';

const SearchInput = () => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const debounce = setTimeout(() => {
			if (searchQuery) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: 'topic',
					value: searchQuery
				});

				router.push(newUrl, { scroll: false });
			} else {
				if ('/companions' === pathname) {
					const newUrl = removeKeysFromUrlQuery({
						params: searchParams.toString(),
						keysToRemove: ['topic']
					});

					router.push(newUrl, { scroll: false });
				}
			}
		}, 500);

		return () => {
			if (debounce) {
				clearTimeout(debounce);
			}
		};
	}, [searchQuery, pathname, router, searchParams]);

	return <div className='min-w-[230px] h-fit relative flex items-center gap-2 px-3 py-0.5 border border-black rounded-lg'>
		<Image src='/icons/search.svg' alt='search' width={15} height={15} />

		<Input className='border-none outline-none shadow-none focus:shadow-none focus-visible:ring-0' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder='Search Companion...' />
	</div>
}
export default SearchInput;