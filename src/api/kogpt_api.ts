export async function summarizeReview(reviewText: string) {
	const requestBody = {
		prompt: `지금 들어온 리뷰에 대해서 요약해줘 요약할 때, 사용자들이 얼마나 힘들었는지,
		산에서 본 풍경들을 중심으로 리뷰단 사람처럼 풀어주라. ${reviewText}`,
		max_tokens: 200,
		temperature: 0.5,
		top_p: 0.5,
	};
	try {
		const response = await fetch('/v1/inference/kogpt/generation', {
			method: 'POST',
			headers: {
				credentials: 'include',
				Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});

		const summary_data = await response.json();
		return summary_data.generations[0].text;
	} catch (error) {
		console.error('Error calling the KoGPT API:', error);
	}
}
