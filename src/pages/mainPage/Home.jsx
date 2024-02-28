import ReviewSummaryButton from '@components/ReviewSummaryButton';
import TagButton from '@components/TagButton';
import NearbyStoreMap from '@components/kakaoMap';
import RecommendationForm from '@pages/RecommendationForm';

const Home = () => {
	return (
		<div
			style={{
				position: 'relative',
			}}
		>
			{/* <NearbyStoreMap searchKeyword={'오름'} /> */}
			{/* <NearbyStoreMap /> */}
			<RecommendationForm />
		</div>
	);
};

export default Home;
