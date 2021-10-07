/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "animate.css"
import { whileStatement } from "@babel/types";

// import { Card } from "@mui/material";

function GamePage(props) {
	const [game, setGame] = useState({});
	const [tags, setTags] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [posts, setPosts] = useState([]);
	const history = useHistory();
	const [postId, setPostId] = useState("");
	const [image, setImage] = useState("");
	const [comment, setComment] = useState('');

	const gameId = props.match.params.id;

	const [likes, setLikes] = useState("");
	const [refreshPosts, setRefreshPosts] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		console.log("fetching game");
		async function getGame() {
			const options = {
				method: "GET",
				url: `https://rawg-video-games-database.p.rapidapi.com/games/${gameId}?key=bce395cc71974b6fbace7273c418bce4`,
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
				`${process.env.REACT_APP_SERVER_HOSTNAME}/games/${gameId}`,
				{ withCredentials: true }
			);
			setPosts(allPosts.data);
		}
		getPosts();
	}, [refreshPosts]);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		let response;
		if (image) {
			const uploadData = new FormData();
			uploadData.append("file", image);

			response = await axios.post(
				`${process.env.REACT_APP_SERVER_HOSTNAME}/upload`,
				uploadData
			);
		}
		const body = {
			title: title,
			description: description,
			gameName: game.name,
			likes: 0,
			mediaUrl: response && response.data.fileUrl,
		};
		await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/games/${gameId}`, body, {
			withCredentials: true,
		});
		history.push(`/games/${gameId}`);
		setRefreshPosts(!refreshPosts);
	};

	const handleCommentSubmit = async (e, post) => {
		e.preventDefault();
		console.log('this is the comment', comment)
		const body = {
			comments: comment,
		}

		await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/comments/${post._id}`, body, {
			withCredentials: true,
		});
		setRefreshPosts(!refreshPosts);
	}

	const getClickHandler = async (post) => {
		const body = {
			postId,
		};
		await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/post/${post._id}`, body, {
			withCredentials: true,
		});
		//Calling after axios so it updates the posts first
		setRefreshPosts(!refreshPosts);
	};

	const getFavoriteHandler = async (game) => {
		console.log(game)
		const body = {
			favoriteGames: { favGameName: game.name, favGameId: game.id },
		};
		setIsVisible(!isVisible)
		console.log(isVisible);
		await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/favorite`, body, {
			withCredentials: true,
		});
		//Calling after axios so it updates the posts first
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
						<div className='wrapTitleAndStar'>
							<div className='gameTitle'>
								{game.name}
							</div>
							<div key={isVisible} className={isVisible ? 'animate__animated animate__bounce' : 'random'}>
								<div className='favoriteWrap' style={isVisible ? { backgroundColor: 'yellow' } : { backgroundColor: 'white' }}>
									<input
										type="image"
										src='/star.png' width='20px' height='20px'
										onClick={() =>
											getFavoriteHandler(game)
										}
									/>
								</div>
							</div>
						</div>
						<div className="ratings">
							<div>Metacritic: {game.metacritic}</div>
							<div>Rating: {game.rating}</div>
						</div>
						<div className="tags">
							<label>Tags:</label>
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
			<div css={styles4}>
				<div className="gameDesc">{game.description_raw}</div>
			</div>
			<h3>Make a Post</h3>
			<div css={styles} className="wrapForm">
				<div className="contentPost">
					<form onSubmit={handleFormSubmit}>
						<div className="post">
							<div className='wrapper'>
								<div>
									<label>Title</label>
								</div>
								<div className='wrapButton'>
									<div className="image-upload">
										<div className='backgroundForUpload'>
											<label for="file-input">
												<img src="/upload.png" width='15px' height='15px' />
											</label>
										</div>
									</div>


									<input
										id='file-input'
										type="file"
										onChange={(e) => setImage(e.target.files[0])}
									/>
								</div>
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
									<div className="postForm">
										<div className="centerWrap">
											<div className="wrapPicAndName">
												{post.userImg && (
													<img src={post.userImg} />
												)}
												<div>
													{post.author}
													<div>
														{post.createdAt && (
															<span>
																Post created:{" "}
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
																	).padStart(
																		2,
																		"0"
																	)}{" "}
															</span>
														)}
													</div>
												</div>
											</div>
										</div>
										<div className="postTitle">
											<p>{post.title}</p>
										</div>
										<div className="commentPost">
											<p>{post.description}</p>
										</div>
									</div>
									<div className="mediaFile">
										{post.mediaUrl &&
											post.mediaUrl.includes("video")
											? post.mediaUrl && (
												<video
													width="320"
													height="240"
													controls
													src={post.mediaUrl}
													type="video/mp4"
												></video>
											)
											: post.mediaUrl && (
												<img
													className="postImg"
													style={{
														width: 350,
														height: 250,
													}}
													src={post.mediaUrl}
												/>
											)}
									</div>
									<br />
									<div className="likes">
										<div>
											<button
												type="button"
												onClick={(e) =>
													getClickHandler(post)
												}
											>
												Like
											</button>
										</div>
										{post.likes > 0 && (
											<div>{post.likes}</div>
										)}
									</div>
									<div>
										<form onSubmit={(e) => handleCommentSubmit(post)}>
											<label>Comment</label>
											<textarea className="options"
												key={post.id}
												type="text"
												onChange={(e) => setComment(e.target.value)}
											/>
											<button
												type="button"
												onClick={(e) =>
													handleCommentSubmit(e, post)
												}
											>
												Send
											</button>
										</form>
										<div>
											{post.comments.map((comment) => {
												return (
													<>
														{comment.theUser && <div css={styles5}>
															<br />
															<div className='postComments'>
																<div className='commentDetails'>
																	{comment.theUserImg && <img className='commentUserImg' src={comment.theUserImg} width='40px' height='40px' />}
																	{comment.theUser && <div className='commentUserName'>{comment.theUser}</div>}
																</div>
															</div>
															<div className='userComment'>
																<div>{comment.thisComment}</div>
															</div>
														</div>}
													</>)
											})}
										</div>
									</div>
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


	.wrapButton input {
  display: none;
}

