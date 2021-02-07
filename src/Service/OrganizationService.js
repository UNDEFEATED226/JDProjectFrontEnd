import axios from 'axios'

class OrganizationService{

    findAllOrganization(){
        return axios.get("/organization/findallorganization");
    }
  
    findById(id){
        return axios.get("/organization/findbyid?id="+id);
    }

    addOrganization(organization){
        return axios.post("/organization/addorganization",organization);
    }

    editOrganization(id,organization){
        return axios.post("/organization/editorganization/"+id,organization);
    }

    deleteOrganization(id){
        return axios.get("/organization/deleteorganization?id="+id);
    }
}

export default new OrganizationService()