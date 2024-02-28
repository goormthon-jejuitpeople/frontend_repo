import NearbyStoreMap from '@components/kakaoMap';
import { relative } from 'path';

const Landing = () => {
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

export default Landing;
