import {HashRouter as Router,Switch,Route} from 'react-router-dom'
import './App.css';
import HeaderComponent from './Components/HeaderComponent'
import UserComponent from './UserComponents.js/UserComponent'
import HomePage from './Components/HomePage'
import AddUserComponent from './UserComponents.js/AddUserComponent';
import OrganizationComponent from './OrganizationComponents.js/OrganizationComponent';
import AddOrganizationComponent from './OrganizationComponents.js/AddOrganizationComponent';
import ViewUserComponent from './UserComponents.js/ViewUserComponent';
import ViewOrganizationComponent from './OrganizationComponents.js/ViewOrganizationComponent';
import EditUserComponent from './UserComponents.js/EditUserComponent';
import EditOrganizationComponent from './OrganizationComponents.js/EditOrganizationComponent';
import ResourceComponent from './ResourceComponents/ResourceComponent';
import EditResourceComponent from './ResourceComponents/EditResourceComponent';
import ViewResourceComponent from './ResourceComponents/ViewResourceComponent';
import IotMenuComponent from './ResourceComponents/IotMenuComponent';
import IotApiComponent from './ResourceComponents/IotApiComponent';
import eMenuComponent from './ResourceComponents/eMenuComponent';
import eApiComponent from './ResourceComponents/eApiComponent';
import govMenuComponent from './ResourceComponents/govMenuComponent';
import govApiComponent from './ResourceComponents/govApiComponent';
import RoleComponent from './RoleComponents/RoleComponent';
import OrgRoleComponent from './RoleComponents/OrgRoleComponent';
import BizRoleComponent from './RoleComponents/BizRoleComponent';
import AddRoleComponent from './RoleComponents/AddRoleComponent';
import ViewRoleComponent from './RoleComponents/ViewRoleComponent';
import EditRoleComponent from './RoleComponents/EditRoleComponent';
import AuthComponent from './AuthComponents/AuthComponent';
import AddAuthComponent from './AuthComponents/AddAuthComponent';
import EditAuthComponent from './AuthComponents/EditAuthComponent';
import TenantComponent from './TenantComponents.js/TenantComponent';
import AddTenantComponent from './TenantComponents.js/AddTenantComponent';
import EditTenantComponent from './TenantComponents.js/EditTenantComponent';
import AddResourceComponent from './ResourceComponents/AddResourceComponent';
import UserRoleComponent from './UserRoleComponents.js/UserRoleComponent';
import AddUserRoleComponent from './UserRoleComponents.js/AddUserRoleComponent';
import RoleAuthComponent from './RoleAuthComponents/RoleAuthComponent';
import AddRoleAuthComponent from './RoleAuthComponents/AddRoleAuthComponent'
import EditRoleAuthComponent from './RoleAuthComponents/EditRoleAuthComponent';

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
            <Route path="/edituser/:id" component={EditUserComponent}></Route>
            <Route path="/viewuser/:id" component={ViewUserComponent}></Route>
            <Route path="/organizationlist" component={OrganizationComponent}></Route>  
            <Route path="/addorganization" component={AddOrganizationComponent}></Route>
            <Route path="/editorganization/:id" component={EditOrganizationComponent}></Route>
            <Route path="/vieworganization/:id" component={ViewOrganizationComponent}></Route>
            <Route path="/resourcelist" component={ResourceComponent}></Route>
            <Route path="/iotmenu" component={IotMenuComponent}></Route>
            <Route path="/iotapi" component={IotApiComponent}></Route>
            <Route path="/emenu" component={eMenuComponent}></Route>
            <Route path="/eapi" component={eApiComponent}></Route>
            <Route path="/govmenu" component={govMenuComponent}></Route>
            <Route path="/govapi" component={govApiComponent}></Route>
            <Route path="/addresource" component={AddResourceComponent}></Route>
            <Route path="/editresource/:id" component={EditResourceComponent}></Route>
            <Route path="/viewresource/:id" component={ViewResourceComponent}></Route>
            <Route path="/rolelist" component={RoleComponent}></Route>
            <Route path="/orgrolelist" component={OrgRoleComponent}></Route>
            <Route path="/bizrolelist" component={BizRoleComponent}></Route>
            <Route path="/addrole" component={AddRoleComponent}></Route>
            <Route path="/viewrole/:id" component={ViewRoleComponent}></Route>
            <Route path="/editrole/:id" component={EditRoleComponent}></Route>
            <Route path="/authlist" component={AuthComponent}></Route>
            <Route path="/addauth" component={AddAuthComponent}></Route>
            <Route path="/editauth/:id" component={EditAuthComponent}></Route>
            <Route path="/tenantlist" component={TenantComponent}></Route>
            <Route path="/addtenant" component={AddTenantComponent}></Route>
            <Route path="/edittenant/:id" component={EditTenantComponent}></Route>
            <Route path="/userrolelist" component={UserRoleComponent}></Route>
            <Route path="/adduserrole" component={AddUserRoleComponent}></Route>
            <Route path="/roleauthlist" component={RoleAuthComponent}></Route>
            <Route path="/addroleauth" component={AddRoleAuthComponent}></Route>
            <Route path="/editroleauth/:id" component={EditRoleAuthComponent}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
