import Home from '@pages/mainPage/Home';
import { Route, Routes } from 'react-router-dom';
const App = () => {
	console.log(process.env.REACT_APP_OPEN_AI_KEY);

	return (
		<Routes>
			<Route path='/' element={<Home />} />
			{/* <Route path='/home' element={<Home />} /> */}
		</Routes>
	);
};

export default App;
