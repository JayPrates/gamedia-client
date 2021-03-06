/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function ListGames({ gamePage, searchValue}) {
	const [games, setGames] = useState([]);
	const [searchGames, setSearchGames] = useState([]);

	useEffect(() => {
		async function getAllGames() {
			if (searchValue === "") {
				const options = {
					method: "GET",
					url: `https://rawg-video-games-database.p.rapidapi.com/games?key=bce395cc71974b6fbace7273c418bce4&page=${gamePage}`,
					headers: {
						"x-rapidapi-host":
							"rawg-video-games-database.p.rapidapi.com",
						"x-rapidapi-key":
							"3a37901a9amshcfee440bdbde618p19ae15jsndf5e6e59f232",
					},
				};

				const response = await axios.request(options);
				if (searchValue !== "") {
					setGames([]);
				} else {
					setGames(response.data.results);
				}
			}
		}

		getAllGames();
	}, [searchValue]);


	useEffect(() => {
		async function getSearchGames() {
			if (searchValue !== "") {
				const search = {
					method: "GET",
					url: `https://rawg-video-games-database.p.rapidapi.com/games?key=bce395cc71974b6fbace7273c418bce4&search=${searchValue}`,
					headers: {
						"x-rapidapi-host":
							"rawg-video-games-database.p.rapidapi.com",
						"x-rapidapi-key":
							"3a37901a9amshcfee440bdbde618p19ae15jsndf5e6e59f232",
					},
				};

				const searchResponse = await axios.request(search);
				setSearchGames(searchResponse.data.results);
			}
		}

		getSearchGames();
	}, [searchValue]);

	useEffect(() => {
		return () => {
			console.log("Component is unmounting");
		};
	}, []);

	return searchValue === "" ? (
		<div className="gameListWrapper">
			<div css={styles}>
				{games.map((game) => {
					return (
						<>
							<div className="spacing" key={game.id}>
								<NavLink
									className="gameLink"
									to={`/games/${game.id}`}
								>
									<div className="imgPop">
										<img
											src={game.background_image}
											style={{ width: 250, height: 150 }}
											alt={game.id}
										/>
									</div>
									<div>
										<p>{game.name}</p>
									</div>
								</NavLink>
							</div>
						</>
					);
				})}
			</div>
		</div>
	) : (
		<div className="gameListWrapper">
			<div css={styles}>
				{searchGames.map((game) => {
					return (
						<>
							<div className="spacing">
								<NavLink
									className="gameLink"
									to={`/games/${game.id}`}
								>
									<div className="imgPop">
										<img
											src={game.background_image}
											style={{ width: 250, height: 150 }}
											alt={game.id}
										/>
									</div>
									<div>
										<p>{game.name}</p>
									</div>
								</NavLink>
							</div>
						</>
					);
				})}
			</div>
		</div>
	);
}

const styles = css`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	padding-left: 0px;
	margin-bottom: 0px;
	.gameListWrapper {
		display: flex;
	}
	.imgPop {
		background: none;
	}
	.imgPop:hover {
		transform: translate(10px, -10px);
		box-shadow: 0 5px 15px rgba(102, 43, 186, 0.6);
	}
	.imgPop:after {
		position: absolute;
		z-index: -1;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 1);
		transition: opacity 0.3s ease-in-out;
	}
	.gameLink {
		text-decoration: none;
		color: #fff;
		font-weight: 700;
	}
	.spacing {
		margin-bottom: 15px;
		width: 250px;
	}
`;

export default ListGames;
