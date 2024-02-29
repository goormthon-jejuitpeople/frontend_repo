import TagButton from '@components/TagButton';
import React, { useEffect, useRef, useState } from 'react';
import Rectangle from '../assets/Rectangle.svg';
import mountain from '../assets/mountain.svg';
import sea from '../assets/sea.svg';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import getOreumNameList from 'test/getOreumNameList';
import getOreumNameList from '../test/getOreumNameList';
import { summarizeReview } from '@api/kogpt_api';
import Loading from './Loading';

function objectToQueryString(obj) {
	const queryString = Object.entries(obj)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join('&');
	return queryString;
}
const RecommendationForm = () => {
	const navigate = useNavigate();
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

	const mockData = {
		oleumKname: '알오름',
		oleumEname: 'al',
		oleumAddr: '서귀포시 성산읍 시흥리',
		oleumAltitu: 51,
		x: '126.885873550364',
		y: '33.4803782361653',
		explan: '비고 51m의 원추형 화구를 지닌 화산체이다.',
		imgPath: 'https://gis.jeju.go.kr/images/oleum/al.png',
		reason:
			'알오름은 도전적인 모험을 즐기는 분에게 안성맞춤입니다. 비교적 쉬운 등반 경로와 짧은 소요 시간에도 불구하고, 정상에서 바라보는 제주도의 파노라마는 압도적입니다. 계절에 관계없이 다채로운 자연 경관을 선사하며, 근처에 다양한 액티비티와 맛집이 있어 여행의 즐거움을 더합니다.',
	};
	const handleSubmit = async () => {
		let totalString = ''; // Corrected variable name
		const lifeMoto = `나의 여행모토는 "${inputRef.current.value}"야`;
		const location = `나는 "${selectedLocation}"에 갈꺼고`;
		const distance = `내 위치좌표는"${geolocation.lat},${geolocation.lng}"이고 오름위치는 "${selectedDistance}".`;
		const weather = `내 성격은 "${selectedWeather}"이야`;
		totalString += lifeMoto + location + distance + weather; // Correctly append strings using +=
		// const prompt = `
		// 내 성향을 듣고 오름 추천해줘! 오름은 제주도에 있는 높지 않은 산들을 말해.
		// @오름이름데이터: 성산일출봉, 금오름
		// 이 이름 데이터 중에서 다음에 말할 조건들에 부합하는 오름 딱 하나를 추천해줄래?? 반드시 매번 새롭게 내 질문에 대한 대답을 해줘야해!`;
		// @성향:${totalString}
		// 오름 하나를 골랐다면 그 오름을 추천한 이유를 성향을 근거로 들어주라. 현재 계절, 사람들의 감상평, 내 인생 모토, 오름 근처에서 할 만한 것 등을 고려해서 추천해줘.
		// 구체적인 예시로는, 당신은 활발한 운동을 좋아하기 때문에 높은 등반을 할 수 있는 성산일출봉을 추천드립니다 처럼 해주면 돼
		// 추천 이유는 300자로 제한할게. 결과는 {name: "오름이름", reason: "추천이유"} 형식으로 제공해줘.  "`;
		const prompt = `1+1= 정답을 알려줘`;
		setIsLoading(true);
		console.log('prompt', prompt);
		// Assuming summarizeReview is a function that takes the prompt and does something useful with it
		const response = await summarizeReview(prompt, 0);
		console.log('response', response);
		//response가 있을 때
		setIsLoading(false);
		navigate(`/recommendation?${objectToQueryString(mockData)}`);
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
	}, []);

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
										onClick={() => handleDistance('가까웠음')}
										active={selectedDistance === '가까웠음'}
									/>
									<TagButton
										label='차량 30분이상'
										onClick={() => handleDistance('멀어도상관없음')}
										active={selectedDistance === '멀어도상관없음'}
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
										onClick={() => handleClickWeather('도전적인 모험가')}
										active={selectedWeather === '도전적인 모험가'}
									/>
									<TagButton
										label='탐구하는 학자 📚'
										onClick={() => handleClickWeather('탐구하는 학자')}
										active={selectedWeather === '탐구하는 학자'}
									/>
									<TagButton
										label='탐미주의 예술가 🎨'
										onClick={() => handleClickWeather('탐미주의 예술가')}
										active={selectedWeather === '탐미주의 예술가'}
									/>
									<TagButton
										label='피곤한 사회인 🫠'
										onClick={() => handleClickWeather('피곤한 사회인')}
										active={selectedWeather === '피곤한 사회인'}
									/>
									<TagButton
										label='기록하는 사진가 📸'
										onClick={() => handleClickWeather('기록하는 사진가')}
										active={selectedWeather === '기록하는 사진가'}
									/>
								</div>
							</div>
							<div className='mt-6'>
								<p className='my-3 font-bold text-[#525463]'>나는 이런 여행모토를 갖고 있어요</p>
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
