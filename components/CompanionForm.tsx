'use client';

import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { subjects } from '@/constants';
import { createCompanion } from '@/lib/actions/companion.actions';

const formSchema = z.object({
	name: z.string().min(1, { message: 'Companion is required.' }),
	subject: z.string().min(1, { message: 'Subject is required.' }),
	topic: z.string().min(1, { message: 'Topic is required.' }),
	voice: z.string().min(1, { message: 'Voice is required.' }),
	style: z.string().min(1, { message: 'Style is required.' }),
	duration: z.coerce.number().min(1, { message: 'Duration is required.' })
})

const CompanionForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			subject: '',
			topic: '',
			voice: '',
			style: '',
			duration: 15
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const companion = await createCompanion(values);

		if (companion) {
			redirect(`/companions/${companion.id}`);
		} else {
			// eslint-disable-next-line no-console
			console.error('Failed to create companion');
			redirect('/');
		}
	}

	return <Form {...form}>
		<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
			<FormField
				control={form.control}
				name='name'
				render={({ field }) => <FormItem>
					<FormLabel>Companion Name</FormLabel>

					<FormControl>
						<Input className='input' placeholder='Enter the companion name' {...field} />
					</FormControl>

					<FormMessage />
				</FormItem>}
			/>

			<FormField
				control={form.control}
				name='subject'
				render={({ field }) => <FormItem>
					<FormLabel>Subject</FormLabel>

					<FormControl>
						<Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
							<SelectTrigger className='input capitalize'>
								<SelectValue placeholder='Select the subject' />
							</SelectTrigger>

							<SelectContent>
								{subjects.map(subject => <SelectItem key={subject} value={subject} className='capitalize'>{subject}</SelectItem>)}
							</SelectContent>
						</Select>
					</FormControl>

					<FormMessage />
				</FormItem>}
			/>

			<FormField
				control={form.control}
				name='topic'
				render={({ field }) => <FormItem>
					<FormLabel>What should the companion help with?</FormLabel>

					<FormControl>
						<Textarea className='input' placeholder='Ex: Derivatives & Integrals' {...field} />
					</FormControl>

					<FormMessage />
				</FormItem>}
			/>

			<FormField
				control={form.control}
				name='voice'
				render={({ field }) => <FormItem>
					<FormLabel>Voice</FormLabel>

					<FormControl>
						<Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
							<SelectTrigger className='input'>
								<SelectValue placeholder='Select the voice' />
							</SelectTrigger>

							<SelectContent>
								<SelectItem value='male'>Male</SelectItem>
								<SelectItem value='female'>Female</SelectItem>
							</SelectContent>
						</Select>
					</FormControl>

					<FormMessage />
				</FormItem>}
			/>

			<FormField
				control={form.control}
				name='style'
				render={({ field }) => <FormItem>
					<FormLabel>Style</FormLabel>

					<FormControl>
						<Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
							<SelectTrigger className='input'>
								<SelectValue placeholder='Select the style' />
							</SelectTrigger>

							<SelectContent>
								<SelectItem value='formal'>Formal</SelectItem>
								<SelectItem value='casual'>Casual</SelectItem>
							</SelectContent>
						</Select>
					</FormControl>

					<FormMessage />
				</FormItem>}
			/>

			<FormField
				control={form.control}
				name='duration'
				render={({ field }) => <FormItem>
					<FormLabel>Estimated session duration in minutes</FormLabel>

					<FormControl>
						<Input className='input' type='number' placeholder='15' {...field} />
					</FormControl>

					<FormMessage />
				</FormItem>}
			/>

			<Button type='submit' className='w-full cursor-pointer'>Build Your Companion</Button>
		</form>
	</Form>
}
export default CompanionForm;