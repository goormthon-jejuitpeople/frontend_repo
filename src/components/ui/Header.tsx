import { SlArrowLeft } from 'react-icons/sl';

interface HeaderProps {
	headline: string; // Header 작성할 내용
	navigaterOff?: boolean; // 뒤로가기 버튼 없앨 거면 props로 넘겨주면됨.
	children?: React.ReactNode; // Header 추가 이모티콘 필요할 시 자식props로 넘김
}
const Header = ({ headline, navigaterOff, children }: HeaderProps) => {
	return (
		<>
			<header className='flex fixed  bg-white w-[23.4375rem] py-2 pl-2  h-auto shadow-sm '>
				<div className='flex items-center'>
					{navigaterOff === undefined && <SlArrowLeft size='20' />}
					<div className='mx-2 title-s'>{headline}</div>
					{children}
				</div>
			</header>
		</>
	);
};
export default Header;