.wrapper {
	width: 100%;
	display: flex;
    justify-content: space-between;
}


	.backgroundForUpload {
		display: flex;
    	justify-content: center;
	}

	.image-upload {
		width: 25px;
    	background-color: white;
    	border-radius: 50%;
		&:hover {
			background-color: #662bba;
			color: #fff;
		}
	}

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

		
		.gameImage {
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
	.mediaFile {
		display: flex;
		justify-content: center;
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
				.gameImage {
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

	h3 {
		display: flex;
    	justify-content: center;
	}
`;

//Styles for posts list
const styles2 = css`
	width: 650px;
	background: #151728;
	border-radius: 15px;
	margin: auto;
	margin-bottom: 10px;

	.centerWrap {
		font-size: 20px;
    	padding-top: 10px;
		font-weight: 700;
		padding-bottom: 10px;
	}

	.centerWrap span {
		font-size: 14px;
	}

	.postTitle {
		font-size: 16px;
		width: 100%;
		border-top: 1px solid #272a3a;
	}

	.wrapPicAndName {
		display: flex;
		align-items: center;
	}

	.wrapPicAndName img{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-right: 10px;
	}
	
	.postNav {
		display: flex;
		padding: 22px;
		}
	}
	.likes{
		display: flex;
		padding: 15px;
	}
	.postForm {
		color: #fff;
		display: flex;
		flex-direction: column;
		align-items: flex-start;;
		padding: 0px 22px 5px 22px;
		font-size: 28px;
		font-weight: 700;

.commentPost {
	font-size: 14px;
}


.gameImage {
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
	}`;

const styles3 = css`
	width: 100%;
	margin: auto;
	margin-bottom: 10px;
	border-radius: 4px;
	background: #151728;
	color: #fff;

	.wrapTitleAndStar{
		display: flex;
	}

	.gameTitle {
		font-size: 26px;
		font-weight: 700;
		margin-top: 0;
	}
	.favoriteWrap {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 25px;
		height: 25px;
		border-radius: 50%;
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

	.tagImg {
		display: flex;
		flex-direction: row;
		padding-top: 10px;
	}

	.tagImg div {
		border: 0.5px solid white;
		border-radius: 15px;
		padding: 5px 7px 5px 7px;
	}

	.tags {
		margin-top: 20px;
	}
`;

const styles4 = css`
	width: 90%;
	margin: auto;
	background: #151728;
	border-radius: 20px;
	padding-top: 10px;
	padding-bottom: 10px;

	.gameDesc {
		display: flex;
		justify-content: center;
		width: 1200px;
		margin: auto;
		padding: 5px;
		font-size: 16px;
	}

`;

const styles5 = css`
	border-top: 1px solid #272a3a;
	margin-top: 20px;

	.postComments {
    	padding-left: 15px;
	}

	.postComments {
		display: flex;
    	align-items: center;
	}

	.commentDetails{
		display: flex;
		align-items: center;
	}

	.img{
		padding-left: 10px;
	}

	.userComment {
		padding: 20px;
	}

	.commentUserImg {
		border-radius: 50%;
	}

	.commentUserName {
		padding-left: 10px;
	}

`;

export default GamePage;
