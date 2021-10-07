/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";

function Profile({ loggedInUser }) {
	const history = useHistory();
	const [user, setUser] = useState({});
	const [image, setImage] = useState("");
	const [updatedImage, setUpdatedImage] = useState(false);
	const [fav, setFav] = useState([]);
	const [updateUser, setUpdateUser] = useState(false);

	useEffect(() => {
		async function getUser() {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_HOSTNAME}/profile`,
				{ withCredentials: true }
			);
			setUser(response.data);
		}
		getUser();
	}, [updatedImage]);

	console.log(loggedInUser);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		let response;
		if (image) {
			const uploadData = new FormData();
			uploadData.append("file", image);

			response = await axios.post(
				`http://localhost:5000/upload`,
				uploadData
			);
		}

		const body = {
			userImg: response.data.fileUrl,
		};

		await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/profile`, body, {
			withCredentials: true,
		});

		toast.success("Picture sucessful");
		setUpdatedImage(!updatedImage);
		history.push("/profile");
	};
	useEffect(() => {
		setFav(user.favoriteGames);
	}, [user]);

	useEffect(() => {
		setUpdateUser(!updateUser);
		return () => {
			console.log("Component is unmounting");
		};
	}, []);

	return (
		<>
			{fav && (
				<div css={styles}>
					<div className="user-container">
						<div className="img-container">
							<img src={user.userImg} alt="" />
						</div>

						<div className="wrapButton">
							<form onSubmit={handleFormSubmit}>
								<div className="imageUpload">
									<div className="backgroundForUpload">
										<label for="file-input">
											<img
												src="/upload.png"
												width="30px"
												height="35px"
											/>
										</label>
									</div>
								</div>
								<input
									id="file-input"
									type="file"
									onChange={(e) =>
										setImage(e.target.files[0])
									}
								/>
								<button className="" type="submit">
									Update Profile Picture
								</button>
							</form>
						</div>
					</div>

					<div className="games-container">
						Your favourite games, {user.username}
						<div className="games-list">
							{fav.map((favs) => {
								return (
									<NavLink
										className="navButton"
										activeStyle={{
											color: "white",
										}}
										exact
										to={`/games/${favs.favGameId}`}
									>
										&#160;
										{favs.favGameName}
									</NavLink>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

const styles = css`
	height: 300px;
	display: flex;

	button {
		border: none;
		outline: none;
		background: #662bba;
		color: #fff;
		font-size: 16px;
		font-weight: 500;
		padding: 8px 16px;
		border-radius: 4px;
		box-shadow: 0 0 5px #662bba;
		cursor: pointer;
		margin: 10px 0 5px -23px;
		&:hover {
			background-color: #4895ef;
			color: #fff;
		}
	}

	.wrapButton {
		width: 40px;
		margin-top: 10px;
	}

	.wrapButton input {
		display: none;
	}

	.backgroundForUpload {
		display: flex;
		justify-content: center;
		background-color: #fff;
		border-radius: 50%;
		&:hover {
			background-color: #662bba;
			color: #fff;
		}
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

	.user-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.img-container img {
		width: 225px;
		height: 225px;
		border-radius: 50%;
		padding: 5px;
	}

	.text-container {
		text-align: center;
	}

	.games-container {
		text-align: center;
		width: 75%;
		font-size: 22px;
	}

	.games-list {
		margin: 10px 40px 0 10px;
		border: 1px solid black;
		background-color: #151728;
		display: flex;
		flex-direction: column;
	}
	.games-list a {
		text-decoration: none;
		color: #fff;
		margin: 5px;
		&:hover {
			color: #4895ef;
		}
	}
`;

export default Profile;