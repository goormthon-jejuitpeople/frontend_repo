export async function summarizeReview(reviewText: string, creativity: number) {
	const requestBody = {
		prompt: reviewText,
		max_tokens: 100,
		temperature: creativity,
		top_p: 0,
	};

	const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
	const URL = `${PROXY}/v1/inference/kogpt/generation`;

	try {
		const response = await fetch(URL, {
			method: 'POST',
			headers: {
				Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
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
