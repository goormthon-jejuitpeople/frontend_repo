import React, { useState } from 'react';
import { mockReviews } from '@mock/mockReviewText';
import { summarizeReview } from '@api/kogpt_api';
import styled from 'styled-components';
import { BeatLoader, ClipLoader } from 'react-spinners';
const override = {
	display: 'block',
	margin: '0 auto',
	width: '70px',
	height: '40px',
};

const ReviewSummaryButton = () => {
	const [summary, setSummary] = useState('');
	const [isLoading, isSetLoading] = useState(null);
	const handleOnClick = async () => {
		isSetLoading(true);
		const reviewText = mockReviews.map((review) => review.text).join('\n\n');
		const response = await summarizeReview(reviewText);
		isSetLoading(false);
		setSummary(response);
	};

	return (
		<div>
			{summary ? (
				<Paragraph className='w-full mb-6'>{summary}</Paragraph>
			) : (
				<Button className='flex w-full mb-6' onClick={handleOnClick}>
					{isLoading ? <BeatLoader size={8} color='#FFFF' cssOverride={override} /> : '리뷰 요약하기'}
				</Button>
			)}
		</div>
	);
};
const Paragraph = styled.div`
	display: flex;
	padding: 0.625rem 1rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.625rem;
	flex: 1 0 0;
	align-self: stretch;
	border-radius: 0.5rem;
	background: #3dcb98;
	color: #fff;

	font-feature-settings:
		'clig' off,
		'liga' off;
	/* KOR/paragraph */
	font-family: Pretendard;
	font-size: 0.87rem;
	font-style: normal;
	font-weight: 400;
	line-height: 1.37rem; /* 157.143% */
	letter-spacing: -0.00625rem;
`;
const Button = styled.button`
	display: flex;
	height: 2.5rem;
	padding: 0.5625rem 1rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.625rem;
	align-self: stretch;
	border-radius: 0.5rem;
	background: #3dcb98;
	color: #fff;
	text-align: center;
	font-feature-settings:
		'clig' off,
		'liga' off;
	/* KOR/subtitle-1ㅣ0.875rem */
	font-family: Pretendard;
	font-size: 0.875rem;
	font-style: normal;
	font-weight: 500;
	line-height: 1.375rem; /* 157.143% */
	letter-spacing: -0.00625rem;
`;
export default ReviewSummaryButton;
