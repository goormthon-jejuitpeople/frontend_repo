/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import locationImg from '../assets/LocationIcon.svg';
import pig from '../assets/pig.svg';

const MainModal = ({ currentLocation }) => {
	const { region_1depth_name, region_2depth_name, region_3depth_name } = currentLocation;
	console.log(region_1depth_name + region_2depth_name);

	return (
		<Modal>
			<NowLoca>
				<img src={locationImg}></img>현재 위치는
			</NowLoca>
			<Location>{`${region_1depth_name} ${region_2depth_name} ${region_3depth_name}`}</Location>
			<div style={{ display: 'flex', color: '#FF7C43', alignSelf: 'flex-start', marginBottom: '25px' }}>
				<span>기온 15%</span>
				<span>습도 15%</span>
			</div>
			<div style={{ position: 'relative' }}>
				<Button>산/바다 추천받기</Button>
				<img src={pig} style={{ width: '70px', height: '69px', position: 'absolute', top: '-40px', right: '0' }} />
			</div>
		</Modal>
	);
};

export default MainModal;

const Modal = styled.div`
    text-align: left;

	display: flex;
	width: 393px;
	padding: 20px 32px 40px 32px;
	flex-direction: column;
	gap: 5px;

	text-align: left;
	box-sizing: border-box;

	width: 100%;
	z-index: 50;
	border-radius: 20px 20px 0px 0px;
	background: #fff;
	box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.2);

	position: absolute;
	bottom: 0%;
	left: 50%;
	transform: translate(-50%, 0);
	
	}
`;

const NowLoca = styled.div`
	align-self: flex-start;
	box-sizing: border-box;
	display: flex;
	padding: 5px 10px;
	align-items: start;
	gap: 5px;

	border-radius: 100px;
	border: 1px solid #ff7c43;
	background: #fff;
`;

const Location = styled.div`
	color: #2b2d36;
	text-align: left;

	font-family: Pretendard;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: 36px;
	letter-spacing: -0.3px;
`;

const Button = styled.button`
	box-sizing: border-box;
	display: flex;
	width: 328px;
	padding: 14px 24px;
	justify-content: center;
	align-items: center;
	gap: 10px;

	color: white;
	border-radius: 8px;
	background: #3dcb98;
	border: none;

	margin-bottom: 40px;

	cursor: pointer;
`;
