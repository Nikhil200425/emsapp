import {useState,useEffect,useRef} from "react";
import db from "./FbConfig";
import NavBar from "./NavBar";
import {useLocation} from "react-router-dom";
import { get,ref,child,update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Update()
{
	const loc = useLocation();
	const nav = useNavigate();
	const rId = useRef();
	const rName = useRef();
	const rSalary = useRef();
	const dbref = ref(db);
	const [id,setId] = useState("");
	const [name,setName] =useState("");
	const [salary,setSalary] = useState("");
	const [ans,setAns] = useState("");
	
	const hId = (event) => {setId(event.target.value);}
	const hName = (event) => {setName(event.target.value);}
	const hSalary = (event) => {setSalary(event.target.value);}

	useEffect ( () => {
		setId(loc.state.i);
		setName(loc.state.n);
		setSalary(loc.state.s);
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
		let data ={ id,name,salary };
		const r4 = ref(db,"employee/"+ (id))
		update(r4,data)
		.then( () => {	
			alert("Record Updated")
			setId("");
			setName("");
			setSalary("");
			
		})
		.catch(err => alert(err));
	
	}
	
	
	
	return(
	<>
	<center>
	<NavBar/>
	<h1>Update Page</h1>
	<form onSubmit={save}>
	<input type="text"placeholder="enter id"onChange={hId}value={id} disabled={true} ref={rId}/>
	<br/><br/>	
	
	<input type="text"placeholder="enter name"onChange={hName}value={name} ref={rName}/>
	<br/><br/>


	<input type="text"placeholder="enter salary"onChange={hSalary}value={salary} ref={rSalary}/>
	<br/><br/>
	
	<input type="submit" value="Update"/>
	<br/><br/>
	</form>
	<h1>{ans}</h1>
	</center>
	</>
	);


}