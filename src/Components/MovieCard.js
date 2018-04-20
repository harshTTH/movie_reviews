import React from 'react';
import {Card,Image,Loader,Modal,Button,Icon,Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import actions from '../actions';
import {getUser} from '../store';

class MovieCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            movie:{},
            desc:"",
            rating:"",
            modelOpen:false
        };
        this.handleDeleteMovie = this.handleDeleteMovie.bind(this);
    }

    componentWillMount(){
        actions.fetchMovie(this.props.id)
        .then(response=>{
            this.setState({movie:response.data});
        });

    }

    componentDidMount(){
        actions.fetchDesc(this.props.id)
        .then(desc=>{
            this.setState({desc:desc.data[0],rating:desc.data[1]})
        })
    }

    handleDeleteMovie(id){
        actions.deleteMovie(id)
        .then(res=>{
            if(res)window.location.reload(true);
        })
    }

    render(){
        return(
            <div>
                {this.state.movie.poster ? (<Card >
                    <Link to={`/movie/${this.props.id}/${this.state.rating}`}>
                        <Image src={this.state.movie.poster.large} style={{width:"100%",height:"70%"}} bordered/>
                    </Link>
                       <Card.Content>
                         <Card.Header>
                           {this.state.movie.title}
                         </Card.Header>
                         <Card.Description>
                           {this.state.desc}
                           {getUser().email === "dummy@dummy.com" && (
                               <Modal
                                    open={this.state.modelOpen}
                                    trigger={<Button color="red" circular size="mini" icon="delete" floated="right" inverted onClick={()=>this.setState({modelOpen:true})}></Button>}
                                    size='small'>
                                   <Header icon='archive' content='Are you sure to remove this movie' />
                                   <Modal.Content>
                                     <p>
                                         You will not be able to recover this movie
                                     </p>
                                   </Modal.Content>
                                   <Modal.Actions>
                                     <Button basic color='red' onClick={()=>{this.setState({modelOpen:false})}}>
                                       <Icon name='remove' /> No
                                     </Button>
                                     <Button color='green' onClick={this.handleDeleteMovie.bind(null,this.props.id)}>
                                       <Icon name='checkmark' /> Yes
                                     </Button>
                                   </Modal.Actions>
                                </Modal>
                           )}
                         </Card.Description>
                     </Card.Content>
                </Card>):(
                <Loader active/>
             )}
            </div>
        );
    }
};

export default MovieCard;
