import CompanionsList from '@/components/CompanionsList';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from '@/components/ui/accordion';
import { getUserCompanions, getUserSessions } from '@/lib/actions/companion.actions';

import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const MyJourney = async () => {
	const user = await currentUser();

	if (!user) redirect('/sign-in');

	const companions = await getUserCompanions(user.id);
	const sessionHistory = await getUserSessions(user.id);

	return <main className='min-lg:w-3/4'>
		<section className='flex items-center justify-between gap-4 max-sm:flex-col'>
			<div className='flex items-center gap-4'>
				<Image src={user.imageUrl} alt={`${user.firstName!} ${user.lastName!}`} width={110} height={110} />

				<div className='flex flex-col gap-2'>
					<h1 className='font-bold text-2xl'>{user.firstName} {user.lastName}</h1>

					<p className='text-sm text-muted-foreground'>{user.emailAddresses[0].emailAddress}</p>
				</div>
			</div>

			<div className='flex gap-4'>
				<div className='h-fit flex flex-col gap-2 p-3 border border-black rounded-lg'>
					<div className='flex items-center gap-2'>
						<Image src='/icons/check.svg' alt='checkmark' width={22} height={22} />

						<p className='text-2xl font-bold'>{sessionHistory.length}</p>
					</div>

					<div>Lessons Completed</div>
				</div>

				<div className='h-fit flex flex-col gap-2 p-3 border border-black rounded-lg'>
					<div className='flex items-center gap-2'>
						<Image src='/icons/cap.svg' alt='cap' width={22} height={22} />

						<p className='text-2xl font-bold'>{sessionHistory.length}</p>
					</div>

					<div>Companions Created</div>
				</div>
			</div>
		</section>

		<Accordion type='multiple'>
			<AccordionItem value='recent'>
				<AccordionTrigger className='text-2xl font-bold'>Recent Sessions</AccordionTrigger>
				<AccordionContent>
					<CompanionsList title='Recent Sessions' companions={sessionHistory} />
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value='companions'>
				<AccordionTrigger className='text-2xl font-bold'>My Companions ({companions.length})</AccordionTrigger>
				<AccordionContent>
					<CompanionsList title='My Companions' companions={companions} />
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	</main>
}
export default MyJourney;