import DetailOreum from '@pages/DetailOreum';
import RecommendationForm from '@pages/RecommendationForm';
import Home from '@pages/mainPage/Home';
import Loading from '@pages/Loading';

import { Route, Routes } from 'react-router-dom';
import AIResult from '@pages/AIResult';
const App = () => {
	console.log(process.env.REACT_APP_OPEN_AI_KEY);

	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/detail/:id' element={<DetailOreum />} />
			<Route path='/recommendation' element={<AIResult />} />
			<Route path='/form' element={<RecommendationForm />} />
			<Route path='/loading' element={<Loading />} />
		</Routes>
	);
};

export default App;
