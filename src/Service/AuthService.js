import axios from 'axios'

class AuthService{
    
    findAllAuth(){
        return axios.get("/auth/findallauth");
    }

    findAllAuthPaginated(p){
        return axios.get("/auth/findallauthpaginated?pageNo="+p);
    }

    count(){
        return axios.get("/auth/count");
    }
    
    page(){
        return axios.get("/auth/page");
    }

    addAuth(auth){
        return axios.post("/auth/addauth",auth);
    }  

    editAuth(id,auth){
        return axios.post("/auth/editauth/"+id,auth);
    }

    deleteAuth(id){
        return axios.get("/auth/deleteauth?id="+id);
    }

    findById(id){
        return axios.get("/auth/findbyid?id="+id);
    }
}

export default new AuthService()