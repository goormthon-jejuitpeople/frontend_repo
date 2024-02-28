import TagButton from '@components/TagButton';
import React, { useEffect, useRef, useState } from 'react';
import Rectangle from '../assets/Rectangle.svg';
import mountain from '../assets/mountain.svg';
import sea from '../assets/sea.svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import getOreumNameList from 'test/getOreumNameList';
import getOreumNameList from '../test/getOreumNameList';
import { summarizeReview } from '@api/kogpt_api';
import Loading from './Loading';

const RecommendationForm = () => {
	const [selectedLocation, setSelectedLocation] = useState('');
	const [selectedDistance, setSelectedDistance] = useState('');
	const [selectedWeather, setSelectedWeather] = useState('');
	const [geolocation, setGeolocation] = useState({});

	const [isLoading, setIsLoading] = useState(false);
	const inputRef = useRef(null);
	const handleClickLocation = (location) => {
		setSelectedLocation(location);
	};
	const handleDistance = (distance) => {
		setSelectedDistance(distance);
	};
	const handleClickWeather = (weather) => {
		setSelectedWeather(weather);
	};

	const handleSubmit = async () => {
		let totalString = ''; // Corrected variable name
		const lifeMoto = `나의 인생모토는 ${inputRef.current.value}야`;
		const location = `나는 ${selectedLocation}에 갈꺼고`;
		const distance = `내 위치좌표는${geolocation.lat},${geolocation.lng}이고 오름위치는${selectedDistance}면 해.`;
		const weather = `내 성격은 ${selectedWeather}이야`;
		totalString += lifeMoto + location + distance + weather; // Correctly append strings using +=
		const prompt = `${totalString} 이러한 내용들을 바탕으로 내가 줄 제주 오름 리스트들 중에서 나에게 어울릴만한 오름을 추천해줘. 이 문장이 어색할수도 있는데 그건 
    사용자로부터 동적으로 입력받기 떄문이야. 현재 계절을 고려했을 때 풍경을 고려하거나,
    사람들의 감상평, 내 인생모토, 오름 근처에서 할 만한 것 등 여러가지 요인들을 고려해서 추천이유를 창의적이게 들어주면 좋을 것 같아.
    이거는 앱 사용자에게 개인 성향에 맞춰 오름이나 바다를 추천해주는 서비스야. 우선 오름데이터를 줄테니까 여기 한정에서만 오름을 추천해주면 돼. 바다를 여행장소로 원하는 입력값일 경우
    적당한 곳을 너가 추천해주면돼 
    오름 데이터는 다음과 같아 ${getOreumNameList()}`;
		setIsLoading(true);
		// Assuming summarizeReview is a function that takes the prompt and does something useful with it
		const response = await summarizeReview(prompt);
		//response가 있을 때
		setIsLoading(false);

		console.log(response);
	};

	useEffect(() => {
		// 사용자 좌표 얻어오기 & Map생성
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				console.log('position', position);
				const lat = position.coords.latitude;
				const lng = position.coords.longitude;
				setGeolocation({ lat, lng });
			});
		}
	});

	return (
		<>
			{!isLoading ? (
				<main className='flex flex-col items-center mx-6 bg-white'>
					<img src={Rectangle} className='mt-12' />
					<h1 className='font-bold text-2xl text-[#181818]'>산/바다 추천받기</h1>
					<div className='flex flex-col gap-2 mt-10'>
						<button className='text-orange flex flex-col items-center justify-center h-8 px-4 py-1 gap-2.5 rounded-full border border-[#FFE4CA] bg-[#FFF9F6] text-center'>
							관광지를 찾아보는 것이 귀찮을 때 🙀
						</button>
						<button className='text-orange flex flex-col items-center justify-center h-8 px-4 py-1 gap-2.5 rounded-full border border-[#FFE4CA] bg-[#FFF9F6] text-center'>
							잦은 날씨 변화로 일정에 차질이 생길 때 😮‍
						</button>
					</div>
					<p className='text-sm text-[#2B2D36] text-center mx-2 mt-6'>
						<p className='font-bold leading-7 '>
							걱정마세요, 감귤이 AI가 추천해드릴게요. <br />
							날씨, 위치, 활동에 따라
						</p>
						<p className='leading-7'>적당한 산과 바다의 관광 장소를 추천해드려요. </p>
					</p>
					<hr />
					<div className='mb-20 flex flex-col gap-[3.125rem] mt-12 text-center'>
						<div>
							<h3 className='text-xl font-bold '>선호지역</h3>
							<div className='mt-1'>
								<div className='my-3 flex items-center justify-center font-bold text-[#525463]'>
									<p>나는 이곳을 가고싶어요</p>
									<p className='text-[#3DCB98]'>*필수</p>
								</div>
								<div className='flex justify-center gap-2'>
									<TagButton
										label='⛰️산으로 갈래요'
										onClick={() => handleClickLocation('산')}
										active={selectedLocation === '산'}
									>
										<img src={mountain} />
									</TagButton>
									<TagButton
										label='🌊바다로 갈래요'
										onClick={() => handleClickLocation('바다')}
										active={selectedLocation === '바다'}
									>
										<img src={sea} />
									</TagButton>
								</div>
								<p className='my-3 mt-10 font-bold text-[#525463]'>거리는 이 정도가 좋아요</p>
								<div className='flex justify-center gap-2'>
									<TagButton
										label='차량 30분이하'
										onClick={() => handleDistance('close')}
										active={selectedDistance === 'close'}
									/>
									<TagButton
										label='차량 30분이상'
										onClick={() => handleDistance('far')}
										active={selectedDistance === 'far'}
									/>
								</div>
							</div>
						</div>
						<div>
							<h3 className='text-xl font-bold'>경험</h3>
							<div>
								<p className='my-3 font-bold text-[#525463]'>나는 이런 사람이에요</p>
								<div className='flex flex-wrap justify-center gap-2 '>
									<TagButton
										label='도전적인 모험가 😎'
										onClick={() => handleClickWeather('cloud')}
										active={selectedWeather === 'cloud'}
									/>
									<TagButton
										label='탐구하는 학자 📚'
										onClick={() => handleClickWeather('rainy')}
										active={selectedWeather === 'rainy'}
									/>
									<TagButton
										label='탐미주의 예술가 🎨'
										onClick={() => handleClickWeather('dark')}
										active={selectedWeather === 'dark'}
									/>
									<TagButton
										label='피곤한 사회인 🫠'
										onClick={() => handleClickWeather('cold')}
										active={selectedWeather === 'cold'}
									/>
									<TagButton
										label='기록하는 사진가 📸'
										onClick={() => handleClickWeather('hot')}
										active={selectedWeather === 'hot'}
									/>
								</div>
							</div>
							<div className='mt-6'>
								<p className='my-3 font-bold text-[#525463]'>나는 이런 인생모토를 갖고 있어요</p>
								<Input ref={inputRef} className='w-full ' />
							</div>
						</div>
					</div>
					<section className='flex gap-2 mb-12 '>
						<Link>
							<button
								onClick={handleSubmit}
								className='flex flex-col items-center justify-center h-13 px-6 py-3.5 text-white bg-green rounded-md'
							>
								추천해주세요, 흑꿀꿀!
							</button>
						</Link>
						<Link to='/'>
							<button className='flex flex-col items-center justify-center h-13 px-6 py-3.5 bg-[#F0F0F5] text-[#525463] rounded-md'>
								홈으로
							</button>
						</Link>
					</section>
				</main>
			) : (
				<Loading />
			)}
		</>
	);
};

const Input = styled.input`
	display: flex;
	padding: 0.5625rem 1rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.625rem;
	flex: 1 0 0;
	align-self: stretch;
	border-radius: 0.5rem;
	border: 1px solid #e1e1e8;
	background: #fff;
	color: #858899;
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

export default RecommendationForm;
