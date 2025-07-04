'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { subjects } from '@/constants';

const SubjectFilter = () => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const debounce = setTimeout(() => {
			if (searchQuery) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: 'subject',
					value: searchQuery
				});

				router.push(newUrl, { scroll: false });
			} else {
				if ('/companions' === pathname) {
					const newUrl = removeKeysFromUrlQuery({
						params: searchParams.toString(),
						keysToRemove: ['subject']
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

	return <Select value={searchQuery} onValueChange={val => setSearchQuery(val === 'all' ? '' : val)} defaultValue={searchQuery}>
		<SelectTrigger className='input capitalize px-4 py-5 border border-black rounded-lg'>
			<SelectValue placeholder='Select Subject' />
		</SelectTrigger>

		<SelectContent>
			<SelectItem value='all' className='capitalize'>All</SelectItem>

			{subjects.map(subject => (
				<SelectItem key={subject} value={subject} className='capitalize'>
					{subject}
				</SelectItem>
			))}
		</SelectContent>
	</Select>
}
export default SubjectFilter;