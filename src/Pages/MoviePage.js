import React from 'react';
import MovieHeader from '../Components/MovieHeader';
import {Container} from 'semantic-ui-react';
import actions from '../actions';
import Comments from '../Components/Comments';

class MoviePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            movie:"",
            review:"",
            comments:[]
        }
    }

    componentDidMount(){
        actions.fetchMovie(this.props.match.params.movieId)
        .then((response)=>{
            //console.log(response.data)
            this.setState({movie:response.data})
        })
        actions.fetchReview(this.props.match.params.movieId)
        .then((response)=>{
            this.setState({review:response.data})
        })
        actions.fetchComments(this.props.match.params.movieId)
        .then((response)=>{
            this.setState({comments:response.data})
        })
    }

    render(){
        if(this.state.movie){
            var trailer = this.state.movie.trailer[0].videoUrl;
            var director = this.state.movie.director;
            var poster =  this.state.movie.poster.large;
            var title = this.state.movie.title;
            var year = this.state.movie.year;
            var storyline = this.state.movie.storyline;
            var writers = this.state.movie.writers;
            var cast = this.state.movie.cast;
        }
        return(
            <Container>
                <MovieHeader
                    trailer={trailer}
                    director={director}
                    poster={poster}
                    title={title}
                    storyline={storyline}
                    year={year}
                    cast={cast}
                    writers={writers}
                    review={this.state.review}
                />
                <Comments
                    comments={this.state.comments}
                />
            </Container>
        );
    }
}

export default MoviePage;
