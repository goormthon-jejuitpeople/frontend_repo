import { Link, useParams, useSearchParams } from 'react-router-dom';
import logo from '../assets/logo.png';
import LocationIcon from '../assets/LocationIcon.svg';
import WeatherCard from '@components/WeatherCard';
import ReviewSummaryButton from '@components/ReviewSummaryButton';
import { mockReviews } from '@mock/mockReviewText';
import Reivew from '@components/Reivew';
import styled from 'styled-components';
import Image from '../assets/Image.png';
import Img2 from '../assets/Img2.png';

const DetailOreum = () => {
	const { detailId } = useParams();
	console.log('page _id, detailId');
	const [searchParams] = useSearchParams();
	const queryList = [...searchParams];
	const oreumData = Object.fromEntries(queryList);
	return (
		<main className='w-full pb-12'>
			<header className='bg-[#FFF9F6] flex flex-col items-center justify-center pt-6 pb-4'>
				<div className='mt-2 mb-4'>
					<img src={logo} />
				</div>
				<div className='w-full h-48 overflow-hidden '>
					<img className='w-full h-full' src={oreumData.imgPath} />
				</div>
			</header>
			<section className='mx-6'>
				<div className='w-3/5 flex items-center gap-2.5 py-1 px-2.5 rounded-full border border-orange bg-white text-sm font-medium leading-6 '>
					<img src={LocationIcon} />
					<p className='text-[#2B2D36] text-sm font-medium leading-6'>{oreumData.oleumAddr}</p>
				</div>
				<h1 className='my-4 text-3xl font-extrabold'>{oreumData.oleumKname}</h1>
				<WeatherCard weather='sunny' detail='기온 7도 습도 15% ' />
				<h2 className='mb-4 text-lg font-extrabold text-#2B2D36'>장소 특징</h2>
				<div className='flex justify-around'>
					<img src={Image} />
					<img src={Img2} />
				</div>
				<PlaceFeature className='flex flex-col mt-4 mb-6'>
					<PlaceIntro>장소에 대한 한 줄 소개</PlaceIntro>
					<PlaceExplan>{oreumData.explan}</PlaceExplan>
				</PlaceFeature>
				<h2 className='mb-4 text-lg font-extrabold text-#2B2D36'>장소 리뷰</h2>
				<div>
					<ReviewSummaryButton />
					<div className='flex flex-col gap-4'>
						{mockReviews.map((review) => (
							<Reivew key={review.id} text={review.text} brand={review.brand} />
						))}
					</div>
				</div>
			</section>
			<section className='flex justify-center gap-4 mt-16 align-center'>
				<TryAgain>추천 한번 더</TryAgain>
				<Link to='/'>
					<GoHome>홈으로</GoHome>
				</Link>
			</section>
		</main>
	);
};
const PlaceFeature = styled.div`
	display: flex;
	padding: 0.5625rem 1rem;
	flex-direction: column;
	justify-content: center;
	gap: 0.625rem;
	flex: 1 0 0;
	align-self: stretch;
	border-radius: 0.5rem;
	border: 1px solid #ffe4ca;

	background: #fff9f6;
`;
const PlaceIntro = styled.p`
	color: #ff7c43;

	font-feature-settings:
		'clig' off,
		'liga' off;
	font-family: Pretendard;
	font-size: 0.875rem;
	font-style: normal;
	font-weight: 700;
	line-height: 1.375rem; /* 157.143% */
	letter-spacing: -0.00625rem;
`;
const PlaceExplan = styled.p`
	color: var(--light-gray-gray-900, #2b2d36);
	font-feature-settings:
		'clig' off,
		'liga' off;
	/* KOR/paragraph */
	font-family: Pretendard;
	font-size: 0.875rem;
	font-style: normal;
	font-weight: 400;
	line-height: 1.375rem; /* 157.143% */
	letter-spacing: -0.00625rem;
`;
const TryAgain = styled.button`
	display: flex;
	height: 3.25rem;
	padding: 0.875rem 1.5rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.625rem;
	border-radius: 0.5rem;
	background: #3dcb98;
	color: #fff;

	text-align: center;
	font-feature-settings:
		'clig' off,
		'liga' off;
	/* KOR/H6ㅣ1rem */
	font-family: Pretendard;
	font-size: 1rem;
	font-style: normal;
	font-weight: 500;
	line-height: 1.5rem; /* 150% */
	letter-spacing: -0.00625rem;
`;
const GoHome = styled.button`
	display: flex;
	height: 3.25rem;
	padding: 0.875rem 1.5rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.625rem;
	border-radius: 0.5rem;
	background: var(--light-gray-gray-050, #f7f7fa);
	ButtonText (Button)


color: var(--light-gray-gray-700-alternative, #525463);
text-align: center;
font-feature-settings: 'clig' off, 'liga' off;
/* KOR/H6ㅣ1rem */
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 500;
line-height: 1.5rem; /* 150% */
letter-spacing: -0.00625rem;
`;
export default DetailOreum;
