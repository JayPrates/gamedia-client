/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login({ setCurrentLoggedInUser }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const body = {
			username,
			password,
		};
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_SERVER_HOSTNAME}/login`,
				body,
				{ withCredentials: true }
			);
			if (response.data.username) {
				toast.success("Login success");
				setCurrentLoggedInUser(response.data); //Comes from the app component
				history.push("/");
			}
		} catch (e) {
			toast.error("Invalid login");
		}
	};

	return (
		<>
			<div css={styles}>
				<div className="authPageStyle">
					<h2 className="authTitle">Login</h2>

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
							Login
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

export default Login;