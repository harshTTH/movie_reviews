import React from 'react';
import MovieHeader from '../Components/MovieHeader';
import {Container} from 'semantic-ui-react';
import actions from '../actions';

class MoviePage extends React.Component{
    constructor(props){
        super(props);//movieId=props.match.params.movieId
        this.state = {
            movie:""
        }
    }

    componentDidMount(){
        actions.fetchMovie(this.props.match.params.movieId)
        .then((response)=>{
            //console.log(response.data)
            this.setState({movie:response.data})
        })
    }

    render(){
        if(this.state.movie){
            var trailer = this.state.movie.trailer[0].videoUrl;
            var director = this.state.movie.director;
            var poster =  this.state.movie.poster.large;
            var title = this.state.movie.title;
        }
        return(
            <Container>
                <MovieHeader
                    trailer={trailer}
                    director={director}
                    poster={poster}
                    title={title}
                />
            </Container>
        );
    }
}

export default MoviePage;
