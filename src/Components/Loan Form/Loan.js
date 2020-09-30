import React, { Component } from 'react';

import './Loan.css';
import AppBar from '@material-ui/core/AppBar';
import axios from 'axios';
import Login from '../Login Form/Login';
import { BrowserRouter, Route } from 'react-router-dom'

class Loan extends Component
{
  state={    
      id:"",
      accHoldername:"",
      loanType:"",
      loanAmount:"",
      loanApplyDate:"",
      rateOfInterest:"",
      durationOfLoan:"",
      courseFee:"",
      course:"",
      fatherName:"",
      fatherOcc:"",
      fathAnInc:"",
      annualInc:"",
      cmpName:"",
      desig:"",
      totExp:"",
      expForCurrentCmp:"",
      loan:""
    }
    constructor(){
        super();
        this.state.id=localStorage.getItem("id");
        this.state.accHoldername= localStorage.getItem("name");
        console.log(this.state.accHoldername+"  "+this.state.id);
      }
    setLoanType =event => {
        this.setState({
            [event.target.name]:event.target.value
        });
        event=document.getElementById('loanType').value;
    
    if(event==="Student Loan"){
            this.state.loan=(      
                <div>
                <label>Course Fee</label>
                <input type="number" value={this.state.courseFee} name="courseFee" onChange={this.handleChange} required/>
                <br/><br/>
                <label>Course</label>
                <input type="text" value={this.state.course}  onChange={this.handleChange} name="course" required/>
                <br/><br/>
                <label>Father Name</label>
                <input type="text"  value={this.state.fatherName}  onChange={this.handleChange} name="fatherName" required/>
                <br/><br/>
                <label>Father Occupation</label>
                <input type="text"  value={this.state.fatherOcc}  onChange={this.handleChange} name="fatherOcc" required/>
                <br/><br/>
                <label>Father Ann Income</label>
                <input type="text"  value={this.state.fathAnInc}  onChange={this.handleChange} name="fathAnInc" required/>
                <br/><br/>
                </div>
                );
    }
    else if(event==="Home/Personal Loan"){
            this.state.loan=(
                <div>
                     {/* Home Loan */}
        <label>Annual Income</label>
        <input type="number" value={this.state.annualInc} name="annualInc" onChange={this.handleChange} required/>
        <br/><br/>
        <label>Company Name</label>
        <input type="text" value={this.state.cmpName}  onChange={this.handleChange} name="cmpName" required/>
        <br/><br/>
        <label>Designation</label>
        <input type="text"  value={this.state.desig}  onChange={this.handleChange} name="desig" required/>
        <br/><br/>
        <label>Total Experience</label>
        <input type="number"  value={this.state.totExp}  onChange={this.handleChange} name="totExp" required/>
        <br/><br/>
        <label>Experience with Current Cmp</label>
        <input type="text"  value={this.state.expForCurrentCmp}  onChange={this.handleChange} name="expForCurrentcmp" required/>
        <br/><br/>
       
                </div>
            )
    }


    }


    handleChange =event=>{
        this.setState({
            [event.target.name]:event.target.value
        });
    };
    handleSubmit = event => {
        event.preventDefault();    
                
    };

    render()
    {
    return (
        <div className="img3">
            <div className="b4">
            <form onSubmit={this.handleSubmit} >
            <label> Name</label>
        <input type="text" id="name" value={this.state.accHoldername} name="name" onChange={this.handleChange} required/><br/><br/>       
        <label>Loan Type</label>
        <select  value={this.state.loanType} id="loanType" name="loanType" onChange={this.setLoanType} required>
            <option>Loan Type</option>
            <option value="Student Loan">Student Loan</option>
            <option value="Home/Personal Loan">Home/Personal Loan</option>
        </select><br/><br/>
        <label>Loan Amount</label>
        <input type="number" value={this.state.loanAmount} name="loanAmount" onChange={this.handleChange} required/>
        <br/><br/>
        <label>Loan Apply Date</label>
        <input type="date" value={this.state.loanApplyDate}  onChange={this.handleChange} name="ApplyDate" required/>
        <br/><br/>
        <label>Rate of Interest</label>
        <input type="number"  value={this.state.rateOfInterest}  onChange={this.handleChange} name="rateOfInterest" required/>
        <br/><br/>
        <label>Duration of Time</label>
        <input type="number"  value={this.state.durationOfLoan}  onChange={this.handleChange} name="durationOfLoan" required/>
        <br/><br/>

{this.state.loan}
        <button className="btn1">Apply Loan</button>



        </form> 
        </div>
        </div>
        )
    }
}

export default Loan;