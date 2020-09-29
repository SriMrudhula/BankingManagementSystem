import React, { Component } from 'react';
import './Register.css';
import AppBar from '@material-ui/core/AppBar';
import axios from 'axios';
import Login from '../Login Form/Login';
import { BrowserRouter, Route } from 'react-router-dom'

class Register extends Component
{
    state={    
        users:[{name:"",
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
      }]    ,    
      statesByCountry : {
        India: ["Andhra Pradesh","Puri","Cuttack"],
        USA: ["Teaxs","Pune","Nagpur"],
        UK: ["kochi","Kanpur"]
        }
    }
    handleChange =event=>{
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    validate = () => {
       let nameError=""
       let usernameError=""
       let passwordError=""
       let addressError=""
       let countryError=""
       let stateError=""
       let emailError=""
       let contactError=""
       let dobError=""
       let accTypeError=""
       let branchNameError=""
       let initialDepositError=""
       let identificationProofTypeError=""
       if(!(this.state.email.includes("@") && this.state.email.includes(".com"))){
           emailError='invalid email';
           if(!this.state.name.includes("^[a-zA-Z]+$")){
               nameError="Please enter "
           }
           else
               nameError=""
           if(!this.state.username){
            usernameError="Please enter Username"
        }
        else
          usernameError=""
        if(!this.state.password){
            passwordError="Please enter Password"
        }
        else
           passwordError="";
        if(this.state.contact.length!==10){
            contactError="Please Enter Correct Contact"
        }
        if(!this.state.dob){
            dobError="Please enter Date of birth"
        }
        if(!this.state.accType){
            accTypeError="Please enter Account Type"
        }
        if(!this.state.branchName){
            branchNameError="Please enter Contact"
        }
       }
        if(emailError){
            this.setState({nameError,usernameError,passwordError,addressError,countryError,
                stateError,emailError,contactError,dobError,accTypeError,branchNameError,
                initialDepositError,identificationProofTypeError});
            return false;
        }
        return true;
    };

        makeSubmenu = value => {
        if(value.length==0) document.getElementById("stateSelect").innerHTML = "<option></option>";
        else {
        var stateOptions = "";
        console.log("hai.................."+this.state.country);
        stateOptions+="<option>Choose State</option>"
        for(let stateId in this.state.statesByCountry[value]) {
        stateOptions+="<option>"+this.state.statesByCountry[value][stateId]+"</option>";
        }
        document.getElementById("stateSelect").innerHTML = stateOptions;
        console.log(stateOptions);
        }
        }
    handleSubmit = event => {
        event.preventDefault();
        const isValid=this.validate();
        if(isValid){
        console.log(this.state);
        axios.post('http://localhost:3000/users',this.state.users)
        .then(respone =>{
            console.log(respone)
            this.handleClick("login");  
        })
        .catch(error=>{
            console.log(error)
        })
        }
    };
      handleLogin=()=>
      {
        this.handleClick("login");  
      }
  handleClick = event => {
        this.props.handleClick(event);     
    };   
    render()
    {
    return (
        <div className="img1">
            <div className="b1">
                <div className="heading">Register</div><br/>
        <form onSubmit={this.handleSubmit} >
        <label>Name</label>
        <input name="name" type="text" value={this.state.users.name} onChange={this.handleChange} required/>
        <div className="err">{this.state.userErrors.nameError}</div><br/>
        <label>Username</label>
        <input name="username" type="text" value={this.state.users.username} onChange={this.handleChange} required/>
        <div className="err">{this.state.userErrors.usernameError}</div><br/>
        <label>Password</label>
        <input type="password" name="password" value={this.state.users.password} onChange={this.handleChange} required/>
        <div className="err">{this.state.passwordError}</div><br/>
        <label>Address </label>
        <textarea value={this.state.users.address} name="address" onChange={this.handleChange}></textarea>
        <div className="err">{this.state.addressError}</div><br/>
        <label>Country</label>
        <select id="countrySelect" size="1" onChange={this.makeSubmenu.bind()} name="country" value={this.state.users.country} required>
        <option value="">Choose Country</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
        <option value="Australia">Australia</option>
        <option value="UK">UK</option>
        <option value="Canada">Canada</option>
        <option value="Denmark">Denmark</option>
        </select>
        <div className="err">{this.state.userErrors.countryError}</div><br/>
        <label>Select State </label>
        <select id="stateSelect" size="1" name="state" value={this.state.users.state} onChange={this.handleChange.bind(this)} required >
        <option>Choose State</option>
        <option></option>
        </select>
        <div className="err">{this.state.userErrors.stateError}</div><br/>
        <label>Email Address</label>
        <input text="email" value={this.state.users.email} name="email" onChange={this.handleChange} required/>
        <div className="err">{this.state.userErrors.emailError}</div><br/>
        <label>Contact number</label>
        <input type="number" value={this.state.users.contact} name="contact" onChange={this.handleChange} required/>
        <div className="err">{this.state.userErrors.contactError}</div><br/>
        <label>Date of Birth</label>
        <input type="date" value={this.state.users.dob} onChange={this.handleChange} name="dob" required/>
        <div className="err">{this.state.userErrors.dobError}</div><br/>
        <label>Account type</label>
        <select  value={this.state.users.accType} name="accType" onChange={this.handleChange} required>
            <option value="" >Account type</option>
            <option value="Saving Account">Saving Account</option>
            <option value="Salary Account">Salary Account</option>
        </select>
        <div className="err">{this.state.userErrors.accTypeError}</div><br/>
        <label>Branch Name</label>
        <input type="text" value={this.state.users.branchName} name="branchName" onChange={this.handleChange} required/>
        <div className="err">{this.state.userErrors.branchNameError}</div><br/>
        <label>Initial Deposit Amount</label>
        <input type="number" value={this.state.users.initialDeposit} name="initialDeposit" onChange={this.handleChange} required/>
        <div className="err">{this.state.userErrors.initialDepositError}</div><br/>
        <label>Identification Proof type</label>
        <input type="text" value={this.state.users.identificationProofType} name="identificationProofType" onChange={this.handleChange} required/> 
        <div className="err">{this.state.userErrors.identificationProofTypeError}</div><br/>
        <button>submit</button>
        </form>
        Already Registered <button onClick={this.handleLogin}>Login</button> 
        </div>
        </div>
        )
    }
}

export default Register;