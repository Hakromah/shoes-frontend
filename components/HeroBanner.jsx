import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { BiArrowBack } from 'react-icons/bi';
import { FiArrowRight } from 'react-icons/fi';

const HeroBanner = () => {
	return (
		<div className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto">
			{/* go to 'react-responsive-carousel' to customize the carousel */}
			<Carousel
				autoPlay={true}
				infiniteLoop={true}
				interval={3000}
				showThumbs={false}
				showIndicators={false}
				showStatus={false}
				renderArrowPrev={(clickHandler, hasPrev) => (
					<div
						onClick={clickHandler}
						className="absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
					>
						<BiArrowBack className="text-sm md:text-lg" />
					</div>
				)}
				renderArrowNext={(clickHandler, hasNext) => (
					<div
						onClick={clickHandler}
						className="absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
					>
						<FiArrowRight className="text-sm md:text-lg" />
					</div>
				)}
			>
				<div>
					{/* <Image
						src="/slide-1.png"
						alt="slide image 1"
						width={300}
						height={300}
						className="aspect-[16/10] md:aspect-auto h-[500px]"
					/> */}
					<img
						src="/slide-1.png"
						alt="slide image"
						className="aspect-[16/10] md:aspect-auto"
					/>
					<div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
						Shop now
					</div>
				</div>
				<div>
					{/* <Image
						src="/slide-2.png"
						alt="slide image 2"
						width={500}
						height={500}
						className="aspect-[16/10] md:aspect-auto h-[500px]"
					/> */}
					<img
						src="/slide-2.png"
						alt="slide image"
						className="aspect-[16/10] md:aspect-auto"
					/>
					<div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
						Shop now
					</div>
				</div>
				<div>
					{/* <Image
						src="/slide-3.png"
						alt="slide image 3"
						width={500}
						height={500}
						className="aspect-[16/10] md:aspect-auto h-[500px]"
					/> */}
					<img
						src="/slide-3.png"
						alt="slide image"
						className="aspect-[16/10] md:aspect-auto"
					/>
					<div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
						Shop now
					</div>
				</div>
			</Carousel>
		</div>
	);
};

export default HeroBanner;
