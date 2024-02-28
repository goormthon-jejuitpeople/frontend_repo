import DetailOreum from '@pages/DetailOreum';
import Home from '@pages/mainPage/Home';
import Loading from '@pages/Loading';

import { Route, Routes } from 'react-router-dom';
const App = () => {
	console.log(process.env.REACT_APP_OPEN_AI_KEY);

	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/detail' element={<DetailOreum />} />
			<Route path='/loading' element={<Loading />} />

			{/* <Route path='/home' element={<Home />} /> */}
		</Routes>
	);
};

export default App;
