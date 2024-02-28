import TagButton from '@components/TagButton';
import React, { useState } from 'react';
import Rectangle from '../assets/Rectangle.svg';
import mountain from '../assets/mountain.svg';
import sea from '../assets/sea.svg';
import { Link } from 'react-router-dom';

const RecommendationForm = () => {
	const [selectedLocation, setSelectedLocation] = useState('');
	const [selectedDistance, setSelectedDistance] = useState('');
	const [selectedWeather, setSelectedWeather] = useState([]);
	const [selectedActivity, setSelectedActivity] = useState([]);
	const handleClickLocation = (location) => {
		setSelectedLocation(location);
	};
	const handleDistance = (distance) => {
		setSelectedDistance(distance);
	};

	// 날씨 버튼 클릭 핸들러
	const handleClickWeather = (weather) => {
		const isAlreadySelected = selectedWeather.includes(weather);
		if (isAlreadySelected) {
			setSelectedWeather(selectedWeather.filter((w) => w !== weather));
		} else {
			setSelectedWeather([...selectedWeather, weather]);
		}
	};

	// 활동 버튼 클릭 핸들러
	const handleClickActivity = (activity) => {
		const isAlreadySelected = selectedActivity.includes(activity);
		if (isAlreadySelected) {
			setSelectedActivity(selectedActivity.filter((a) => a !== activity));
		} else {
			setSelectedActivity([...selectedActivity, activity]);
		}
	};
	return (
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
					<h3 className='text-xl font-bold '>위치</h3>
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
					<h3 className='text-xl font-bold'>날씨</h3>
					<div>
						<p className='my-3 font-bold text-[#525463]'>이런 날씨는 피하고 싶어요</p>
						<div className='flex flex-wrap justify-center gap-2 '>
							<TagButton
								label='바람 많은'
								onClick={() => handleClickWeather('cloud')}
								active={selectedWeather.includes('cloud')}
							/>
							<TagButton
								label='비가 내림'
								onClick={() => handleClickWeather('rainy')}
								active={selectedWeather.includes('rainy')}
							/>
							<TagButton
								label='구름 낀'
								onClick={() => handleClickWeather('dark')}
								active={selectedWeather.includes('dark')}
							/>
							<TagButton
								label='추운 날씨'
								onClick={() => handleClickWeather('cold')}
								active={selectedWeather.includes('cold')}
							/>
							<TagButton
								label='더운 날씨'
								onClick={() => handleClickWeather('hot')}
								active={selectedWeather.includes('hot')}
							/>
						</div>
					</div>
				</div>
				<div>
					<h3 className='text-xl font-bold'>활동</h3>
					<div>
						<p className='my-3 font-bold text-[#525463]'>이런 활동을 하고 싶어요</p>
						<div className='flex flex-wrap justify-center gap-2 '>
							<TagButton
								label='휴식'
								onClick={() => handleClickActivity('휴식')}
								active={selectedActivity.includes('휴식')}
							/>
							<TagButton
								label='관람'
								onClick={() => handleClickActivity('관람')}
								active={selectedActivity.includes('관람')}
							/>
							<TagButton
								label='사진찍기'
								onClick={() => handleClickActivity('사진찍기')}
								active={selectedActivity.includes('사진찍기')}
							/>
							<TagButton
								label='꽃구경'
								onClick={() => handleClickActivity('꽃구경')}
								active={selectedActivity.includes('꽃구경')}
							/>
							<TagButton
								label='런닝코스'
								onClick={() => handleClickActivity('런닝코스')}
								active={selectedActivity.includes('런닝코스')}
							/>
							<TagButton
								label='워케이션'
								onClick={() => handleClickActivity('워케이션')}
								active={selectedActivity.includes('워케이션')}
							/>
						</div>
					</div>
				</div>
			</div>
			<section className='flex gap-2 mb-12 '>
				<Link to='/'>
					<button className='flex flex-col items-center justify-center h-13 px-6 py-3.5 text-white bg-green rounded-md'>
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
	);
};

export default RecommendationForm;
