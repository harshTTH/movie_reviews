import React from 'react';
import ReactPlayer from 'react-player';
import {Card,Dimmer,Image,Loader,Icon,Modal,Grid,Header} from 'semantic-ui-react';

const MovieHeader = (props) => (
    <Grid style={{margin:"0"}}>
        <Grid.Column width={4} style={{margin:"0",padding:"1"}}>
            <Card>
            <Image src={props.poster}/>
               <Card.Content>
                 <Card.Header>
                   {props.title} ({props.year})
                 </Card.Header>
                 <Card.Meta>
                   <span>
                    {props.director}
                   </span>
                 </Card.Meta>
               </Card.Content>
               <Card.Content extra>
                <Modal
                    basic
                    trigger={<a>
                    <Icon name='video play' />
                    View Trailer
                    </a>}
                    dimmer="blurring">
                    <Modal.Content>
                        <div className="player-wrapper">
                            <ReactPlayer url={props.trailer} volume="1" controls playing width="100%" height="100%"/>
                        </div>
                    </Modal.Content>
                </Modal>
               </Card.Content>
            </Card>
        </Grid.Column>
        <Grid.Column width={12} style={{padding:"1"}}>
            <Card fluid>
                <Card.Header>
                    <h3 style={{margin:"1%"}}>Storyline</h3>
                </Card.Header>
                <Card.Content>
                    <h5>
                        {props.storyline}
                    </h5>
                </Card.Content>
                <Card.Content>
                    Writers - <br/>
                    {props.writers && props.writers.map((writer,index)=>{
                        if(index < props.writers.length - 1)return writer + ", ";
                        else return writer
                    })}
                </Card.Content>
                <Card.Content>
                    Actors - <br/>
                    {props.cast && props.cast.map((cast,index)=>{
                        if(index < props.cast.length - 1)return cast.name + ", ";
                        else return cast.name
                    })}
                </Card.Content>
            </Card>
            <Card fluid loading>
                <Card.Header>
                    <h3 style={{margin:"1%"}}>Review</h3>
                </Card.Header>
                <Card.Content>
                    {props.review === "" ? (
                        <Dimmer active inverted>
                            <Loader content="What are my views ?"/>
                        </Dimmer>
                    ):(
                        <h4>
                            {props.review}
                        </h4>
                    )}
                </Card.Content>
            </Card>
        </Grid.Column>
    </Grid>
);

export default MovieHeader;
