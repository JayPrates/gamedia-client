/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

function Signup() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();
	const searchValue = document.getElementById("");

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const body = {
			username: username,
			password: password,
		};
		await axios.post(
			`${process.env.REACT_APP_SERVER_HOSTNAME}/signup`,
			body
		);
		toast.success("Signup sucessful");
		history.push("/projects");
	};

	return (
		<>
			<div css={styles}>
				<div className="authPageStyle">
					<h2 className="authTitle">Signup</h2>
					<form onSubmit={handleFormSubmit}>
						<label className="authSubTitle">Username</label>
						<input
							type="text"
							onChange={(e) => setUsername(e.target.value)}
							value={username}
							className="authTextStyle"
							required
						/>

						<label className="authSubTitle">Password</label>
						<input
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							className="authTextStyle"
							required
						/>
						<button type="submit" className="button">
							Signup
						</button>
					</form>
				</div>
			</div>
		</>
	);
}

const styles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 400px;
	font-family: sans-serif;

	.authPageStyle {
		width: 300px;
	}

	.authTitle {
		font-weight: 700;
	}

	.authSubTitle {
		font-weight: 600;
	}

	.authTextStyle[type="text"],
	.authTextStyle[type="password"] {
		width: 100%;
		padding: 10px 20px;
		margin: 10px 0;
		display: flex;
		flex-wrap: wrap;
		border: 2px solid #17a2b8;
		box-sizing: border-box;
	}

	.authTextStyle[type="text"]:focus,
	.authTextStyle[type="password"]:focus {
		background-color: #ddd;
		outline: none;
	}

	.button {
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
`;

export default Signup;
