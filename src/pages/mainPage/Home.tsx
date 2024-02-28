import ReviewSummaryButton from '@components/ReviewSummaryButton';
import Selector from '@components/TimeDropdown';
import NearbyStoreMap from '@components/kakaoMap';

const Home = () => {
	return (
		<div
			style={{
				position: 'relative',
			}}
		>
			{/* <NearbyStoreMap searchKeyword={'오름'} /> */}
			{/* <NearbyStoreMap /> */}
			<Selector  />
		</div>
	);
};

export default Home;
