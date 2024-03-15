import axios from 'axios';

export async function getWeather(lat: string, lon: string) {
	const key = process.env.REACT_APP_OPENWEATHER_API_KEY;

	const PROXY = window.location.hostname === 'localhost' ? '' : '/data';
	const URL = `${PROXY}/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

	try {
		const response = await axios.get(URL);

		return response.data.weather[0].main; // Rain, Clouds
	} catch (error) {
		console.error(error);
	}
}
