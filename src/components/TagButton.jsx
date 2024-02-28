/* eslint-disable react/prop-types */
// TagButton 컴포넌트 정의
const TagButton = ({ label, onClick, active, children }) => {
	const buttonClasses = `
    px-[0.7rem] py-[0.56rem]
    ${active ? 'bg-orange' : 'bg-[#F0F0F5]'}
    ${active ? 'text-white' : 'text-[#525463]'}
    border-none rounded-md cursor-pointer transition-colors duration-300 ease-in-out
    hover:bg-opacity-90
    shadow-md
		flex flex-col
		items-center
  `;

	return (
		<button className={buttonClasses} onClick={onClick}>
			{children}
			<p className='font-medium'>{label}</p>
		</button>
	);
};
export default TagButton;
