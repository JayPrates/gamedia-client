/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

function Profile() {
	const history = useHistory();
	const [user, setUser] = useState({});
	const [image, setImage] = useState("");
	const [updatedImage, setUpdatedImage] = useState(false);

	useEffect(() => {
		async function getUser() {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_HOSTNAME}/profile`,
				{ withCredentials: true }
			);
			setUser(response.data);
			console.log(response.data);
		}
		getUser();
	}, [updatedImage]);

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

		await axios.put(`http://localhost:5000/profile`, body, {
			withCredentials: true,
		});

		toast.success("Picture sucessful");
		setUpdatedImage(!updatedImage);
		history.push("/profile");
	};

	return (
		<>
			{user && (
				<div css={styles}>
					<div className="user-container">
						<div className="img-container">
							<img src={user.userImg} alt="" />
						</div>
						<div className="text-container">
							<h3>{user.username}</h3>
							<h4>An about section?</h4>
							<form onSubmit={handleFormSubmit}>
								<input
									type="file"
									onChange={(e) =>
										setImage(e.target.files[0])
									}
								/>
								<button type="submit">
									Update Profile Picture
								</button>
							</form>
						</div>
					</div>

					<div className="games-container">
						Insert favorite games
						<div className="games-list">
							<ul>Game 1</ul>
							<ul>Game 2</ul>
							<ul>Game 3</ul>
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
	}

	.games-list {
		margin: 10px 40px 0 10px;
		border: 1px solid black;
		border-radius: 20px;
		background-color: #151728;
	}
`;

export default Profile;