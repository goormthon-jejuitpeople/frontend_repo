import Header from '@components/ui/Header';
import { IoIosSearch, IoMdNotificationsOutline } from 'react-icons/io';

const Home = () => {
	return (
		<>
			<Header headline='스위치콘'>
				<IoIosSearch />
				<IoMdNotificationsOutline />
			</Header>
			<p className='text-lg'>히하</p>
		</>
	);
};

export default Home;
