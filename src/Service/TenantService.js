import axios from 'axios'

class TenantService{

    findAllTenant(){
        return axios.get("/tenant/findalltenant");
    }

    findById(id){
        return axios.get("/tenant/findbyid?id="+id);
    }

    addTenant(tenant){
        return axios.post("/tenant/addtenant",tenant);
    }

    editTenant(id,tenant){
        return axios.post("/tenant/edittenant/"+id,tenant);
    }

    deleteTenant(id){
        return axios.get("/tenant/deletetenant?id="+id);
    }
}

export default new TenantService()