import CompanionCard from '@/components/CompanionCard';
import CompanionsList from '@/components/CompanionsList';
import Cta from '@/components/CTA';
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';

const Home = async () => {
	const companions = await getAllCompanions({ limit: 3 });
	const recentSessionsCompanions = await getRecentSessions(10);

	return <main>
		<h1>Popular Companions</h1>

		<section className='home-section'>
			{companions.map(companion => <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} />)}
		</section>

		<section className='home-section'>
			<CompanionsList
				title='Recently Completed Sessions'
				companions={recentSessionsCompanions}
				className='w-2/3 max-lg:w-full'
			/>

			<Cta />
		</section>
	</main>
}
export default Home;