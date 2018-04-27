import React from 'react';
import {Form,Header,Icon,Message} from 'semantic-ui-react';
import actions from '../actions';

// To add new movie in database
class AddMovieForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            movie_id:"",
            desc:"",
            review:"",
            rating:"",
            errorId:false,
            errorRat:false,
            duplicate:false,
            loading:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        switch(event.target.name){
            case "id":
                this.setState({movie_id:event.target.value})
            break;
            case "desc":
                this.setState({desc:event.target.value})
            break;
            case "rev":
                if(event.target.value.length <= 1800)this.setState({
                    review:event.target.value
                });
            break;
            case "rat":
                this.setState({rating:event.target.value})
            break;
        }
    }

    handleSubmit(event){
        event.preventDefault();
        const identifier = /tt[0-9]{7}/g;
        if(!this.state.movie_id.match(identifier)){
            this.setState({errorId:true})
        }
        if(this.state.rating > 100){
            this.setState({errorRat:true})
        }else{
            this.setState({errorRat:false,errorId:false,loading:true});
            actions.sendMovie(
                this.state.movie_id,
                this.state.desc,
                this.state.review,
                this.state.rating
            )
            .then((response)=>{
                if(!response.data){
                    this.setState({duplicate:true,loading:false})
                }
                else{
                    window.location.assign('/');
                }
            })
        }
    }

    render(){
        return(
            <Form onSubmit={this.handleSubmit} loading={this.state.loading}>
                {this.state.duplicate && <Message negative>Review of this movie already exists !</Message>}
                {this.state.errorId && <Message negative>Invalid id</Message>}
                {this.state.errorRat && <Message negative>Invalid Rating</Message>}
                <Form.Field>
                    <label>Movie id</label>
                    <input name="id" placeholder="Enter Movie id" required onChange={this.handleChange} value={this.state.movie_id}/>
                    <Header dividing/>
                    <label>Description</label>
                    <input name="desc" placeholder="Enter description" required onChange={this.handleChange} value={this.state.desc}/>
                    <Header dividing/>
                    <label>{this.state.review.length}/1800</label>
                    <Form.TextArea name="rev" style={{height:"120px"}} onChange={this.handleChange} required value={this.state.review}/>
                    <Header dividing/>
                    <label>Rating/100 <Icon name="star"/></label>
                    <Form.Input name="rat" required width={6} value={this.state.rating} onChange={this.handleChange} type="number"/>
                    <Header dividing/>
                    <Form.Button type="submit" primary>Add Movie</Form.Button>
                </Form.Field>
            </Form>
        );
    }
}

export default AddMovieForm;
