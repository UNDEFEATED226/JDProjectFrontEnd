import axios from 'axios'

class OrganizationService{

    findAllOrganization(){
        return axios.get("http://localhost:8080/organization/findallorganization");
    }
  
    findById(id){
        return axios.get("http://localhost:8080/organization/findbyid?id="+id);
    }

    addOrganization(organization){
        return axios.post("http://localhost:8080/organization/addorganization",organization);
    }
}

export default new OrganizationService()