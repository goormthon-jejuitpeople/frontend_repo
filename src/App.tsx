import ExchangeHome from '@pages/exchange/ExchangeHome';
import Home from '@pages/mainPage/Home';
import Landing from '@pages/mainPage/Landing';
import { Route, Routes } from 'react-router-dom';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Landing />} />
			<Route path='/home' element={<Home />} />
			<Route path='/exchange-home' element={<ExchangeHome />} />
		</Routes>
	);
};

export default App;
