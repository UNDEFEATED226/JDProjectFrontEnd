import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import './App.css';
import HeaderComponent from './Components/HeaderComponent'
import UserComponent from './Components/UserComponent'
import HomePage from './Components/HomePage'
import AddUserComponent from './Components/AddUserComponent';
import OrganizationComponent from './Components/OrganizationComponent';
import AddOrganizationComponent from './Components/AddOrganizationComponent';
import ViewUserComponent from './Components/ViewUserComponent';
import ViewOrganizationComponent from './Components/ViewOrganizationComponent';

function App() {
  return (
    <div>
      <Router>
       <HeaderComponent/>
        <div className="container"> 
          <Switch>
            <Route path="/" exact component={HomePage}></Route>
            <Route path="/userlist" component={UserComponent}></Route>
            <Route path="/adduser" component={AddUserComponent}></Route>
            <Route path="/viewuser/:id" component={ViewUserComponent}></Route>
            <Route path="/organizationlist" component={OrganizationComponent}></Route>  
            <Route path="/addorganization" component={AddOrganizationComponent}></Route>
            <Route path="/vieworganization/:id" component={ViewOrganizationComponent}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;