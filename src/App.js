import logo from './logo.svg';
import './App.css';
import AdminLogin from "./AdminLogin";
import AdminSignUp from "./AdminSignUp";
import Create from "./Create";
import Information from "./Information";
import About from "./About";
import Update from "./Update";
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
	<BrowserRouter>
	<Routes>
	<Route path="/" element={<AdminLogin/>}/>
	<Route path="/adminSignUp"element={<AdminSignUp/>}/>
	<Route path="/create"element={<Create/>}/>
	<Route path="/information"element={<Information/>}/>
	<Route path="/about"element={<About/>}/>
	<Route path="/update"element={<Update/>}/>
	<Route path="*" element={<AdminLogin/>}/>
	</Routes>
	</BrowserRouter>
    </div>
  );
}

export default App;
