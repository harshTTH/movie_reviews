import React from 'react';
import {Container} from 'semantic-ui-react';
import Header from '../Components/Header';
import MoviesGrid from '../Components/MoviesGrid';
import actions from '../actions';

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ids:[]
        }
    }
    componentDidMount(){
        actions.fetchMovieIdList()
        .then(response=>{
            console.log(response);
            this.setState({ids:response.split(',')})
        });
    }
    render(){
        return(
            <Container>
                <Header/>
                <MoviesGrid ids={this.state.ids}/>
            </Container>
        );
    }
}

export default HomePage;
