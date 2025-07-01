import CompanionCard from '@/components/CompanionCard';
import CompanionsList from '@/components/CompanionsList';
import Cta from '@/components/CTA';
import { recentSessions } from '@/constants';

const Home = () => {
	return <main>
		<h1>Popular Companions</h1>

		<section className='home-section'>
			<CompanionCard
				id="121"
				name="Neura the Brainy Explorer"
				topic="Neural Network of the Brain"
				subject="science"
				duration={45}
				color="#E5D0FF"
			/>
			<CompanionCard
				id="124"
				name="Countsy the Number Wizard"
				topic="Derivatives & Integrals"
				subject="maths"
				duration={30}
				color="#FFDA6E"
			/>
			<CompanionCard
				id="126"
				name="Verba the Vocabulary Builder"
				topic="English Literature"
				subject="language"
				duration={35}
				color="#BDE7FF"
			/>
		</section>

		<section className='home-section'>
			<CompanionsList
				title='Recently Completed Sessions'
				companions={recentSessions}
				className='w-2/3 max-lg:w-full'
			/>

			<Cta />
		</section>
	</main>
}
export default Home;