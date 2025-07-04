import { getCompanion } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

interface CompanionSessionPageProps {
	params: Promise<{ id: string }>
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
	const { id } = await params;

	const companion = await getCompanion(id);
	const user = await currentUser();

	if (!user) redirect('/sign-in');

	if (!companion) redirect('/companions');

	const { author, created_at, duration, name, style, subject, topic, voice } = companion;

	return <main>
		<article className='flex justify-between max-md:flex-col p-6 rounded-border'>
			<div className='flex items-center gap-2'>
				<div className='size-[72px] flex items-center justify-center rounded-lg max-md:hidden' style={{ backgroundColor: getSubjectColor(subject) }}>
					<Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} />
				</div>

				<div className='flex flex-col gap-2'>
					<div className='flex items-center gap-2'>
						<p className='font-bold text-2xl'>{name}</p>

						<div className='subject-badge max-sm:hidden'>{subject}</div>
					</div>

					<p className='text-lg'>{topic}</p>
				</div>
			</div>

			<div className='items-start text-2xl max-md:hidden'>
				{duration} minutes
			</div>
		</article>
	</main>
}
export default CompanionSession;