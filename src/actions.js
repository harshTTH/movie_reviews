import axios from 'axios';
import {initUser} from './store';
import jwt from 'jsonwebtoken';

const actions = {
    handleLogin(credentials){
        return(
            axios.post('/login.php',{
                email:credentials.email,
                password:credentials.password
            })
            .then((response)=>{
                console.log(response.data);
                if(response.data && jwt.verify(response.data,'abC123!')){
                    localStorage.setItem('mov_rev_wt',response.data);
                    let user = jwt.decode(response.data);
                    initUser(user);
                }
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
                if(response.data && jwt.verify(response.data,'abC123!')){
                    localStorage.setItem('mov_rev_wt',response.data);
                    let user = jwt.decode(response.data);
                    console.log(user);
                    initUser(user);
                }
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
            axios.post('/desc.php',{id:id})
        )
    },
    handleLogout(){
        localStorage.removeItem('mov_rev_wt');
        window.location.reload(true);
    },
    fetchReview(id){
        return(
            axios.post('/review.php',{id:id})
        )
    },
    fetchComments(id){
        return(
            axios.post('/displayComment.php',{id:id})
        )
    },
    sendComment(jwt,id,comment){
        return(
            axios.post('/insertComment.php',{
                id,jwt,comment
            })
        )
    }
};

export default actions;
