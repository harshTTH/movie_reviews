import axios from 'axios';
import {initUser} from './store';

const actions = {
    handleLogin(credentials){
        return(
            axios.post('/login.php',{
                email:credentials.email,
                password:credentials.password
            })
            .then((response)=>{
                initUser(response.data);
                return response.data;
            })
        );
    },
    handleSignup(credentials){
        return(
            axios.post('./signup.php',{
                email:credentials.email,
                password:credentials.password,
                name:credentials.name
            })
            .then((response)=>{
                initUser(response.data);
                return response.data;
            })
        );
    }
};

export default actions;
