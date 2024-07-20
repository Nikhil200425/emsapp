import { Link } from "react-router-dom";

export default function NavBar()
{
	const un = localStorage.getItem("un");
	return(
	<>
	<center>
	<div className="nav">
		{(un == null ) && (<Link to="/">AdminLogin</Link>) }
		{(un==null) && (<Link to="/adminSignUp">AdminSignUp</Link>) }
		{(un!=null) && (<Link to="/create">Create</Link>) }
		{(un!=null) && (<Link to="/information">Information</Link>) }
		{(un==null) && (<Link to="/about">About</Link>) }
	</div>
	</center>
	</>
	);
}
