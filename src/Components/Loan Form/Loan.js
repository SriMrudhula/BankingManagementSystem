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
      loan:false,
      loanValue:0
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
                this.state.loanValue=1;
            }
    else if(event==="Home/Personal Loan")
        this.state.loanValue=2;
    }
    hadLoan=()=>{
        axios.get("http://localhost:3000/loan?id="+this.state.id+"&name="+this.state.accHoldername)
        .then(response =>{
            console.log(response.data.length);
            if(response.data.length!==0){
               this.state.loan=true;
               if(response.data[0].loanValue===1)
               {
               alert("                 You have already taken " +response.data[0].loanType+
               "\n Loan Amount : "+response.data[0].loanAmount+
               "         Loan Apply Date : "+response.data[0].loanApplyDate+
               "\n Rate Of Interest : "+response.data[0].rateOfInterest+
               "                Duration Of Loan : "+response.data[0].durationOfLoan+
               "\n Course Fee : "+response.data[0].courseFee+
               "            Course : "+response.data[0].course+
               "\n Father Name : "+response.data[0].fatherName+
               "                Father Occupation:"+response.data[0].fatherOcc+
               "\n Father Annual Income:"+response.data[0].fathAnInc);
               }
            }
               else{
                   this.state.loan=false;
                   alert("You do not have any loan");
               
            }
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
    handleClick = event => {
        this.props.handleClick(event);     
    };   
    handleSubmit = event => {
        event.preventDefault();    
        console.log(this.state);
        this.hadLoan();
        if(this.state.loan===false){
        axios.post('http://localhost:3000/loan',this.state)
        .then(respone =>{
            console.log(respone)  
            alert("Applied for loan successfully");
            this.handleClick("home");  
        })
        .catch(error=>{
            console.log(error)
        })
    }
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
        <input type="date" value={this.state.loanApplyDate}  onChange={this.handleChange} name="loanApplyDate" required/>
        <br/><br/>
        <label>Rate of Interest</label>
        <input type="number"  value={this.state.rateOfInterest}  onChange={this.handleChange} name="rateOfInterest" required/>
        <br/><br/>
        <label>Duration of Time</label>
        <input type="number"  value={this.state.durationOfLoan}  onChange={this.handleChange} name="durationOfLoan" required/>
        <br/><br/>
        <div className={this.state.loanValue==1?"dis1":"dis"}>
                <label>Course Fee</label>
                <input type="number" value={this.state.courseFee}  name="courseFee" onChange={this.handleChange} />
                <br/><br/>
                <label>Course</label>
                <input type="text" value={this.state.course}  onChange={this.handleChange} name="course"/>
                <br/><br/>
                <label>Father Name</label>
                <input type="text"  value={this.state.fatherName}  onChange={this.handleChange} name="fatherName" />
                <br/><br/>
                <label>Father Occupation</label>
                <input type="text"  value={this.state.fatherOcc}  onChange={this.handleChange} name="fatherOcc" />
                <br/><br/>
                <label>Father Ann Income</label>
                <input type="text"  value={this.state.fathAnInc}  onChange={this.handleChange} name="fathAnInc" />
                <br/><br/>
                </div>
                <div className={this.state.loanValue==2?"dis1":"dis"}>
                     {/* Home Loan */}
        <label>Annual Income</label>
        <input type="number" value={this.state.annualInc} name="annualInc" onChange={this.handleChange}/>
        <br/><br/>
        <label>Company Name</label>
        <input type="text" value={this.state.cmpName}  onChange={this.handleChange} name="cmpName"/>
        <br/><br/>
        <label>Designation</label>
        <input type="text"  value={this.state.desig}  onChange={this.handleChange} name="desig"/>
        <br/><br/>
        <label>Total Experience</label>
        <input type="number"  value={this.state.totExp}  onChange={this.handleChange} name="totExp"/>
        <br/><br/>
        <label>Experience with Current Cmp</label>
        <input type="text"  value={this.state.expForCurrentCmp}  onChange={this.handleChange} name="expForCurrentCmp" />       <br/><br/>
        </div>
        <button className="btn1">Apply Loan</button>
        </form> 
        </div>
        <div className="b5">
            <div className="data">Check Present Loan</div><br/>
            <button className="btn1" onClick={this.hadLoan}>My Loan</button>
        </div>
        </div>
        )
    }
}

export default Loan;