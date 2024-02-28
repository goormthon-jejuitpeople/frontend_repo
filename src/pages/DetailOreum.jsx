import { useParams, useSearchParams } from 'react-router-dom';

const DetailOreum = () => {
	const { detailId } = useParams();
	console.log('page _id, detailId');
	const [searchParams] = useSearchParams();
	const queryList = [...searchParams];
	const oreumData = Object.fromEntries(queryList);
	console.log('oreumData', oreumData);
	return <div></div>;
};

export default DetailOreum;
