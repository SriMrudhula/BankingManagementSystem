import React, { Component } from 'react';
import './Deposit.css';
import Loan from '../Loan Form/Loan'
import axios from 'axios';
import { Redirect } from "react-router-dom";
class Deposit extends Component
{
  state={    
    users:[{
      id:"",
      name:"",
    username:"",
    password:"",
    address:"",
    country:"",
    state:"",
    email:"",
    contact:"",
    dob:"",
    accType:"",
    branchName:"",
    initialDeposit:"",
    identificationProofType:""}
  ],
  userErrors:[{
    nameError:"",
    usernameError:"",
    passwordError:"",
    addressError:"",
    countryError:"",
    stateError:"",
    emailError:"",
    contactError:"",
    dobError:"",
    accTypeError:"",
    branchNameError:"",
    initialDepositError:"",
    identificationProofTypeError:""
  }],
  deposit:"",
  redirect: null 
  }
  constructor(){
    super();
    this.state.users[0].id=localStorage.getItem("id");
    this.state.users[0].name= localStorage.getItem("name");
    this.state.users[0].username=localStorage.getItem("userName");
    this.state.users[0].password= localStorage.getItem("password");
    this.state.users[0].address=localStorage.getItem("address");
    this.state.users[0].country=localStorage.getItem("country");
    this.state.users[0].state=localStorage.getItem("state");
    this.state.users[0].email=localStorage.getItem("email");
    this.state.users[0].contact=localStorage.getItem("contact");
    this.state.users[0].dob=localStorage.getItem("dob");
    this.state.users[0].accType=localStorage.getItem("accType");
    this.state.users[0].branchName=localStorage.getItem("branchName");
    this.state.users[0].initialDeposit=localStorage.getItem("initialDeposit");
    this.state.users[0].identificationProofType=localStorage.getItem("identificationProofType");
    this.state.accountType=localStorage.getItem("accType"); 
  }
    handleChange =event=>{
        this.setState({
            [event.target.name]:event.target.value
        });
    };
       
    handleSubmit = event => {
        event.preventDefault();    
        this.state.users[0].initialDeposit=parseInt(this.state.users[0].initialDeposit,10)+parseInt(this.state.deposit,10);
        axios.put('http://localhost:3000/users/'+this.state.users[0].id,this.state.users[0])
        .then(respone =>{
            console.log(respone);
            alert("Your balance is " +this.state.users[0].initialDeposit);
            localStorage.setItem("initialDeposit",this.state.users[0].initialDeposit);
            this.setState({ redirect: "/home" });

        })
        .catch(error=>{
            console.log(error)
        })    
    };
    checkBalance=()=>{
      alert("Your Balance is "+this.state.users[0].initialDeposit);
      this.setState({ redirect: "/home" });
    }
    handleClick = event => {
      alert(event);
      this.props.handleClick(event);     
  };
    render()
    {
      if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
      }
    return (

        <div className="img3">
            <div className="b2">
                <div className="heading">Deposit</div><br/>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input type="text" value={this.state.users[0].name} name="name"/><br/><br/>
        <label>Account type</label>
        <select  value={this.state.users[0].accType} name="accType" onChange={this.handleChange} required>
            <option value="Salary Account">Salary Account</option>
            <option value="Saving Account">Saving Account</option>
        </select>
        <div className="err">{this.state.userErrors.accTypeError}</div><br/>
        <label>Deposit Amount</label>
        <input type="number" value={this.state.deposit} name="deposit" onChange={this.handleChange} required/>
        <div className="err">{this.state.userErrors.initialDepositError}</div><br/>
        <button className="btn">Deposit</button>
        </form> 
        </div>
        <div className="b2">
            <div className="heading">Balance</div><br/>
        <form >
          <div className="data">Do You Want to Check Balance?</div><br/><br/><br/><br/><br/>
        <button className="btn1" onClick={this.checkBalance}>Balance</button>
        </form> 
        </div>
        </div>
        
        )
    }
}

export default Deposit;