'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
//import { useForm } from 'react-hook-form';

export default function ContactForm() {
	const [fullname, setFullname] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [errors, setErrors] = useState([]);
	// const {
	// 	register,
	// 	trigger,
	// 	formState: { errors },
	// } = useForm();

	// const onSubmit = async (e) => {
	// 	const isValid = await trigger();
	// 	if (!isValid) {
	// 		e.preventDefault();
	// 	}
	// 	e.target.reset();
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log('full name..', fullname);
		console.log('email..', email);
		console.log('message..', message);

		const res = await fetch('api/contact', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				fullname,
				email,
				message,
			}),
		});

		const { msg } = await res.json();
		setErrors(msg);
		console.log(errors);
	};

	return (
		<section
			id="contact"
			className="pb-48 pt-24 flex flex-col justify-center items-center"
		>
			{/* HEADINGS */}
			<motion.div
				className="flex justify justify-center w-full"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: '0.5' }}
				transition={{ duration: 0.5 }}
				variants={{
					hidden: { opacity: 0, y: -50 },
					visible: { opacity: 1, y: 0 },
				}}
			>
				<div>
					<p className="font-playfair font-semibold text-4xl py-20">
						<span className="text-yellow">CONTACT EM</span> TO GET STARTED
					</p>
				</div>
			</motion.div>

			{/* FORM & IMAGE */}
			<div className="md:flex md:justify-between items-center mt-5">
				<motion.div
					className="basis-1/3 flex justify-center"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: '0.5' }}
					transition={{ duration: 0.5 }}
					variants={{
						hidden: { opacity: 0, y: 50 },
						visible: { opacity: 1, y: 0 },
					}}
				>
					<img
						src="/contactimg.png"
						alt="contact_img"
						className="h-[50%]"
					/>
				</motion.div>

				<motion.div
					className="mt-10 md:mt-0"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: '0.5' }}
					transition={{ delay: 0.2, duration: 0.5 }}
					variants={{
						hidden: { opacity: 0, y: 50 },
						visible: { opacity: 1, y: 0 },
					}}
				>
					<form
						// target="_blank"
						// onSubmit={onSubmit}
						// action="https://formsubmit.co/87562abeddf3230716a9674e4f283977"
						// method="POST"
						onSubmit={handleSubmit}
					>
						<div>
							<label htmlFor="fullname" className="text-2xl font-bold">
								Your full name:
							</label>
							<input
								onChange={(e) => setFullname(e.target.value)}
								value={fullname}
								className="w-full bg-indigo-100 font-semibold placeholder-opaque-black p-3 mb-4 outline-red-300"
								type="text"
								placeholder="your fullname..."
								id="fullname"
								// {...register('email', {
								// 	required: true,
								// 	maxLength: 100,
								// })}
							/>
							{errors.email && (
								<p className="mt-1 text-red-700">
									{errors.email.type === 'required' &&
										'The filed is required.'}
									{errors.email.type === 'maxLength' &&
										'Max length is 100 char.'}
								</p>
							)}
						</div>
						<div>
							<label htmlFor="email" className="text-2xl font-bold">
								Your email:
							</label>
							<input
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								className="w-full bg-indigo-100 font-semibold placeholder-opaque-black p-2 mb-4 outline-red-300"
								type="email"
								placeholder="your email..."
								id="email"
								// {...register('email', {
								// 	required: true,
								// 	pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								// })}
							/>
							{errors.email && (
								<p className="mt-1 text-red-700">
									{errors.email.type === 'required' &&
										'The filed is required.'}
									{errors.email.type === 'pattern' &&
										'Invalid email address.'}
								</p>
							)}
						</div>
						<div>
							<label htmlFor="message" className="text-2xl font-bold">
								Your message:
							</label>
							<textarea
								id="message"
								onChange={(e) => setMessage(e.target.value)}
								value={message}
								className="w-full bg-indigo-100 font-semibold
							placeholder-opaque-black p-2 outline-red-300
							transition duration-100"
								type="text"
								placeholder="your message..."
								rows="4"
								cols="50"
								// {...register('message', {
								// 	required: true,
								// 	maxLength: 2000,
								// })}
							/>
						</div>
						{errors.message && (
							<p className="mt-1 text-red">
								{errors.message.type === 'required' &&
									'The filed is required.'}
								{errors.message.type === 'maxLength' &&
									'Max length is 2000 char.'}
							</p>
						)}

						<button
							type="submit"
							className="flex bg-slate-950 text-white p-2 rounded-md md:text-xl"
						>
							SEND ME A MESSAGE
						</button>
					</form>
				</motion.div>
			</div>
		</section>
	);
}
