import ReviewSummaryButton from '@components/ReviewSummaryButton';
import NearbyStoreMap from '@components/kakaoMap';

const Landing = () => {
	return (
		<div>
			<NearbyStoreMap searchKeyword={'스타벅스'} />
			<ReviewSummaryButton />
		</div>
	);
};

export default Landing;
