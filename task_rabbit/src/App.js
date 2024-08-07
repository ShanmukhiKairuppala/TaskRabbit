
import './App.css';
import React,{useState} from 'react';
import axios from 'axios';
// import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
// import Home from './Components/Home';
// import Register from './Components/Register';
// import Login from './Components/Login';

function App() {
  const [view, setView] = useState('home');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  // const [task, setTask] = useState('');
  // const [tasks, setTasks] = useState('');

  const register = async()=>{
      try{
        const response = await axios.post('http://localhost:5000/register', {email,password});
        setMessage(response.data.message);
        // setEmail('');
        // setPasssword('');
      }catch(error){
        setMessage('Registration failed');
      }
  };

  const login = async()=>{
    try{
      const response = await axios.post('http://localhost:5000/login', {email,password});
      setMessage(response.data.message);
      if(response.status === 200) setView('upload')
    }catch(error){
      setMessage('Login failed!');
    }
};

const handleUpload = async(e) =>{
  e.preventDefault();
  if(!file){
    setMessage('No file selected');
    return;
  }
  try{
    const response = await axios.post('http://localhost:5000/upload', {file});
    setMessage(response.data.message);
  }catch(error){
    setMessage('File Upload failed');
  }
};

  return (
    <center>
      {view === 'home' && (
        <>
        <h1>Task Rabbit</h1>
        <button onClick = {()=> setView('register')}>Register</button>
        <button onClick = {()=> setView('login')}>Login</button>
        </>
      )}

{view === 'register' && (
        <>
        <h1>Registration</h1>
        <input type = "email" value= {email} onChange ={(e)=> setEmail(e.target.value)} placeholder='Email'/>
        <input type = "password" value= {password} onChange ={(e)=> setPassword(e.target.value)} placeholder='password'/>

        <button onClick = {register}>Register</button>
        <button onClick = {()=> setView('home')}>Back</button>
        <p>{message}</p>
        </>
      )}

{view === 'login' && (
        <>
        <h1>Login</h1>
        <input type = "email" value= {email} onChange ={(e)=> setEmail(e.target.value)} placeholder='Email'/>
        <input type = "password" value= {password} onChange ={(e)=> setPassword(e.target.value)} placeholder='password'/>

        <button onClick = {login}>Login</button>
        <button onClick = {()=> setView('home')}>Back</button>
        <p>{message}</p>
        </>
      )}
     
     {view === 'upload' && (
        <>
        <h1>Upload images here</h1>
        <input type = "file" onChange = {(e)=>setFile(e.target.files[0])}/>

        <button onClick = {()=> setView('upload')}>Upload</button>
        <button onClick = {()=> setView('home')}>Back</button>
        <p>{message}</p>
        </>
      )}
     


    </center>

  );
}

export default App;
