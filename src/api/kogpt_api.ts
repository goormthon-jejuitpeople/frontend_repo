export async function summarizeReview(reviewText: string) {
	const requestBody = {
		prompt: reviewText,
		max_tokens: 150,
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
