import React, { Component } from 'react';
import './Register.css';
import axios from 'axios';
class Register extends Component
{
    state={    
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
        identificationProofType:"",
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
        identificationProofTypeError:"",  
        AccountType:false,  
        statesByCountry : {
            India: ["Andhra Pradesh",'TamilNadu',"Chennai","Kerala","Maharashtra","Karnataka"],
            USA: ["Texas","Washington","Virginia","California","Florida"],
            Australia:["Western Australia","south Australia","Tasmania","Queensland","New South Wales"],
            Canada:["Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland and Labrador","Northwest Territories","Nova Scotia"],
            Denmark:["North Zealand","East Zealand"]
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

        makeSubmenu = val => {
            this.setState({
                [val.target.name]:val.target.value
            });
            val=document.getElementById("countrySelect").value;
        if(val.length==0) document.getElementById("stateSelect").innerHTML = "<option></option>";
        else {
        var stateOptions = "";
        console.log("hai.................."+this.state.country);
        stateOptions+="<option>Choose State</option>"
        for(let stateId in this.state.statesByCountry[val]) {
        stateOptions+="<option>"+this.state.statesByCountry[val][stateId]+"</option>";
        }
        document.getElementById("stateSelect").innerHTML = stateOptions;
        console.log(stateOptions);
        }
        }

        setAccountType =event => {
            this.setState({
                [event.target.name]:event.target.value
            });
            event=new Date(document.getElementById('dob').value);
            var year=event.getFullYear();
            console.log(year+"    "+event);
            var age=2020-parseInt(year,10);
            var account=""
            account="<option>Account Type</option><option>Salary Account</option>"
        if(age>18){
        account+="<option>Salary Account</option>";
        }
        document.getElementById("accType").innerHTML = account;
        console.log(account);
    
        }
    handleSubmit = event => {
        event.preventDefault();
        const isValid=this.validate();
        if(isValid){
        console.log(this.state);
        axios.post('http://localhost:3000/users',this.state)
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
        <input name="name" type="text" value={this.state.name} onChange={this.handleChange} required/>
        <div className="err">{this.state.nameError}</div><br/>
        <label>Username</label>
        <input name="username" type="text" value={this.state.username} onChange={this.handleChange} required/>
        <div className="err">{this.state.usernameError}</div><br/>
        <label>Password</label>
        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required/>
        <div className="err">{this.state.passwordError}</div><br/>
        <label>Address </label>
        <textarea value={this.state.address} name="address" onChange={this.handleChange}></textarea>
        <div className="err">{this.state.addressError}</div><br/>
        <label>Country</label>
        <select id="countrySelect" onChange={this.makeSubmenu} name="country" value={this.state.country} required>
        <option value="">Choose Country</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
        <option value="Australia">Australia</option>
        <option value="UK">UK</option>
        <option value="Canada">Canada</option>
        <option value="Denmark">Denmark</option>
        </select>
        <div className="err">{this.state.countryError}</div><br/>
        <label>Select State </label>
        <select id="stateSelect" size="1" name="state" value={this.state.state} onChange={this.handleChange.bind(this)} required >
        <option>Choose State</option>
        <option></option>
        </select>
        <div className="err">{this.state.stateError}</div><br/>
        <label>Email Address</label>
        <input text="email" value={this.state.email} name="email" onChange={this.handleChange} required/>
        <div className="err">{this.state.emailError}</div><br/>
        <label>Contact number</label>
        <input type="number" value={this.state.contact} name="contact" onChange={this.handleChange} required/>
        <div className="err">{this.state.contactError}</div><br/>
        <label>Date of Birth</label>
        <input type="date" id="dob" value={this.state.dob}  onChange={this.setAccountType} name="dob" required/>
        <div className="err">{this.state.dobError}</div><br/>
        <label>Account type</label>
        <select  value={this.state.accType} id="accType" name="accType" onChange={this.handleChange} required>
            <option></option>
        </select>
        <div className="err">{this.state.accTypeError}</div><br/>
        <label>Branch Name</label>
        <input type="text" value={this.state.branchName} name="branchName" onChange={this.handleChange} required/>
        <div className="err">{this.state.branchNameError}</div><br/>
        <label>Initial Deposit Amount</label>
        <input type="number" value={this.state.initialDeposit} name="initialDeposit" onChange={this.handleChange} required/>
        <div className="err">{this.state.initialDepositError}</div><br/>
        <label>Identification Proof type</label>
        <input type="text" value={this.state.identificationProofType} name="identificationProofType" onChange={this.handleChange} required/> 
        <div className="err">{this.state.identificationProofTypeError}</div><br/>
        <button>submit</button>
        </form>
        Already Registered <button onClick={this.handleLogin}>Login</button> 
        </div>
        </div>
        )
    }

}
export default Register;