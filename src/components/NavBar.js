/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Search from "antd/lib/input/Search";
import ListGames from "./ListGames";
import InfiniteScroll from "./InfiniteScroll";

function NavBar({ loggedInUser, setCurrentLoggedInUser, setSearchValue, navbarInvisible }) {
	const [search, setSearch] = useState("");

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

	useEffect(() => {
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
					<div className='wrapHomeSch'>
						<button className="navBtn">
							<NavLink
								className="navButton"
								activeStyle={{ color: "white" }}
								exact
								to="/"
							>
								Gamidia
							</NavLink>
						</button>
						{/* <Search className='searchBar' type='search' onChange={(e) => setSearch(e.target.value)} value={search}></Search> */}
						{navbarInvisible  && <input
							className="searchBar"
							type="search"
							onChange={(e) => setSearch(e.target.value)}
							value={search}
							placeholder="Search for a game"
						/>}
					</div>

					<div className="authFlex">
						<div className="welcome">
							<a href="/profile" style={{ color: "white" }}>
								<div>
									<img
										src={loggedInUser.userImg}
										alt=""
										style={{
											width: "35px",
											height: "35px",
											borderRadius: "50%",
										}}
									></img>
								</div>
								<div className="userNameNav">
									{loggedInUser.username}
								</div>
							</a>
						</div>
						<div>
							<button className="navBtnLogout">
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
		<div css={styles5}>
			<nav className="navStyle2">
				<div>
					<button className="navBtn">
						<NavLink
							className="navButton"
							activeStyle={{ color: "white" }}
							exact
							to="/"
						>
							Gamidia
						</NavLink>
					</button>
				</div>
				<div className="authFlex">
					<div>
						<button className="authButton">
							<NavLink
								className="navButtonSL"
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
								className="navButtonSL"
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
	.wrapHomeSch{
		align-items: flex-start;
	}

	.navBtnLogout {
		border: none;
	outline: none;
	background: #543a78;
	font-size: 18px;
	font-weight: 500;
	padding: 10px 8px;
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

	.userNameNav {
		margin-left: 5px;
	}

	a {
		color: white;
		display: flex;
		align-items: center;
		text-decoration: none;
	}

	.navBtnProfile {
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

	.navProfile {
		color: #fff;
		text-decoration: none;
	}

	.navButton {
		font-family: 'Press Start 2P', cursive;
		color: #fff;
		text-decoration: none;
	}

	.navButtonSL{
		font-family: 'Press Start 2P', cursive;
		color: #fff;
		text-decoration: none;
	}

	.navButtonLogin{
		font-size: 10px
		font-family: 'Press Start 2P', cursive;
		color: #fff;
		text-decoration: none;
	}

	.authButton {
		border: none;
		outline: none;
		background: #543a78;
		font-size: 18px;
		font-weight: 500;
		padding: 10px 7px;
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

	.navStyle2 {
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

	input {
		font-size: 16px;
		border: none;
		outline: none;
		::placeholder {
			color: black;
		}
	}
	input.searchBar {
		font-family: monospace;
		background-color: #fff;
		padding: 13px 26px 7px;
		border-radius: 5px;
	}
`;

const styles5 = css`
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

	.navBtnLogout {
		border: none;
	outline: none;
	background: #543a78;
	font-size: 18px;
	font-weight: 500;
	padding: 10px 8px;
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

	.userNameNav {
		margin-left: 5px;
	}

	a {
		color: white;
		display: flex;
		align-items: center;
		text-decoration: none;
	}

	.navBtnProfile {
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

	.navProfile {
		color: #fff;
		text-decoration: none;
	}

	.navButton {
		font-family: 'Press Start 2P', cursive;
		color: #fff;
		text-decoration: none;
	}

	.navButtonSL{
		font-family: 'Press Start 2P', cursive;
		color: #fff;
		text-decoration: none;
	}

	.navButtonLogin{
		font-size: 10px
		font-family: 'Press Start 2P', cursive;
		color: #fff;
		text-decoration: none;
	}

	.authButton {
		border: none;
		outline: none;
		background: #543a78;
		font-size: 18px;
		font-weight: 500;
		padding: 10px 7px;
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

	.navStyle2 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 5px;
		margin-top: 5px;
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