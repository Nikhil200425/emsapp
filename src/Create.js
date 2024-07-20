import db from "./FbConfig";
import NavBar from "./NavBar";
import { useState,useEffect,useRef } from "react";
import { ref,set,get,child } from "firebase/database";
import { useNavigate } from "react-router-dom";

export default function Create ()
{
	const nav = useNavigate();
	const rId = useRef();
	const rName = useRef();
	const rSalary = useRef();
	const [id,setId]=useState("");
	const [user,setUser] = useState("");
	const [name,setName]=useState("");
	const [salary,setSalary]=useState("");
	
	const hId = (event) => { setId(event.target.value);}
	const hName = (event) => { setName(event.target.value);}
	const hSalary = (event) => { setSalary(event.target.value);}

	useEffect( () => {
		let un = localStorage.getItem("un");
		if(un != null)
		{
			setUser(un);
		}
		else
		{
			nav("/");
		}
	},[]);
	
	const save = (event) => {
		event.preventDefault();
		if(id == "" )
		{
			alert("Id cannot not be empty");
			setId("");
			return;
		}
		if(id.trim().length == 0)
		{
			alert("Id cannot be contain spaces");
			setId("");
			return;
		}
		if(id<1)
		{
			alert("Id cannot be negative or zero");
			setId("");
			return;
		}
		if(id.match(/^[A-Za-z@#$!"";]+$/)){
				alert("Id contain only numbers")
				setId("");
				rId.current.focus();
				return;
			}
		if(name == "" )
		{
				alert("name cannot be empty !!")
				setName("");
				rName.current.focus();
				return;
			}
		if(name.trim().length==0)
			{
				alert("name cannot be contain spaces !!")
				setName("");
				rName.current.focus();
				return;
			}
		if(name.length<2)
			{
				alert("Minimum 2 letters required !!")
				setName("");
				rName.current.focus();
				return;
			}
		if(!name.match(/^[A-Za-z ]+$/)){
				alert("Name contain only alphabets")
				setName("");
				rName.current.focus();
				return;
			}
		if(salary == "" )
		{
			alert("Salary cannot not be empty");
			setSalary("");
			return;
		}
		if(salary.trim().length == 0)
		{
			alert("Salary cannot be contain spaces");
			setSalary("");
			return;
		}
		if(salary<1)
		{
			alert("Salary cannot be negative or zero");
			setSalary("");
			return;
		}
		if(salary.match(/^[A-Za-z@#$!"";]+$/)){
				alert("Salary contain only numbers")
				setSalary("");
				rSalary.current.focus();
				return;
			}
		const r1 = ref(db);
		get(child(r1,"employee/"+id))
		.then( (snapshot) => {
			if (snapshot.exists())
			{
				alert(id+" already exists");
				setId("");
				setName("");
				setSalary("");
			}
			else
			{
				let data ={ id,name,salary };
				const r2 = ref(db,"employee/" + id);
				set(r2,data);
				alert("Record Created");
				setId("");
				setName("");
				setSalary("");
			}
		})
		.catch(err => console.log(err));
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
	<h2>{ user }</h2>
	<form onSubmit={lo}>
	<input type="submit" value="Logout"/>
	</form>
	<hr/>
	<h1>Enter Employee Info</h1>
	<form onSubmit={save}>
	<input type="text"placeholder="Enter Employee Id" onChange={hId} value={id} ref={rId} />
	<br/><br/>
	<input type="text"placeholder="Enter Name" onChange={hName} value={name} ref={rName} />
	<br/><br/>
	<input type="text"placeholder="Enter salary" onChange={hSalary} value={salary} ref={rSalary} />
	<br/><br/>
	<input type="submit" value="save"/>
	</form>
	</center>
	</>
	);
}





