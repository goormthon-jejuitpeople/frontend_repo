import ReviewSummaryButton from '@components/ReviewSummaryButton';
import Selector from '@components/Selector';
import NearbyStoreMap from '@components/kakaoMap';

const Home = () => {
	return (
		<div
			style={{
				position: 'relative',
			}}
		>
			{/* <NearbyStoreMap searchKeyword={'오름'} /> */}
			<NearbyStoreMap />
		</div>
	);
};

export default Home;
