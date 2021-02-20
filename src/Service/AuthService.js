import axios from 'axios'

class AuthService{
    
    findAllAuth(){
        return axios.get("/auth/findallauth");
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