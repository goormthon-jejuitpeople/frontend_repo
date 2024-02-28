import { useParams, useSearchParams } from 'react-router-dom';
import logo from '../assets/logo.png';
const DetailOreum = () => {
	const { detailId } = useParams();
	console.log('page _id, detailId');
	const [searchParams] = useSearchParams();
	const queryList = [...searchParams];
	const oreumData = Object.fromEntries(queryList);
	console.log('oreumData', oreumData);
	return (
		<main>
			<header className='bg-[#FFF9F6] flex justify-center pt-6 pb-4'>
				<img src={logo} />
			</header>
			<section>
				<div className='h-48 overflow-hidden '>
					<img className='w-full h-full' src={oreumData.imgPath} />
				</div>
				<div></div>
			</section>
		</main>
	);
};

export default DetailOreum;
