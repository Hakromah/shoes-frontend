import React, { useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import Image from 'next/image';

import Link from 'next/link';
import Menu from './Menu';
import MenuMobile from './MenuMobile';

import { BsCart } from 'react-icons/bs';
import { BiMenuAltRight } from 'react-icons/bi';
import { VscChromeClose } from 'react-icons/vsc';
import { fetchDataFromApi } from '@/utils/api';
import { useSelector } from 'react-redux';

const Header = () => {
	const [mobileMenu, setMobileMenu] = useState(false);
	const [showCatMenu, setShowCatMenu] = useState(false);
	const [show, setShow] = useState('translate-y-o');
	const [lastScrollY, setLastScrollY] = useState(0);
	const [categories, setCategories] = useState(null);

	//cart quantity update
	const { cartItems } = useSelector((state) => state.cart);

	const controlNavbar = () => {
		if (window.scrollY > 200) {
			if (window.scrollY > lastScrollY && !mobileMenu) {
				setShow('-translate-y-[80px]');
			} else {
				setShow('shadow-md bg-purple-500');
			}
		} else {
			setShow('translate-y-0');
		}
		setLastScrollY(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener('scroll', controlNavbar);
		return () => {
			window.removeEventListener('scroll', controlNavbar);
		};
	}, [lastScrollY]);

	//fet categories from starpi database
	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		const { data } = await fetchDataFromApi('/api/categories?populate=*');
		setCategories(data);
	};

	return (
		<header
			className={`w-full h-[50px] md:h-[80px] bg-white flex items-center
			 justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
		>
			<Wrapper className="h-[60px] flex justify-between items-center">
				<Link href="/">
					<Image
						src="/logo.svg"
						alt="logo-image"
						width={40}
						height={40}
						className="w-[40px] md:w-[60px]"
					/>
				</Link>
				<Menu
					showCatMenu={showCatMenu}
					setShowCatMenu={setShowCatMenu}
					categories={categories}
				/>

				{mobileMenu && (
					<MenuMobile
						showCatMenu={showCatMenu}
						setShowCatMenu={setShowCatMenu}
						setMobileMenu={setMobileMenu}
						categories={categories}
					/>
				)}
				<div className="flex items-center gap-2 text-black">
					{/* Likes Icon starts*/}
					<div
						className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center
					items-center hover:bg-black/[0.05] cursor-pointer relative"
					>
						{/* <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
						<div
							className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px]
						rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white
						text-[10px] md:text-[12px] flex justify-center items-center px-[2px]
						md:px-[5px]"
						>
							62
						</div> */}
					</div>
					{/* Likes Icon ends*/}

					{/* Cart section starts*/}
					<Link href="/cart">
						<div
							className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center
					items-center hover:bg-black/[0.05] cursor-pointer relative"
						>
							<BsCart className="text-[15px] md:text-[20px]" />
							{cartItems.length > 0 && (
								<div
									className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px]
								rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white
								text-[10px] md:text-[12px] flex justify-center items-center px-[2px]
								md:px-[5px]"
								>
								{/* cart quantity update */}
									{cartItems.length}
								</div>
							)}
						</div>
					</Link>
					{/* Cart section ends*/}

					{/* Mobile icon start */}
					<div
						className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center
					items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2"
					>
						{mobileMenu ? (
							<VscChromeClose
								className="text-[16px]"
								onClick={() => setMobileMenu(false)}
							/>
						) : (
							<BiMenuAltRight
								className="text-[20px]"
								onClick={() => setMobileMenu(true)}
							/>
						)}
					</div>
					{/* Mobile icon end */}
				</div>
			</Wrapper>
		</header>
	);
};

export default Header;
