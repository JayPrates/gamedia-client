import axios from "axios";
import React, {useState} from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const searchValue = document.getElementById('')

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const body = {
            username: username,
            password: password,
        }
        await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/signup`, body);
        toast.success('Signup sucessful');
        history.push('/projects')
    }


    return (
    <>
        <form onSubmit={handleFormSubmit}>
            <label>Username</label>
            <input type='text' onChange={(e) => setUsername(e.target.value)} value={username}></input>

            <label>Password</label>
            <input type='password' onChange={(e) => setPassword(e.target.value)} value={password}></input>
            <button type='submit'>Signup</button>
        </form>
    </>
    )
}

export default Signup;