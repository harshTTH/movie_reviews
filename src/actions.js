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
                if(response.data){
                    localStorage.setItem('mov_rev_wt',response.data);
                }
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
    },
    fetchMovieIdList(){
        return(
            axios.get('./movies.php')
            .then((response)=>response.data)
        )
    },
    fetchMovie(id){
        return(
            axios.get(`http://www.theimdbapi.org/api/movie?movie_id=${id}`)
        )
    },
    fetchDesc(id){
        return(
            axios.get('/desc.php',{id:id})
        )
    },
    handleLogout(){
        localStorage.removeItem('mov_rev_wt');
        window.location.reload(true);
    }
};

export default actions;
