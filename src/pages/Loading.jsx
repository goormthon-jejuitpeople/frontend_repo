import React from 'react';
import LoadingImg from '../assets/loading_Img.svg';
import styled from 'styled-components';
import BarLoader from 'react-spinners/BarLoader';

const Loading = () => {
	const override = {
		display: 'block',
		margin: '0 auto',
		borderColor: 'red',
		width: '100px',
	};

	return (
		<Container>
			<Img src={LoadingImg} />
			<BarLoader color='#FF7C43' cssOverride={override} />
		</Container>
	);
};

export default Loading;

const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Img = styled.img`
	width: 300px;
	display: block;
	margin: 0 auto;
`;

// position: absolute;
// 	top: 50%;
// 	left: 50%;
// 	transform: translate(-50%, -50%);
