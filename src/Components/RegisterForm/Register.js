import React, { Component } from 'react';
import './Register.css';
import axios from 'axios';
import { Col, Row, Button } from 'reactstrap';
import { Container } from '@material-ui/core';
const statesByCountry = {
    India: ["Andhra Pradesh",'TamilNadu',"Chennai","Kerala","Maharashtra","Karnataka"],
    USA: ["Texas","Washington","Virginia","California","Florida"],
    Australia:["Western Australia","south Australia","Tasmania","Queensland","New South Wales"],
    Canada:["Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland and Labrador","Northwest Territories","Nova Scotia"],
    Denmark:["North Zealand","East Zealand"]
    }
class Register extends Component
{
    state={    
        name:"",
        username:"",
        password:"",
        confirmPwd:"",
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
        emailError:"",
        contactError:"",
        usernameError:"",  
        AccountType:false,
        duplicateUser:false,  
            users:[]
    }
    constructor() 
    {
        super();
        localStorage.removeItem("id");
    }

    componentDidMount(){
        axios.get("http://localhost:3000/users")
        .then(response =>{
            this.state.users=response.data
        })
        .catch(error=>{
            console.log(error);
        })
    }

    handleChange =event=>
    {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    duplicateUsername=()=>{
        for(let i=0;i<this.state.users.length;i++)
        {
            if(this.state.users[i].username===this.state.username)
             {
                this.state.duplicateUser=true;
                 break;
             }
             else
                this.state.duplicateUser=false;          
             }      
            if(this.state.duplicateUser===true)
                return true;
            else 
                return false;
        }

    validate = () => {
        let nameError=""
        let emailError=""
        let contactError=""
        let usernameError=""
        const isDuplicate=this.duplicateUsername();
        if(isDuplicate)
           usernameError="Username already Exists"
        if(!(this.state.email.includes("@") && this.state.email.includes(".com")))
           emailError='Please enter correct email';
        // if(!this.state.name.includes("^[a-zA-Z]+$"))
        //    nameError="Please enter Username"
        if(this.state.contact.length!==10)
            contactError="Please Enter Correct Contact"
        if(emailError!=="" || nameError!=="" || contactError!=="" || usernameError!=="" ){
            this.setState({nameError,emailError,contactError,usernameError});
            return false;
            }
            return true;
    }

    makeSubmenu = event => 
    {
        this.setState({[event.target.name]:event.target.value});
        event=document.getElementById("countrySelect").value;
        if(event.length===0)
            document.getElementById("stateSelect").innerHTML = "<option></option>";
        else 
        {
            var stateOptions = "";
            stateOptions+="<option>Choose State</option>"
            for(let stateId in statesByCountry[event])
            {
                stateOptions+="<option>"+statesByCountry[event][stateId]+"</option>";
            }
            document.getElementById("stateSelect").innerHTML = stateOptions;
        }
    }

    setAccountType =event => 
    {
        this.setState({[event.target.name]:event.target.value});
        event=new Date(document.getElementById('dob').value);
        var year=event.getFullYear();
        var age=2020-parseInt(year,10);
        var account=""
        account="<option>Account Type</option><option>Savings Account</option>"
        if(age>18)
            account+="<option>Salary Account</option>";
        document.getElementById("accType").innerHTML = account;
    }

    handleSubmit = event => 
    {
        event.preventDefault();
        const isValid=this.validate();
        if(isValid)
        {
            if(this.state.password!==this.state.confirmPwd)
                alert("Password and Confirm Password are not same");
            else
            {
                let user={name:this.state.name,username:this.state.username,password:this.state.password,confirmPwd:this.state.confirmPwd,
                address:this.state.address,country:this.state.country,state:this.state.state,email:this.state.email,contact:this.state.contact,
                dob:this.state.dob,accType:this.state.accType,branchName:this.state.branchName,initialDeposit:this.state.initialDeposit,
                identificationProofType:this.state.identificationProofType,id:Math.floor(Math.random()*100)+1}
            axios.post('http://localhost:3000/users',user)
            .then(respone =>{
            this.handleClick("login");  
            })
            .catch(error=>{
            console.log(error)
            })
            }
        }
    }
    _onFocus=(event)=>{
        event.currentTarget.type = "date";
    }

    handleLogin=()=>
    {
        this.handleClick("login");  
    }

    handleClick = event => 
    {
        this.props.handleClick(event);     
    }

    render()
    {
        return (
        <div className="img1">
        <div className="b1">
        <div className="heading">Register</div><br/>
        <Container>
        <form onSubmit={this.handleSubmit} >
            <div className="form-group">
                <Row>
                    <Col xs={6} >
        <input name="name" className="form-control" placeholder="Enter Name" type="text" value={this.state.name} onChange={this.handleChange} required/>
        <div className="err1">{this.state.nameError}</div>
        </Col>
        <Col xs={6}>
        <input name="username" type="text" className="form-control" placeholder="Enter Username" value={this.state.username} onChange={this.handleChange} required/>
        <div className="err1">{this.state.usernameError}</div>
        </Col>
        </Row><br/>
        <Row>
        <Col>
        <input type="password" name="password" placeholder="Enter Password" className="form-control" value={this.state.password} onChange={this.handleChange} required/>
        </Col>
        <Col>
        <input type="password" name="confirmPwd" placeholder="Enter Confirm Password" value={this.state.confirmPwd} className="form-control" onChange={this.handleChange} required/>
        </Col>
        </Row><br/>
        <Row>
        <Col>
        <select id="countrySelect" onChange={this.makeSubmenu} className="form-control" name="country" value={this.state.country} required>
        <option value="">Choose Country</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
        <option value="Australia">Australia</option>
        <option value="UK">UK</option>
        <option value="Canada">Canada</option>
        <option value="Denmark">Denmark</option>
        </select>
        </Col>
        <Col>
        <select id="stateSelect" size="1" name="state" className="form-control" value={this.state.state} onChange={this.handleChange.bind(this)} required >
        <option>Choose State</option>
        </select>
        </Col>
        </Row><br/>
        <Row>
        <Col xs={6}>
        <input text="email" value={this.state.email} placeholder="Enter Email Id" name="email" className="form-control" onChange={this.handleChange} required/>
        <div className="err1">{this.state.emailError}</div><br/>
        </Col>
        <Col xs={6}>
        <input type="number" value={this.state.contact} placeholder="Enter Contact Number" name="contact" className="form-control" onChange={this.handleChange} required/>
        <div className="err1">{this.state.contactError}</div><br/>
        </Col></Row>
        <Row>
        <Col>
        <input type="text" id="dob" placeholder="Date of Birth" onFocus={this._onFocus} value={this.state.dob} className="form-control" max={new Date().toISOString().split("T")[0]} onChange={this.setAccountType} name="dob" required/>
        </Col>
        <Col>
        <select  value={this.state.accType} id="accType" className="form-control" name="accType" onChange={this.handleChange} required>
        <option>Account Type</option>
        </select>
        </Col>
        </Row><br/>
        <Row>
        <Col>
        <input type="text" value={this.state.branchName} placeholder="Enter Branch Name" className="form-control" name="branchName" onChange={this.handleChange} required/>
        </Col>
        <Col>
        <input type="number" value={this.state.initialDeposit} placeholder="Enter Initial Deposit" className="form-control" name="initialDeposit" onChange={this.handleChange} required/>
        </Col>
        </Row><br/>
        <Row>
        <textarea value={this.state.address} placeholder="Enter Address" name="address" className="form-control" onChange={this.handleChange}></textarea>
        </Row><br/>
        <Row>
        <input type="text" value={this.state.identificationProofType} placeholder="Enter Identification Proof type" className="form-control" name="identificationProofType" onChange={this.handleChange} required/> 
        </Row><br/>
        <Button className="Btn" id="registersubmit" color="primary">Register</Button>
        </div>
        </form>
        Already Registered <button onClick={this.handleLogin}>Login</button> 
        </Container>
        </div>
        </div>
        )
    }
}
export default Register;