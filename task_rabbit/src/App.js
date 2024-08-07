
import './App.css';
import React,{useState} from 'react';
import axios from 'axios';
// import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
// import Home from './Components/Home';
// import Register from './Components/Register';
// import Login from './Components/Login';

function App() {
  const [view, setView] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  // const [task, setTask] = useState('');
  // const [tasks, setTasks] = useState('');

  const register = async()=>{
      try{
        const response = await axios.post('http://localhost:5000/register', {email,password});
        setMessage(response.data.message);
      }catch(error){
        setMessage('Registration failed');
      }
  };

  const login = async()=>{
    try{
      const response = await axios.post('http://localhost:5000/login', {email,password});
      setMessage(response.data.message);
      if(response.status == 200) setView('tasks')
    }catch(error){
      setMessage('Login failed!');
    }
};


  return (
    <div>
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

        <button onClick = {login}>Register</button>
        <button onClick = {()=> setView('home')}>Back</button>
        <p>{message}</p>
        </>
      )}

    </div>

  );
}

export default App;
