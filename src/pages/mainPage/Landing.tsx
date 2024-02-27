import NearbyStoreMap from '@components/kakaoMap';

const Landing = () => {
	return (
		<div>
			<NearbyStoreMap searchKeyword={'스타벅스'} />
		</div>
	);
};

export default Landing;
