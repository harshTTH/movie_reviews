import React from 'react';
import {Container} from 'semantic-ui-react';
import Header from '../Components/Header';

class HomePage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Container>
                <Header/>
            </Container>
        );
    }
}

export default HomePage;
