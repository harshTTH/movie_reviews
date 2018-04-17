import React from 'react';
import {Container} from 'semantic-ui-react';
import MoviesGrid from '../Components/MoviesGrid';
import actions from '../actions';
import {initUser} from '../store';

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
            this.setState({ids:response})
        });
    }
    render(){
        return(
            <Container>
                <MoviesGrid ids={this.state.ids}/>
            </Container>
        );
    }
}

export default HomePage;
