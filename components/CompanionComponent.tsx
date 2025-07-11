'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

import { cn, configureAssistant, getSubjectColor } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';
import soundwaves from '@/constants/soundwaves.json';
import { addToSessionHistory } from '@/lib/actions/companion.actions';

enum CallStatus {
	INACTIVE = 'INACTIVE',
	CONNECTING = 'CONNECTING',
	ACTIVE = 'ACTIVE',
	FINISHED = 'FINISHED'
}

const CompanionComponent = ({ name, style, subject, topic, voice, companionId, userName, userImage }: CompanionComponentProps) => {
	const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [messages, setMessages] = useState<SavedMessage[]>([]);

	const lottieRef = useRef<LottieRefCurrentProps>(null);

	useEffect(() => {
		const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
		const onCallEnd = () => {
			setCallStatus(CallStatus.FINISHED);
			addToSessionHistory(companionId)
		}

		const onSpeechStart = () => setIsSpeaking(true);
		const onSpeechEnd = () => setIsSpeaking(false);

		const onMessage = (message: Message) => {
			if ('transcript' === message.type && 'final' === message.transcriptType) {
				const newMessage = { role: message.role, content: message.transcript }

				setMessages(prev => [newMessage, ...prev]);
			}
		}

		// eslint-disable-next-line no-console
		const onError = (error: Error) => console.error(error);

		vapi.on('call-start', onCallStart);
		vapi.on('call-end', onCallEnd);
		vapi.on('speech-start', onSpeechStart);
		vapi.on('speech-end', onSpeechEnd);
		vapi.on('message', onMessage);
		vapi.on('error', onError);

		return () => {
			vapi.off('call-start', onCallStart);
			vapi.off('call-end', onCallEnd);
			vapi.off('speech-start', onSpeechStart);
			vapi.off('speech-end', onSpeechEnd);
			vapi.off('message', onMessage);
			vapi.off('error', onError);
		}
	}, []);

	useEffect(() => {
		if (lottieRef) {
			if (isSpeaking) {
				lottieRef.current?.play();
			} else {
				lottieRef.current?.stop();
			}
		}
	}, [isSpeaking, lottieRef]);

	const onToggleMicrophone = () => {
		const isMuted = vapi.isMuted();

		vapi.setMuted(!isMuted);
		setIsMuted(!isMuted);
	}

	const handleCall = async () => {
		setCallStatus(CallStatus.CONNECTING);

		const assistantOverrides = {
			variableValues: {
				subject, topic, style
			},
			clientMessages: ['transcript'],
			serverMessages: []
		}

		// @ts-expect-error vapi.start may have incompatible types with configureAssistant output
		vapi.start(configureAssistant(voice, style), assistantOverrides);
	}

	const handleDisconnect = () => {
		setCallStatus(CallStatus.FINISHED);

		vapi.stop();
	}

	return <section className='h-[70vh] flex flex-col'>
		<section className='flex gap-8 max-sm:flex-col'>
			<div className='companion-section'>
				<div className='companion-avatar' style={{ backgroundColor: getSubjectColor(subject) }}>
					<div className={cn(
						'absolute transition-opacity duration-1000',
						CallStatus.FINISHED === callStatus || CallStatus.INACTIVE === callStatus ? 'opacity-100' : 'opacity-0',
						CallStatus.CONNECTING === callStatus && 'opacity-100 animate-pulse'
					)}>
						<Image src={`/icons/${subject}.svg`} alt={subject} width={150} height={150} className='max-sm:w-fit' />
					</div>

					<div className={cn(
						'absolute transition-opacity duration-1000',
						CallStatus.ACTIVE === callStatus ? 'opacity-100' : 'opacity-0'
					)}>
						<Lottie lottieRef={lottieRef} animationData={soundwaves} autoplay={false} className='companion-lottie' />
					</div>
				</div>

				<p className='font-bold text-2xl'>{name}</p>
			</div>

			<div className='user-section'>
				<div className='user-avatar'>
					<Image src={userImage} alt={userName} width={130} height={130} className='rounded-lg' />

					<p className='font-bold text-2xl text-center'>{userName}</p>
				</div>

				<button className='btn-mic' onClick={onToggleMicrophone} disabled={CallStatus.ACTIVE !== callStatus}>
					<Image src={isMuted ? `/icons/mic-off.svg` : '/icons/mic-on.svg'} alt={`Mic ${isMuted ? 'Off' : 'On'}`} width={36} height={36} />

					<p className='max-sm:hidden'>{isMuted ? 'Turn on microphone' : 'Turn off microphone'}</p>
				</button>

				<button className={cn(
					'rounded-lg py-2 cursor-pointer transition-colors w-full text-white',
					CallStatus.ACTIVE === callStatus ? 'bg-red-700' : 'bg-primary',
					CallStatus.CONNECTING === callStatus && 'animate-pulse'
				)} onClick={CallStatus.ACTIVE === callStatus ? handleDisconnect : handleCall}>
					{CallStatus.ACTIVE === callStatus ? 'End Session' : (CallStatus.CONNECTING === callStatus ? 'Connecting' : 'Start Session')}
				</button>
			</div>
		</section>

		<section className='transcript'>
			<div className='transcript-message no-scrollbar'>
				{messages.map((message, index) => {
					const { role, content } = message;

					return 'assistant' === role ?
						<p key={index} className='max-sm:text-sm'>
							<span className='font-semibold'>{name?.split(' ')[0]?.replace('/[.,]/g', '')}</span>: {content}
						</p> :
						<p key={index} className='text-primary max-sm:text-sm'>
							<span className='font-semibold'>{userName}</span>: {content}
						</p>
				})}
			</div>

			<div className='transcript-fade' />
		</section>
	</section>
}
export default CompanionComponent;