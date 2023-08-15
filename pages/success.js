import React from 'react';
import Wrapper from '@/components/Wrapper';
import Link from 'next/link';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';

const Success = () => {
	return (
		<div className="min-h-[650px] flex items-center">
			<Wrapper>
				<div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
					<div className="text-2xl font-bold">
						Thanks for shopping with us!
					</div>
					<div className="text-lg font-bold mt-2 text-green-700">
						Your order has been placed successfully.
					</div>
					<div className="text-base mt-5">
						For any product related query, drop an email to
					</div>
					<div className="underline">hskdev@gmail.com</div>

					<Link href="/" className="font-bold mt-5 flex items-center">
						<BsFillArrowRightSquareFill className="mr-2 text-blue-700 transition duration-slow animate-ping" />
						<p className="font-bold mt-5 w-max p-2 bg-blue-700 text-white rounded-lg shadow-md">
							Continue Shopping
						</p>
					</Link>
				</div>
			</Wrapper>
		</div>
	);
};

export default Success;
