import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.png';

const Landing = () => {
	window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

	return (
		<>
			<Div>
				<img src={Logo} />
			</Div>
		</>

	);
};

export default Landing;

const Div = styled.div`
	background-color: white;
	height: 100vh;

	display: flex;
	justify-content: center;
	align-items: center;
`;
