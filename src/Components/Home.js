import React, { Component } from 'react';
import './Home.css';
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import Deposit from './DepositForm/Deposit';
import Loan from './Loan Form/Loan';
import Register from './RegisterForm/Register';
class Home extends Component
{
render()
{
return(
    <div>
<Router>
<ul>
  <li><Link to="/">Home</Link></li>
  <li><Link to="/deposit">Deposit</Link></li>
  <li><Link to="/loan">Loan</Link></li>
  <li><Link to="/logout">Logout</Link></li>
</ul>
<Switch>
    <Route path="/deposit" component={Deposit}/>
    <Route path="/loan"   component={Loan}/>
    <Route path="/logout" component={Register}/>
</Switch>
</Router>
<div className="img2"></div>

</div>

    );
}
}
export default Home;