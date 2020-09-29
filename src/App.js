import React, { Component } from 'react';
import Register from './Components/RegisterForm/Register'
import './App.css';
import { render } from '@testing-library/react';
import Login from './Components/Login Form/Login';
import Home from './Components/Home'
import Deposit from './Components/Deposit Form/Deposit';

class App extends Component
{
  state={
showRegister:true,
showLogin:false
  }
  handleClick=event=>{
    console.log(event);

    if(event==='login')
       this.setState({
        showRegister:false,
        showLogin:true
       });
       else if(event!=='login')
       {
         this.setState({
           showLogin:false,
           showRegister:true
         })
       }
  }
  render(){
    let register=this.state.showRegister ?<Register handleClick={(event)=>this.handleClick(event)}/>:null
    let login=this.state.showLogin ?<Login />:null
  return (
    <div className="App">
      <h1>Banking Management System</h1>
      {register}
      {login}
      {/* <Deposit/> */}
      {/* <Login/> */}

    </div>
  );
}
}

export default App;
