/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

function Reivew({ text, brand }) {
	return (
		<Container>
			<Content>{text}</Content>
			<Brand>{brand}</Brand>
		</Container>
	);
}
const Content = styled.p`
	color: var(--light-gray-gray-900, #2b2d36);
	font-family: Pretendard;
	font-size: 0.875rem;
	font-style: normal;
	font-weight: 400;
	line-height: 1.375rem; /* 157.143% */
	letter-spacing: -0.00625rem;
`;
const Brand = styled.p`
	color: var(--light-gray-gray-600-hint, #858899);
	font-family: Pretendard;
	align-self: flex-end;
	font-size: 0.75rem;
	font-style: normal;
	font-weight: 400;
	line-height: 1.125rem;
	letter-spacing: -0.00625rem;
	opacity: 0.6;
`;
const Container = styled.div`
	display: flex;
	padding: 0.5625rem 1rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 1 0 0;
	border-radius: 0.5rem 0.5rem 0.5rem 0rem;
	border: 1px solid var(--light-gray-gray-300, #e1e1e8);
	background: var(--light-gray-gray-050, #f7f7fa);
`;

export default Reivew;
