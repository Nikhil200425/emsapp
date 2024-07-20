import db from "./FbConfig";
import NavBar from "./NavBar";
import { get,ref,child,remove } from "firebase/database";
import { useState,useEffect } from "react"; 
import { useNavigate } from "react-router-dom";

export default function Information()
{
	const nav = useNavigate();
	const [info,setInfo] =useState([]);


	useEffect(()=>{
	const dbref = ref(db);

	get(child(dbref,"employee/"))
	.then((snapshot) => {
		if (snapshot.exists() ){
			setInfo([]);
			console.log(snapshot.val());
			const data = snapshot.val()
			if (data != null){
		Object.values(data).map((da) => {
			setInfo((oldArray) => [...oldArray,da]);
		});
		}
	}
	else
	{
		console.log("no data");
	}
})

},[])
	const delStu = (id) => {
		const r3 = ref(db,"employee/"+ id)
		remove(r3)
		.then ( () => {
			alert("record deleted");
			window.location.reload();
		})
		.catch ( err => console.log(err) );
	}
	const updateEmp = (i, n, s) => {
		nav("/update",{state:{i:i, n:n, s:s}})
	}
	
	const lo = (event) => {
		event.preventDefault();
		localStorage.clear()
		nav("/adminLogin");
	}



	return(
	<>
	<center>
	<NavBar/>
	<h1>Employee's Information</h1>
	<table border="5" style={{width:'50%'}}>
		<tr>
			<th>Id</th>
			<th>Name</th>
			<th>Salary</th>
			<th>Update</th>
			<th>Delete</th>
		</tr>
		{
			info.map((e =>
			<tr style={{"text-align":"center"}}>
				<td>{e.id}</td>
				<td>{e.name}</td>
				<td>{e.salary}</td>
				<td><button onClick = { () => {updateEmp(e.id, e.name, e.salary);}}>Update</button></td>
				<td> <button onClick = { () => {
	if (window.confirm('Are u Sure???')) delStu(e.id) }}> Delete </button></td>
			</tr>
			))
		}
	</table>
	<br/><br/>
	<form onSubmit={lo}>
	<input type="submit" value="Logout"/>
	</form>
	</center>
	</>
	);
}
	