import React from 'react';

const TagButton = ({ label, handleClick, active }) => {
	return (
		<button onClick={handleClick}>
			<p>{label}</p>
		</button>
	);
};

export default TagButton;
