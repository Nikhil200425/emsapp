import NavBar from "./NavBar";
import { useState,useEffect } from "react";
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "./FbConfig";

export default function AdminSignUp()
{
	useEffect( () => {
		let un = localStorage.getItem("un");
		if (un != null)
		{
			nav("/information");
		}
	},[]);
	const nav = useNavigate();
	const [un,setUn] = useState("");
	const [pw1,setPw1] = useState("");
	const[pw2,setPw2] = useState("");
	
	const hUn = (event) => {setUn(event.target.value);}
	const hPw1 = (event) => {setPw1(event.target.value);}
	const hPw2 = (event) => {setPw2(event.target.value);}

	const save = (event) => {
		event.preventDefault();
		if (pw1 == pw2)
		{
			const auth = getAuth();
			createUserWithEmailAndPassword(auth,un,pw1)
			.then(res => nav("/"))
			.catch(err => alert("issue" + err));
		}
		else
		{
			alert("Password did not match");
			setPw1("");
			setPw2("");
		}
	}
	return(
	<>
	<center>
	<NavBar/>
	<h1>SignUp Page</h1>
	<form onSubmit = {save}>
	<input type="text"placeholder="Enter Email" onChange={hUn} value={un}/>
	<br/><br/>
	<input type="password"placeholder="Enter Password" onChange={hPw1} value={pw1}/>
	<br/><br/>
	<input type="password"placeholder="Enter Confirm Password" onChange={hPw2} value={pw2}/>
	<br/><br/>
	<input type="submit" value="Register"/>
	</form>
	</center>
	</>
	);
}