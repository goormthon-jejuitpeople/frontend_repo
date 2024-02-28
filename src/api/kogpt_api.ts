export async function summarizeReview(reviewText: string) {
	const requestBody = {
		prompt: `지금 들어온 리뷰에 대해서 요약해줘 요약할 때, 리뷰를 전달하는 듯한 말투로하고 문장은 5문장을 넘기지 말아줘
		산에서 본 풍경들, 거기서 했던 활동, 어떤 점이 좋았는지, 누구랑가서 좋았는지, 힘들었다면 왜힘들었는지, 주변에 뭐가있는지
		등 디테일한 것을 넣어주면 좋을 것 같아. 말투는 친근하면서 전문적이게 반말은하지마   ${reviewText}`,
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
