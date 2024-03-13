export async function summarizeReview(reviewText: string, creativity: number) {
	const requestBody = {
		prompt: reviewText,
		max_tokens: 100,
		temperature: creativity,
		top_p: 0,
	};
	try {
		const response = await fetch('/v1/inference/kogpt/generation', {
			method: 'POST',
			headers: {
				// Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
				Authorization: `KakaoAK eea100c490ea4dff5f9edeaf39d31a29`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});

		const summary_data = await response.json();
		// console.log(summary_data);
		return summary_data.generations[0].text;
	} catch (error) {
		console.error('Error calling the KoGPT API:', error);
	}
}

// return axios({
//     method: 'POST',
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
//     },
//     url: 'https://kauth.kakao.com/oauth/token',
//     data: makeFormData({
//       grant_type: 'authorization_code',
//       client_id: JS_APP_KEY,
//       redirect_uri: REDIRECT_URI,
//       code,
//     })
//   })
