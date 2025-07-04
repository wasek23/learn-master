import { getAllCompanions } from '@/lib/actions/companion.actions';
import CompanionCard from '@/components/CompanionCard';
import { getSubjectColor } from '@/lib/utils';
import SearchInput from '@/components/SearchInput';
import SubjectFilter from '@/components/SubjectFilter';

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
	const filters = await searchParams;
	const subject = filters.subject ? filters.subject : '';
	const topic = filters.topic ? filters.topic : '';

	const companions = await getAllCompanions({ subject, topic });

	return <main>
		<section className='flex flex-col justify-between gap-4'>
			<div className='flex justify-between flex-wrap gap-5'>
				<h1>Companion Library</h1>

				<div className='flex gap-4'>
					<SearchInput />
					<SubjectFilter />
				</div>
			</div>

			<section className='companions-grid'>
				{companions.map((companion) => <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} />)}
			</section>
		</section>
	</main>
}
export default CompanionsLibrary;