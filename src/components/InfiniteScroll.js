import React, { useEffect, useState, useRef } from "react";
import ListGames from "./ListGames";

const containerStyle = {
	maxWidth: "1280px",
	margin: "0 auto",
};

function InfiniteScroll({ searchValue, setNavbarInvisible }) {
	const [postList, setPostList] = useState({
		list: [1, 2, 3, 4],
	});
	// tracking on which page we currently are
	const [page, setPage] = useState(1);
	// add loader refrence
	const loader = useRef(null);

	/* const [checkValue, setCheckValue] = useState(searchValue); */

	useEffect(() => {
		setPostList({
			list: [1],
		});
	}, [searchValue]);

	useEffect(() => {
		setNavbarInvisible(true);
	}, []);

	useEffect(() => {
		var options = {
			root: null,
			rootMargin: "20px",
			threshold: 1.0,
		};

		const observer = new IntersectionObserver(handleObserver, options);
		if (loader.current) {
			observer.observe(loader.current);
		}
		console.log("page", page);
	}, [searchValue]);

	useEffect(() => {
		// here we simulate adding new posts to List
		const newList = postList.list.concat([1, 1, 1, 1]);
		setPostList({
			list: newList,
		});
	}, [page]);

	// here we handle what happens when user scrolls to Load More div
	// in this case we just update page variable
	const handleObserver = (entities) => {
		const target = entities[0];

		if (target.isIntersecting) {
			setPage((page) => page + 1);
			console.log("pages", page);
		}
	};

	useEffect(() => {
		return () => {
			setNavbarInvisible(false);
			/* console.log('what is this', setNavbarInvisible) */
			console.log("Component is unmounting");
		};
	}, []);

	return (
		<div className="container" style={containerStyle}>
			<div className="post-list">
				{postList.list.map((post, index) => {
					return (
						<ListGames
							gamePage={index + 1}
							searchValue={searchValue}
						/>
					);
				})}

				{!searchValue && (
					<div className="loading" ref={loader}>
						<h2>Load More</h2>
					</div>
				)}
			</div>
		</div>
	);
}

export default InfiniteScroll;
