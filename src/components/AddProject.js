import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

function AddProject() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const history = useHistory();

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const body = {
			title,
			description,
			imageUrl: "http://placekitten.com/500/500",
		};
		await axios.post(
			`${process.env.REACT_APP_SERVER_HOSTNAME}/projects`,
			body
		);
		history.push("/projects");
	};

	return (
		<>
			<h2>Add Project</h2>
			<form onSubmit={handleFormSubmit}>
				<label>Title</label>
				<input
					type="text"
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>

				<label>Description</label>
				<input
					type="text"
					onChange={(e) => setDescription(e.target.value)}
					value={description}
				/>

				<button>Create</button>
			</form>
		</>
	);
}

export default AddProject;
