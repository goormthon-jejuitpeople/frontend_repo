import Home from '@pages/mainPage/Home';
import Landing from '@pages/mainPage/Landing';
import { Route, Routes } from 'react-router-dom';
const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Landing />} />
			{/* <Route path='/home' element={<Home />} /> */}
		</Routes>
	);
};

export default App;
