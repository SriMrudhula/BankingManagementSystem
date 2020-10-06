import React, { Component } from 'react';
import './Loan.css';
import AppBar from '@material-ui/core/AppBar';
import axios from 'axios';
import Login from '../Login Form/Login';
import { Container } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import { Col, Row } from 'reactstrap';

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
    _onFocus=(event)=>{
        event.currentTarget.type = "date";
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
               else if(response.data[0].loanValue===2)
               {
               alert("                 You have already taken " +response.data[0].loanType+
               "\n Loan Amount : "+response.data[0].loanAmount+
               "         Loan Apply Date : "+response.data[0].loanApplyDate+
               "\n Rate Of Interest : "+response.data[0].rateOfInterest+
               "                Duration Of Loan : "+response.data[0].durationOfLoan+
               "\n  Annual Income: "+response.data[0].annualInc+
               "            Company Name : "+response.data[0].cmpName+
               "\n Designation: "+response.data[0].desig+
               "                Total Experience:"+response.data[0].totExp+
               "\n Experience for Current Company:"+response.data[0].expForCurrentCmp);
               }
               this.setState({ redirect: "/home" });
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
    handleSubmit = event => {
        event.preventDefault();    
        console.log(this.state);
        this.hadLoan();
        if(this.state.loan===false){
        axios.post('http://localhost:3000/loan',this.state)
        .then(respone =>{
            console.log(respone)  
            alert("Applied for loan successfully");
        })
        .catch(error=>{
            console.log(error)
        })
    }
    };

    render()
    {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
      }
    return (
        <div className="img2">
            <Row>
                            <div className="b4">
            <div className="heading">Loan</div>
                <Container>
            <form onSubmit={this.handleSubmit} >
            <div className="form-group">
                <Row>
                  <Col>
        <input type="text" id="name" value={this.state.accHoldername} className="form-control" placeholder="Name" name="name" onChange={this.handleChange} required/>  
        </Col>
        <Col>
        <select  value={this.state.loanType} id="loanType" name="loanType" className="form-control" onChange={this.setLoanType} required>
            <option>Loan Type</option>
            <option value="Student Loan">Student Loan</option>
            <option value="Home/Personal Loan">Home/Personal Loan</option>
        </select>
        </Col>
        </Row><br/>
        <Row>
            <Col>
        <input type="number" value={this.state.loanAmount} name="loanAmount" placeholder="Loan Amount" className="form-control" onChange={this.handleChange} required/>
        </Col>
        <Col>
        <input type="text" value={this.state.loanApplyDate} className="form-control" placeholder="Loan Apply Date" onFocus={this._onFocus} onChange={this.handleChange} name="loanApplyDate" required/>
        </Col>
        </Row><br/>
        <Row>
        <Col>
        <input type="number"  value={this.state.rateOfInterest} className="form-control" placeholder="Rate of Interest" onChange={this.handleChange} name="rateOfInterest" required/>
        </Col>
        <Col>
        <input type="number"  value={this.state.durationOfLoan} className="form-control" placeholder="Duration of Time" onChange={this.handleChange} name="durationOfLoan" required/>
        </Col>
        </Row><br/>
        <div className={this.state.loanValue==1?"dis1":"dis"}> 
              <Row>
              <Col>
                <input type="number" value={this.state.courseFee} className="form-control" placeholder="Course Fee" name="courseFee" onChange={this.handleChange} />
              </Col>
                <Col>
                <input type="text" value={this.state.course} className="form-control" placeholder="Course" onChange={this.handleChange} name="course"/>
                </Col>
                </Row><br/>
                <Row>
                <Col>
                <input type="text"  value={this.state.fatherName} className="form-control" placeholder="Father Name" onChange={this.handleChange} name="fatherName" />
                </Col>
                <Col>
                <input type="text"  value={this.state.fatherOcc} className="form-control" placeholder="Father Occupation" onChange={this.handleChange} name="fatherOcc" />
                </Col>
                <Col>
                <input type="text"  value={this.state.fathAnInc} className="form-control" placeholder="Father Annual Income" onChange={this.handleChange} name="fathAnInc" />
                </Col>
                </Row><br/>
                </div>
                <div className={this.state.loanValue==2?"dis1":"dis"}>
                     {/* Home Loan */}
        <Row>
        <Col>
        <input type="number" value={this.state.annualInc} className="form-control" placeholder="Annual Income" name="annualInc" onChange={this.handleChange}/>
        </Col>
        <Col>
        <input type="text" value={this.state.cmpName} className="form-control" placeholder="Company Name" onChange={this.handleChange} name="cmpName"/>
        </Col>
        </Row><br/>             
        <Row>
        <Col>
        <input type="text"  value={this.state.desig} placeholder="Designation" className="form-control" onChange={this.handleChange} name="desig"/>
        </Col>
        <Col>
        <input type="number"  value={this.state.totExp} className="form-control" placeholder="Total Experience" onChange={this.handleChange} name="totExp"/>
        </Col>
        <Col>
        <input type="text"  value={this.state.expForCurrentCmp} className="form-control" placeholder="Current Cmp Experience" onChange={this.handleChange} name="expForCurrentCmp" />
        </Col>
        </Row><br/>
        </div>
        <button className="btn-primary">Apply Loan</button>
        </div>
        </form> 
        </Container>
        </div>
        <div className="b5">
            <button className="btn1" onClick={this.hadLoan}>My Loan</button>
        </div>
</Row>
        </div>
        )
    }
}

export default Loan;