import React from 'react';
import {Grid} from 'semantic-ui-react';
import MovieCard from './MovieCard';

const MoviesGrid = (props) => (
    <Grid stackable container doubling style={{margin:"2%"}}>
        {props.ids.map((id)=>(
            <Grid.Column width={4} key = {id}>
                <MovieCard id={id}/>
            </Grid.Column>
        ))}
    </Grid>
);

export default MoviesGrid;
