import React, { Component } from 'react';
import Register from './Components/RegisterForm/Register'
import './App.css';
import { render } from '@testing-library/react';
import Login from './Components/Login Form/Login';
import Home from './Components/Home'
import Deposit from './Components/DepositForm/Deposit';

class App extends Component
{
  state={
showRegister:true,
showLogin:false,
showHome:false
  }
  handleClick=event=>{
     if(event==='login')
       this.setState({
        showRegister:false,
        showLogin:true,
        showHome:false
       });
       else if(event==='home')
       {
        this.setState({
          showHome:true,
          showLogin:false,
          showRegister:false
        })
       }
       else if(event!=='login' )
       {
         this.setState({
           showLogin:false,
           showRegister:true,
           showHome:false
         })
       }
  }
  render(){
    let register=this.state.showRegister ?<Register handleClick={(event)=>this.handleClick(event)}/>:null
    let login=this.state.showLogin ?<Login handleClick={(event)=>this.handleClick(event)}/>:null
    let home=this.state.showHome?<Home />:null
  return (
    <div className="App">
       {/* {register}
      {login}
      {home}
     */}
     <Home/>
    </div>
  );
}
}

export default App;