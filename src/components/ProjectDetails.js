import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function ProjectDetails({ match }) {
	const [project, setProject] = useState({});
	const history = useHistory();

	useEffect(() => {
		async function getProjectDetails() {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_HOSTNAME}/projects/${match.params.id}`
			);
			setProject(response.data);
		}
		getProjectDetails();
	}, []);

	const handleDeleteProject = async (id) => {
		await axios.delete(
			`${process.env.REACT_APP_SERVER_HOSTNAME}/projects/${id}`
		);
		history.push("/");
	};

	return (
		<>
			<h2>{project.title}</h2>
			<h3>{project.description}</h3>
			<button onClick={() => handleDeleteProject(project._id)}>
				Delete
			</button>
		</>
	);
}

export default ProjectDetails;
