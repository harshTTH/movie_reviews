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
            comments:[],
            comment:"",
            notify:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendComment = this.sendComment.bind(this);
        this.changeNotify = this.changeNotify.bind(this);
    }

    changeNotify(e){
        this.setState({notify:false})
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

        if(localStorage.getItem('mov_rev_wt'))this.setState({notify:false});
        else this.setState({notify:true});

        document.addEventListener('notifyChange',this.changeNotify);
    }

    handleChange(event){
        this.setState({
            comment:event.target.value
        });
    }

    sendComment(){
        const wt = localStorage.getItem('mov_rev_wt');
        console.log(wt);
        if(wt)
            actions.sendComment(wt,this.props.match.params.movieId,this.state.comment)
            .then(response=>{
                if(response.data)window.location.reload(true);
            })
        else  this.setState({notify:true})

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
                    handleChange={this.handleChange}
                    sendComment={this.sendComment}
                    comments={this.state.comments}
                    notify={this.state.notify}
                />
            </Container>
        );
    }
}

export default MoviePage;
