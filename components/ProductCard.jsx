import { getDiscountedPricePercentage } from '@/utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({ data: { attributes: p, id } }) => {
	return (
		<Link
			//href="/product/1"
			href={`/product/${p.slug}`}
			className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
		>
			{/* <img src="/product-1.webp" alt="Product Image" /> */}
			<Image
				width={500}
				height={500}
				src={p.thumbnail.data.attributes.url}
				alt={p.name}
				className="w-[500px] h-[400px]"
			/>
			<div className="p-4 text-black/[0.9]">
				<h2 className="text-lg font-medium">{p.name}</h2>
				<div className="flex items-center text-black/[0.5]">
					<p className="mr-2 text-lg font-semibold">&#36;{p.price}</p>
					{/* original price calculation */}
					{p.original_price && (
						<>
							<p className="text-base font-medium line-through">
								&#36;{p.original_price}
							</p>
							<p className="ml-auto text-base font-medium text-green-500">
								{(
									((p.original_price - p.price) / p.original_price) *
									100
								).toFixed(2)}
								% off
							</p>
						</>
					)}
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
