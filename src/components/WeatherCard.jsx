/* eslint-disable react/prop-types */
import React from 'react';

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
					<p className='font-bold text-orange'>추천하는 이유</p>
					<div className='text-[#2B2D36]'>{recommendation}</div>
				</div>
			) : null}
		</section>
	);
};

export default WeatherCard;
