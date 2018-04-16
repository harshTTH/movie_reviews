import React from 'react';
import {Container} from 'semantic-ui-react';
import Header from '../Components/Header';

const Skeleton = (props) => (
    <Container>
        <Header/>
        {props.children}
    </Container>
);
export default Skeleton;
