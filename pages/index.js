import HeroBanner from '@/components/HeroBanner';
import ProductCard from '@/components/ProductCard';
import Wrapper from '@/components/Wrapper';
import { fetchDataFromApi } from '@/utils/api';
//import React, { useEffect, useState } from 'react';

const Home = ({ products }) => {
	// const [data, setData] = useState(null);

	// useEffect(() => {
	// 	fetchProducts();
	// }, []);

	// const fetchProducts = async () => {
	// 	const { data } = await fetchDataFromApi('/api/products');
	// 	setData(data);
	// };
	return (
		<main>
			<HeroBanner />
			{/* <h1>{products?.data?.[0]?.attributes?.name}</h1> */}
			<Wrapper>
				{/* heading and paragraph section start */}
				<div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
					<div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
						Best and quality stuffs
					</div>
					<div className="text-md md:text-xl">
						The most popular Nike shoes vary depending on the season and
						trends, but some of the all-time favorites include the Air
						Force 1, Air Max 90, and the classic Cortez.
					</div>
				</div>
				{/* heading and paragraph section end */}

				{/* product grid section start */}
				<div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14
				px-5 md:px-0"
				>
					{products?.data?.map((product) => (
						<ProductCard key={product.id} data={product} />
					))}
					{/* <ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard /> */}
				</div>
				{/* product grid section end */}
			</Wrapper>
		</main>
	);
};
// SSR (SERVER SIDE RENDERING fetching method)
export async function getStaticProps() {
	const products = await fetchDataFromApi('/api/products?populate=*');
	return {
		props: { products },
	};
}

export default Home;
