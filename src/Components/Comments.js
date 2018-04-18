import React from 'react';
import {Comment,Icon,Grid,Dimmer,Loader,Form,Header,Button,Popup} from 'semantic-ui-react';
import jwt from 'jsonwebtoken';

const verifyComment = (token) => {
    if(jwt.verify(token,'abC123!')){
        var user = jwt.decode(token);
    }
    return user;
}

const Comments = (props) => (
    <Grid style={{padding:"1%"}}>
        <Grid.Row>
            <Grid.Column width={16}>
                <Comment.Group>
                    <Header as='h3' dividing>Comments</Header>
                    {props.comments.length === 0 ? (<h4>Be the First To Comment</h4>) : props.comments.map((comment,index)=>{
                        var user = verifyComment(comment.jwt);
                        if(user)return(
                            <Comment key={index}>
                              <Comment.Content>
                                <Comment.Author>
                                    <Icon name="user circle outline" size="large" bordered circular/>
                                    {user.name}
                                </Comment.Author>
                                <Comment.Metadata>
                                    <div>{comment.date}</div>
                                </Comment.Metadata>
                                <Comment.Text>{comment.text}</Comment.Text>
                              </Comment.Content>
                            </Comment>
                        );
                    })}
                <Form onSubmit={props.sendComment}>
                  <Form.TextArea onChange={props.handleChange} required/>
                  {props.notify ?(
                      <Popup
                        trigger={<Button type="submit" content="Add Comment" labelPosition='left' icon='edit' primary />}
                        position="top right"
                        content="Login or Signup to add comment !"
                      />
                  ):(
                    <Button type="submit" content="Add Comment" labelPosition='left' icon='edit' primary />
                  )}
                </Form>
                </Comment.Group>
            </Grid.Column>
        </Grid.Row>
    </Grid>
)

export default Comments;
