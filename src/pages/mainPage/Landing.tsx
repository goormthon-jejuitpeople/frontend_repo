import ReviewSummaryButton from '@components/ReviewSummaryButton';
import NearbyStoreMap from '@components/kakaoMap';

const Landing = () => {
	return (
		<div
			style={{
				position: 'relative',
			}}
		>
			{/* <NearbyStoreMap searchKeyword={'오름'} /> */}
			<NearbyStoreMap />
			<ReviewSummaryButton />
		</div>
	);
};

export default Landing;
