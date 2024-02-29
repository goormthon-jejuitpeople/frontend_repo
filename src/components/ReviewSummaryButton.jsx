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
const dummyReviewSummary = [
	{
		id: 1,
		summary:
			'이 곳의 방문은 정말 놀라웠습니다. 평화롭고 고요한 분위기 속에서 숨이 멎을 듯한 전망을 경험할 수 있었고, 잘 조성된 산책로 덕분에 어린 아이부터 노인까지 모두가 즐길 수 있었습니다. 자연과 함께하는 시간은 도시 생활의 번잡함에서 벗어나 완벽한 휴식을 제공했습니다.',
	},
	{
		id: 2,
		summary:
			'이 지역의 풍부한 역사와 문화를 배울 수 있는 기회였습니다. 가이드 투어를 통해 과거의 삶과 이 지역 사람들의 이야기에 깊이 몰입할 수 있었고, 역사적 사실과 함께 현장을 체험하는 것은 매우 인상적이었습니다. 이런 경험은 여행의 의미를 더욱 깊게 해줍니다.',
	},
	{
		id: 3,
		summary:
			'자연의 아름다움이 이곳에서 완벽하게 드러납니다. 계절마다 변하는 풍경 속에서 다양한 식물과 야생동물을 관찰할 수 있었고, 매 방문마다 새로운 발견이 있어서 지루할 틈이 없었습니다. 특히, 봄에 방문했을 때 만개한 꽃들 사이를 걷는 것은 잊을 수 없는 경험이었습니다.',
	},
	{
		id: 4,
		summary:
			'산책로를 따라 걷다 보니 숲이 점점 더 울창해지고, 공기도 신선해졌습니다. 자연 속에서의 힐링은 도시에서의 삶에서는 느낄 수 없는 특별한 경험이었어요.',
	},
];
const ReviewSummaryButton = () => {
	const [summary, setSummary] = useState('');
	const [isLoading, isSetLoading] = useState(null);
	const max = dummyReviewSummary.length; // 배열의 길이를 최대값으로 설정
	let randomNumber = Math.floor(Math.random() * max);
	const handleOnClick = async () => {
		isSetLoading(true);
		setTimeout(() => {
			isSetLoading(false);
			setSummary(dummyReviewSummary[randomNumber].summary);
		}, 2000);
		//const reviewText = mockReviews.map((review) => review.text).join('\n\n');
		// const plusPrompt = `지금 들어온 리뷰에 대해서 요약해줘 요약할 때, 리뷰를 전달하는 듯한 말투로하고 문장은 5문장을 넘기지 말아줘
		// 산에서 본 풍경들, 거기서 했던 활동, 어떤 점이 좋았는지, 누구랑가서 좋았는지, 힘들었다면 왜힘들었는지, 주변에 뭐가있는지
		// 등 디테일한 것을 넣어주면 좋을 것 같아. 말투는 친근하면서 전문적이게 반말은하지마   ${reviewText}`;
		// const response = await summarizeReview(plusPrompt, 0.5);
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
