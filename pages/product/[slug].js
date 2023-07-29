import React, { useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import Wrapper from '@/components/Wrapper';
import ProductDetailsCarousel from '@/components/ProductDetailsCarousel';
import { fetchDataFromApi } from '@/utils/api';
import RelatedProducts from '@/components/RelatedProducts';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/cartSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = ({ product, products }) => {
	const [selectedSize, setSelectedSize] = useState();
	const [showError, setShowError] = useState(false);
	const dispatch = useDispatch();
	const p = product?.data?.[0]?.attributes;

	//Notification of product added or not added to the cart
	//https://www.npmjs.com/package/react-toastify
	//https://fkhadra.github.io/react-toastify/introduction/
	const notify = () => {
		toast.success('🦄 Success. Check your cart!', {
			position: 'bottom-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
		});
	};

	return (
		<div className="w-full md:py-20">
			{/* dinamic success notification */}
			<ToastContainer />
			<Wrapper>
				<div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
					{/* left column start */}
					<div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
						<ProductDetailsCarousel images={p.image.data} />
					</div>
					{/* left column end */}

					{/* right column start */}
					<div className="flex-[1] py-3">
						{/* PRODUCT TITLE */}
						<div className="text-[34px] font-semibold mb-2 leading-tight">
							{p.name}
						</div>

						{/* PRODUCT SUBTITLE */}
						<div className="text-lg font-semibold mb-5">{p.subtitle}</div>

						{/* PRODUCT PRICE START IN PRODUCT PAGE*/}
						<div className="flex items-center text-black/[0.5]">
							<p className="mr-2 text-lg font-semibold">
								&#36;{p.price}
							</p>
							{/* original price calculation */}
							{p.original_price && (
								<>
									<p className="text-base font-medium line-through">
										&#36;{p.original_price}
									</p>
									<p className="ml-auto text-base font-medium text-green-500">
										{(
											((p.original_price - p.price) /
												p.original_price) *
											100
										).toFixed(2)}
										% off
									</p>
								</>
							)}
						</div>
						<div className="text-md font-medium text-black/[0.5]">
							incl. of taxes
						</div>
						<div className="text-md font-medium text-black/[0.5] mb-20">
							{`(Also includes all applicable duties)`}
						</div>
						{/* PRODUCT PRICE END IN PRODUCT PAGE*/}

						{/* PRODUCT SIZE RANGE START */}
						<div className="mb-10">
							{/* SIZE HEADING START */}
							<div className="flex justify-between mb-2">
								<div className="text-md font-semibold">Select size</div>
								<div className="text-md font-medium text-black/[0.5] cursor-pointer">
									Select Guide
								</div>
							</div>
							{/* SIZE HEADING END */}

							{/* SIZE START */}
							<div id="sizeGrid" className="grid grid-cols-3 gap-2">
								{p.size.data.map((item, i) => (
									<div
										key={i}
										className={`border rounded-md text-center py-3
										font-medium ${
											item.enabled
												? 'hover:border-black cursor-pointer'
												: 'cursor-not-allowed bg-black/[0.1] opacity-50'
										} ${
											selectedSize === item.size
												? 'border-black'
												: ''
										}`}
										onClick={() => {
											setSelectedSize(item.size);
											setShowError(false);
										}}
									>
										{item.size}
									</div>
								))}
							</div>
							{/* SIZE END */}

							{/* SHOW ERROR START */}
							{showError && (
								<div className="text-red-600 mt-1">
									Size selection is required
								</div>
							)}
							{/* SHOW ERROR END */}
						</div>
						{/* PRODUCT SIZE RANGE END */}

						{/* ADD TO CART BUTTON START */}
						<button
							className="w-full py-4 rounded-full cursor-pointer bg-black text-white text-lg
							font-medium text-center transition-transform active:scale-95 mb-3
							hover:opacity-75"
							onClick={() => {
								if (!selectedSize) {
									setShowError(true);
									document.getElementById('sizeGrid').scrollIntoView({
										block: 'center',
										behavior: 'smooth',
									});
								} else {
									//DISPATCH REDUX STORE
									dispatch(
										addToCart({
											...product?.data?.[0],
											selectedSize,
											oneQuantityPrice: p.price,
										})
									);
									notify();
								}
							}}
						>
							Add to Cart
						</button>
						{/* ADD TO CART BUTTON END */}

						{/* WISHLIST BUTTON START */}
						<button
							type="button"
							className="w-full py-4 rounded-full border border-black text-lg font-medium
							transition-transform active:scale-95 flex items-center justify-center
							gap-2 mb-3 hover:opacity-75 cursor-pointer"
						>
							Whislist
							<IoMdHeartEmpty size={20} />
						</button>
						{/* WISHLIST BUTTON END */}

						<div>
							<div className="text-lg font-bold mb-5">
								Product etails
							</div>
							<div className="markdown text-md mb-5">
								<ReactMarkdown>{p.description}</ReactMarkdown>
							</div>
						</div>
					</div>
					{/* right column end */}
				</div>
				{/* RELATED PRODUCT PAGE START */}
				<RelatedProducts products={products} />
				{/* RELATED PRODUCT PAGE END */}
			</Wrapper>
		</div>
	);
};

export default ProductDetails;

// routing
export async function getStaticPaths() {
	const products = await fetchDataFromApi('/api/products?populate=*');
	const paths = products?.data?.map((p) => ({
		params: {
			slug: p.attributes.slug,
		},
	}));

	return {
		paths,
		fallback: false,
	};
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params: { slug } }) {
	const product = await fetchDataFromApi(
		`/api/products?populate=*&filters[slug][$eq]=${slug}`
	);
	const products = await fetchDataFromApi(
		`/api/products?populate=*&[filters][slug][$ne]=${slug}`
	);
	return {
		props: {
			product,
			products,
		},
	};
}
