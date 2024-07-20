import NavBar from "./NavBar";
import { useState,useEffect } from "react";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "./FbConfig";

export default function AdminLogin()
{
	useEffect( () => {
		let un = localStorage.getItem("un");
		if (un != null)
		{
			nav("/create");
		}
	},[]);
	const nav = useNavigate();
	const [un,setUn] = useState("");
	const [pw1,setPw1] = useState("");
	
	const hUn = (event) => {setUn(event.target.value);}
	const hPw1 = (event) => {setPw1(event.target.value);}

	const check = (event) => {
		event.preventDefault();
		
		const auth = getAuth();
		signInWithEmailAndPassword(auth,un,pw1)
		.then( res => {
			localStorage.setItem("un",un);
			nav("/create");
		})
		.catch(err => {
			if( un == "" )
			{
				alert("username is mandatory");
				return;
			}
			if(pw1 == "" )
			{
				alert("Password is mandatory");
				return;
			}
			if (err.code === 'auth/wrong-password') {
          			alert('Incorrect password. Please try again.');
				return;
			}
			if (err.code === 'auth/invalid-email') {
          			alert('Incorrect Email. Please try again.');
				return;
			}
		});
	};
	return(
	<>
	<center>
	<NavBar/>
	<h1>Login Page</h1>
	<form onSubmit={check}>
	<input type="text" placeholder="Enter Email" onChange={hUn} value={un}/>
	<br/><br/>
	<input type="password" placeholder="Enter Password" onChange={hPw1} value={pw1}/>
	<br/><br/>
	<input type="submit" value="Login"/>
	</form>
	</center>
	</>
	);
}