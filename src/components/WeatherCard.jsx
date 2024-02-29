/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Pig from '../assets/Pig.png';
const weatherIcon = { sunny: ['🌤️', '맑음'], rainy: ['🌧️', '비 옴'], cloudy: ['☁️', '흐림'] };
const WeatherCard = ({ weather, detail, recommendation }) => {
	return (
		<section>
			<h2 className='mb-4 text-lg font-extrabold'>오늘의 날씨</h2>
			<div className='flex items-center gap-2 mb-8'>
				<p className='text-5xl'>{weatherIcon[weather][0]}</p>
				<div className='flex flex-col gap-2'>
					<div className='rounded-full text-white px-[0.8375rem] py-[0.56rem] bg-orange font-bold text-center'>
						{weatherIcon[weather][1]}
					</div>
					<p className='text-sm font-bold text-orange'>{detail}</p>
				</div>
			</div>
			{recommendation ? (
				<div className='flex flex-col justify-center px-4 py-1 mb-12 gap-2.5 rounded-lg border border-[#FFE4CA] bg-[#FFF9F6] '>
					<Paragraph>추천하는 이유</Paragraph>
					<div>
						<img src={Pig} />
						<Text className='my-2 text-[#2B2D36]'>{recommendation}</Text>
					</div>
				</div>
			) : null}
		</section>
	);
};

const Text = styled.div`
	color: #2b2d36;
	font-family: Pretendard;
	font-size: 0.875rem;
	font-style: normal;
	font-weight: 400;
	line-height: 1.375rem; /* 157.143% */
	letter-spacing: -0.00625rem;
`;
const Paragraph = styled.p`
	color: #ff7c43;
	font-family: Pretendard;
	font-size: 0.875rem;
	font-style: normal;
	font-weight: 700;
	line-height: 1.375rem; /* 157.143% */
	letter-spacing: -0.00625rem;
`;
export default WeatherCard;
