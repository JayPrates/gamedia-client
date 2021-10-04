/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Search from "antd/lib/input/Search";
import ListGames from "./ListGames";
import InfiniteScroll from "./InfiniteScroll";

function NavBar({ loggedInUser, setCurrentLoggedInUser, setSearchValue }) {

	const [search, setSearch] = useState('');

	const logoutUser = async () => {
		await axios.post(
			`${process.env.REACT_APP_SERVER_HOSTNAME}/logout`,
			null,
			{
				withCredentials: true,
			}
		);
		setCurrentLoggedInUser("");
	};

	useEffect (() => {
		console.log(search);
		setSearchValue(search);
		/* return(<>
		<ListGames searchBarVal={search}/>
		<InfiniteScroll searchBarVal={search}/>
		</>) */
	}, [search]);

	return loggedInUser ? (
		<>
			<div css={styles4}>
				<nav className="navStyle">
					<div>
						<button className="navBtn">
							<NavLink
								className="navButton"
								activeStyle={{ color: "white" }}
								exact
								to="/"
							>
								Home
							</NavLink>
						</button>
						{/* <Search className='searchBar' type='search' onChange={(e) => setSearch(e.target.value)} value={search}></Search> */}
						<input  className='searchBar' type='search' onChange={(e) => setSearch(e.target.value)} value={search} />
					</div>
					<div className="authFlex">
						<div className="welcome">
							<div>Welcome, {loggedInUser.username}!</div>
						</div>
						<div>
							<button className="navBtn">
								<NavLink
									onClick={logoutUser}
									className="navButton"
									activeStyle={{ color: "white" }}
									exact
									to="/"
								>
									Logout
								</NavLink>
							</button>
						</div>
					</div>
				</nav>
			</div>
		</>
	) : (
		<div css={styles4}>
			<nav className="navStyle">
				<div>
					<button className="navBtn">
						<NavLink
							className="navButton"
							activeStyle={{ color: "white" }}
							exact
							to="/"
						>
							Home
						</NavLink>
					</button>
				</div>
				<div className="authFlex">
					<div>
						<button className="authButton">
							<NavLink
								className="navButton"
								activeStyle={{ color: "white" }}
								exact
								to="/login"
							>
								Login
							</NavLink>
						</button>
					</div>
					<div>
						<button className="authButton">
							<NavLink
								className="navButton"
								activeStyle={{ color: "white" }}
								exact
								to="/signup"
							>
								Signup
							</NavLink>
						</button>
					</div>
				</div>
			</nav>
		</div>
	);
}

const styles4 = css`
	.navBtn {
		border: none;
		outline: none;
		background: #543a78;
		font-size: 18px;
		font-weight: 500;
		padding: 10px 24px;
		border-radius: 4px;
		box-shadow: 0 0 5px #543a78;
		cursor: pointer;
		margin-bottom: 5px;
		margin-right: 20px;
		&:hover {
			background-color: #4895ef;
			box-shadow: 0 0 5px #4895ef;
		}
	}

	.navButton {
		color: #fff;
		text-decoration: none;
	}

	.authButton {
		border: none;
		outline: none;
		background: #543a78;
		font-size: 18px;
		font-weight: 500;
		padding: 10px 24px;
		border-radius: 4px;
		box-shadow: 0 0 5px #543a78;
		cursor: pointer;
		margin-bottom: 5px;
		margin-right: 20px;
		&:hover {
			background-color: #4895ef;
			box-shadow: 0 0 5px #4895ef;
		}
	}

	.navStyle {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 10px;
	}

	.authFlex {
		display: flex;
		align-items: center;
	}

	.welcome {
		margin-right: 15px;
	}
`;

export default NavBar;