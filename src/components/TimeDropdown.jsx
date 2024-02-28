import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TimeDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const toggleDropdown = () => setIsOpen(!isOpen);

	useEffect(() => {
		const hours = 24; // 총 36시간
		const date = new Date();
		const optionsArray = [];
		for (let i = 0; i <= hours; i += 3) {
			const futureDate = new Date(date.getTime() + i * 60 * 60 * 1000);
			const label =
				i === 0 ? '지금' : `${futureDate.getDate() === date.getDate() ? '오늘' : '내일'} ${futureDate.getHours()}시`;
			optionsArray.push(label);
		}

		setOptions(optionsArray);
	}, []);

	return (
		<DropdownContainer>
			{isOpen && (
				<DropdownMenu>
					{options.map((option, index) => (
						<DropdownItem key={index}>{option}</DropdownItem>
					))}
				</DropdownMenu>
			)}
			<DropdownButton onClick={toggleDropdown}>
				<span>⏰</span>
				<Label>시간 선택</Label>
			</DropdownButton>
		</DropdownContainer>
	);
};

const Label = styled.div`
	font-family: Pretendard;
	font-size: 0.875rem;
	font-style: normal;
	font-weight: 500;
	line-height: 1.375rem; /* 157.143% */
	letter-spacing: -0.00625rem;
	color: #3dcb98;
`;

const DropdownContainer = styled.div``;

const DropdownButton = styled.button`
	display: flex;
	position: relative;
	width: 7.8125rem;
	height: 2.1875rem;
	padding: 0.54688rem 0.625rem;
	justify-content: space-between;
	align-items: center;
	border-radius: 0.375rem;
	border: 1px solid #51a555;
	background: #f1f6ff;
	box-shadow: 0px 0.875px 2.625px 0px rgba(0, 0, 0, 0.2);
	cursor: pointer;
`;

const DropdownMenu = styled.ul`
	position: absolute;
	top: 60%;
	background-color: #ffffff;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	border-radius: 5px;
	overflow: hidden;
	z-index: 1000;
	padding: 0px;
`;

const DropdownItem = styled.li`
	padding: 10px;
	cursor: pointer;
	list-style-type: none;
	&:hover {
		background-color: #f0f0f0;
	}
`;
export default TimeDropdown;
