import React, { useState } from 'react';
import { mockReviews } from '@mock/mockReviewText';
import { summarizeReview } from '@api/kogpt_api';
const ReviewSummaryButton = () => {
	const [summary, setSummary] = useState('');

	const handleOnClick = async () => {
		const reviewText = mockReviews.map((review) => review.text).join('\n\n');
		const response = await summarizeReview(reviewText);
		setSummary(response);
	};

	return (
		<div>
			<button onClick={handleOnClick}>리뷰 요약</button>
			{summary && <p>요약: {summary}</p>}
		</div>
	);
};

export default ReviewSummaryButton;
