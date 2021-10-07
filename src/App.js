import "./App.css";
import ListGames from "./components/ListGames";
import { Switch, Route } from "react-router";
import NavBar from "./components/NavBar";
import GamePage from "./components/GamePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "./components/InfiniteScroll";

function App() {
	const [loggedInUser, setCurrentLoggedInUser] = useState("");
	const [searchValue, setSearchValue] = useState("");
	const [navbarInvisible, setNavbarInvisible] = useState(true);



	useEffect(() => {
		async function checkLoggedIn() {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_HOSTNAME}/isloggedin`,
				{ withCredentials: true }
			);
			if (response.data.username) {
				setCurrentLoggedInUser(response.data);
			}
		}
		checkLoggedIn();
	}, []);



	return (
		<div className="App">
			<NavBar
				loggedInUser={loggedInUser}
				setCurrentLoggedInUser={setCurrentLoggedInUser}
				setSearchValue={setSearchValue}
				/* setNavbarInvisible={setNavbarInvisible} */
				navbarInvisible={navbarInvisible}
			/>
			<Switch>
				<Route
					exact
					path={["/", "/games"]}
					render={() => {
						return <InfiniteScroll  searchValue={searchValue} setNavbarInvisible={setNavbarInvisible} />;
					}}
				/>
				<Route exact path={"/games/:id"} component={GamePage} />
				<Route path="/signup" component={Signup} />
				<Route
					path="/login"
					render={() => {
						return (
							<Login
								setCurrentLoggedInUser={setCurrentLoggedInUser}
							/>
						);
					}}
				/>
				<Route exact path="/profile" render={() => {return <Profile loggedInUser={loggedInUser} setNavbarInvisible={setNavbarInvisible}/>}}/>
			</Switch>
		</div>
	);
}

export default App;
