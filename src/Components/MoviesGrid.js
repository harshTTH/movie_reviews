import React from 'react';
import {Grid} from 'semantic-ui-react';
import MovieCard from './MovieCard';

const MoviesGrid = (props) => (
    <Grid container stackable style={{margin:"2%"}}>
        {props.ids.map((id)=>(
            <Grid.Column width={3} key = {id}>
                <MovieCard id={id}/>
            </Grid.Column>
        ))}
    </Grid>
);

export default MoviesGrid;
