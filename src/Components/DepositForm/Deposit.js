import React, { Component } from 'react';
import './Deposit.css';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { Container } from '@material-ui/core';
import { Row, Col} from 'reactstrap';
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
    deposit:"",
    redirect: null 
  }

  constructor(){
    super();
    if(localStorage.getItem("id")===null){
      this.state.redirect= "/logout";
    }
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
  }
       
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
  }

  checkBalance=()=>{
    alert("Your Balance is "+this.state.users[0].initialDeposit);
    this.setState({ redirect: "/home" });
  }
  
  handleClick = event => {
    this.props.handleClick(event);     
  };

  render()
  {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (  
      <div className="img3">
      <Row>
      <div className="b2">
      <div className="heading">Deposit</div>
      <Container>
      <form onSubmit={this.handleSubmit} >
      <div className="form-group">
      <Row>
      <Col>
      <label>Name</label>
      <input type="text" value={this.state.users[0].name} className="form-control" onChange={this.handleChange} name="name"/>
      </Col>
      <Col>
      <label>Account type</label>
      <select  value={this.state.users[0].accType} name="accType" className="form-control" onChange={this.handleChange} required>
      <option value="Salary Account">Salary Account</option>
      <option value="Saving Account">Saving Account</option>
      </select>
      </Col>
      </Row><br/>
      <Row>
      <label>Deposit Amount</label>
      <input type="number" value={this.state.deposit} name="deposit" className="form-control" onChange={this.handleChange} required/>
      </Row><br/>
      <button className="btn-primary">Deposit</button>
      </div>
      </form> 
      </Container>
      </div>
      <div className="b6">
      <form >
      <button className="btn1" type="submit" id="depositsubmit" onClick={this.checkBalance}>My Balance</button>
      </form> 
      </div>
      </Row>
      </div>
    )
    }
  }

export default Deposit;