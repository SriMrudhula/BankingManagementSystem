import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';
import { Col, Row } from 'reactstrap';
import { Container } from '@material-ui/core';
class Login extends Component
{
    state={   
        username:"",
        password:"",
        x:"",
        users: []
    };
    componentDidMount(){
        axios.get("http://localhost:3000/users")
        .then(response =>{
            this.state.users=response.data
        })
        .catch(error=>{
            console.log(error);
        })
    }

    handleChange =event=>{
        this.setState({
            [event.target.name]:event.target.value
        });
    };
    
    handleSubmit= event =>{
        for(let i=0;i<this.state.users.length;i++)
        {
            console.log(this.state.users[i].username+" "+this.state.username);
            console.log(this.state.users[i].password+" "+this.state.password);
            if(this.state.users[i].username===this.state.username && this.state.users[i].password===this.state.password)
             {
                 this.state.x="successfully logged in";
                 localStorage.setItem("id",this.state.users[i].id);
                 localStorage.setItem("name",this.state.users[i].name);
                 localStorage.setItem("userName",this.state.users[i].username);
                 localStorage.setItem("password",this.state.users[i].password);
                 localStorage.setItem("address",this.state.users[i].address);  
                 localStorage.setItem("country",this.state.users[i].country);
                 localStorage.setItem("state",this.state.users[i].state);
                 localStorage.setItem("email",this.state.users[i].email);
                 localStorage.setItem("contact",this.state.users[i].contact); 
                 localStorage.setItem("dob",this.state.users[i].dob);
                 localStorage.setItem("accType",this.state.users[i].accType);
                 localStorage.setItem("branchName",this.state.users[i].branchName);
                 localStorage.setItem("initialDeposit",this.state.users[i].initialDeposit); 
                 localStorage.setItem("identificationProofType",this.state.users[i].identificationProofType); 
                 alert("Successfully Loggedin");
                 this.handleClick("home");  
                 break;
             }
             else
                 this.state.x="invalid user";             
             }
            if(this.state.x==="invalid user")
               alert("invalid");
        }
    handleRegister=()=>
    {
        this.handleClick("register");  
    }
    handleClick = event => {
        this.props.handleClick(event);     
    };   
    render()
    {
        return (
            <div className="img2">
            <div className="b3">
            <div className="heading">Login</div><br/><br/>
            <Container>
            <form onSubmit={this.handleSubmit} >
            <div className="form-group">
            <Row>
            <input name="username" type="text" placeholder="Enter UserName" className="form-control" value={this.state.username} onChange={this.handleChange} required/>
            </Row><br/>
            <Row>
            <input name="password" type="password" placeholder="Enter Password" className="form-control" value={this.state.password} onChange={this.handleChange} required/>
            
            </Row><br/>
            <button className="btn-primary">Login</button>
            </div>
            </form>
            </Container>
            Create an Account <button onClick={this.handleRegister}>Register</button> 
            </div>
            </div>
            )
        }
    }
export default Login;