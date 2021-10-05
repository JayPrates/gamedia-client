/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import LikeButton from "./LikeButton";
import Liker from "./Liker";

function GamePage(props) {
	const [game, setGame] = useState({});
	const [tags, setTags] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [posts, setPosts] = useState([]);
	const history = useHistory();

	const gameId = props.match.params.id;

	useEffect(() => {
		console.log("fetching game");
		async function getGame() {
			const options = {
				method: "GET",
				url: `https://rawg-video-games-database.p.rapidapi.com/games/${gameId}?key=52adb4e8ceb54eac84d3538502ebe8f5`,
				headers: {
					"x-rapidapi-host":
						"rawg-video-games-database.p.rapidapi.com",
					"x-rapidapi-key":
						"3a37901a9amshcfee440bdbde618p19ae15jsndf5e6e59f232",
				},
			};

			const response = await axios.request(options);
			console.log("data", response.data);
			setGame(response.data);
			setTags(response.data.tags);
		}
		getGame();

		async function getPosts() {
			const allPosts = await axios.get(
				`http://localhost:5000/games/${gameId}`
			);
			setPosts(allPosts.data);
		}
		getPosts();
	}, []);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const body = {
			title: title,
			description: description,
			gameName: game.name,
		};
		await axios.post(`http://localhost:5000/games/${gameId}`, body);
		history.push("/games");
	};
	console.log("tags", tags);

	return (
		<>
			<div css={styles3}>
				<div className="imgWrap">
					<img
						src={game.background_image}
						className="gameImage"
						alt="game"
					/>

					<div className="gameDetails">
						<h2 className="gameTitle">{game.name}</h2>
						<div className="ratings">
							<div>Metacritic: {game.metacritic}</div>
							<div>Rating: {game.rating}</div>
						</div>
						<div className="tagImg">
							{tags.map((tag, index) => {
								if (index < 5) {
									return <div>{tag.name}</div>;
								}
							})}
						</div>
					</div>
				</div>
			</div>
			<div>{game.description_raw}</div>
			<h3>Make a Post</h3>
			<div css={styles} className="wrapForm">
				<div className="contentPost">
					<form onSubmit={handleFormSubmit}>
						<div className="post">
							<div>
								<label>Title</label>
							</div>

							<textarea
								className="options"
								type="text"
								onChange={(e) => setTitle(e.target.value)}
								value={title}
								placeholder="Write a post"
							/>
						</div>
						<div className="post">
							<label>Description</label>

							<textarea
								className="options"
								type="text"
								onChange={(e) => setDescription(e.target.value)}
								value={description}
								placeholder="With a description"
							/>
						</div>
						<div className="options">
							<button type="submit">Submit</button>
						</div>
					</form>
				</div>
			</div>
			<h3>Posts</h3>

			{posts.map((post) => {
				if (post.gameName === game.name) {
					let date = new Date(post.createdAt);
					return (
						<>
							<div css={styles2}>
								<div className="contentPost">
									<div className="post">
										<div>
											Posted by: {post.author}
											{post.createdAt && (
												<span>
													{" "}
													at:{" "}
													{date.toLocaleString(
														"default",
														{
															day: "2-digit",
															month: "short",
															year: "2-digit",
														}
													) +
														" " +
														date.getHours() +
														":" +
														String(
															date.getMinutes()
														).padStart(2, "0")}{" "}
												</span>
											)}
										</div>
										<div>
											<p>{post.title}</p>
										</div>
										<div className="commentPost">
											<p>{post.description}</p>
										</div>
										<br />
									</div>
									{/* <LikeButton /> */}
									<Liker />
								</div>
							</div>
						</>
					);
				}
			})}
		</>
	);
}

//Styles for Post Form
const styles = css`
	width: 100%;
	background: #151728;
	border-radius: 4px;
	.postNav {
		display: flex;
		padding: 22px;
		}
	}
	.post {
		color: #fff;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 22px 22px 5px 22px;
		font-size: 20px;
		font-weight: 700;

		img {
			width: 50px;
			height: 50px;
			display: block;
			margin-right: 30px;
			border-radius: 50px;
		}
		textarea {
			border: none;
			outline: none;
			background: transparent;
			color: #fff;
			width: 100%;
			word-break: break-all;
			&::placeholder {
				color: #5c5e6e;
				font-weight: 600;
			}
		}
	}


	.wrapForm {
		width: 500px;
		margin: auto;
		margin-top: 30px;
	}
	
	.options {
		padding-top: 10px;
		border-top: 1px solid #272a3a;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		resize: none;
		width: 100%;
		height: 55px;
		line-height: 1.5;

		.optionsContainer {
			display: flex;
			.item {
				margin-right: 14px;
				display: flex;
				img {
					margin-right: 10px;
					width: 20px;
					height: auto;
					display: block;
				}
				a {
					text-decoration: none;
					display: inline-block;
					font-size: 15px;
				}
			}
		}
		button {
			border: none;
			outline: none;
			background: #662bba;
			color: #fff;
			font-size: 18px;
			font-weight: 500;
			padding: 10px 24px;
			border-radius: 4px;
			box-shadow: 0 0 5px #4895ef;
			cursor: pointer;
			margin-bottom: 5px;
			margin-right: 20px;
			&:hover {
				background-color: #4895ef;
				color: #fff;
			}
		}
	}
`;

//Styles for posts list
const styles2 = css`
	width: 650px;
	background: #151728;
	border-radius: 15px;
	margin: auto;
	margin-bottom: 10px;
	
	.postNav {
		display: flex;
		padding: 22px;
		}
	}
	.post {
		color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 22px 22px 5px 22px;
		font-size: 28px;
		font-weight: 700;

.commentPost {
	font-size: 16px;
}

		img {
			width: 50px;
			height: 50px;
			display: block;
			margin-right: 30px;
			border-radius: 50px;
		}
		textarea {
			border: none;
			outline: none;
			background: transparent;
			color: #fff;
			width: 100%;
			word-break: break-all;
			&::placeholder {
				color: #5c5e6e;
				font-weight: 600;
			}
		}
	}

	`;

const styles3 = css`
	width: 100%;
	margin: auto;
	margin-bottom: 10px;
	border-radius: 4px;
	background: #151728;
	color: #fff;
	.gameTitle {
		font-size: 26px;
		font-weight: 700;
		margin-top: 0;
	}
	.ratings {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		font-size: 18px;
	}
	.gameImage {
		width: 30%;
		margin-bottom: 25px;
	}
	.imgWrap {
		display: flex;
		padding-top: 25px;
		padding-left: 10px;
	}
	.gameDetails {
		margin-left: 20px;
	}
	.gameDetails div {
		margin-right: 10px;
	}
`;

export default GamePage;
