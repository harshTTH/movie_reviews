import React from 'react';
import {Card,Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import actions from '../actions';

class MovieCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            movie:{}
        };
    }

    componentWillMount(){
        actions.fetchMovie(this.props.id)
        .then(response=>{
            console.log(response.data);
            this.setState({movie:response.data});
        });
    }

    render(){
        console.log(this.state.movie.poster)
        let {description} = this.state.movie;
        if(this.state.movie){
            if(description && description.length > 60)
                description = description.substr(0,50) + '...';
        }
        return(
            <div>
            {this.state.movie.poster && <Card style={{height:"400px"}}>
               <Image src={this.state.movie.poster.large} style={{width:"100%",height:"70%"}} bordered/>
               <Card.Content>
                 <Card.Header>
                   {this.state.movie.title}
                 </Card.Header>
                 <Card.Description>
                   {description}
                 </Card.Description>
             </Card.Content>
         </Card>}
         </div>
        );
    }
};

export default MovieCard;
