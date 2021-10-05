import React, { useState } from "react";

const Liker = () => {
	const [count, setCount] = useState(0);

	return (
		<div className="like-button">
			<h1>Likes: {count}</h1>

			<button onClick={() => setCount(count === 0 ? count + 1 : 0)}>
				Like
			</button>
		</div>
	);
};

export default Liker;
