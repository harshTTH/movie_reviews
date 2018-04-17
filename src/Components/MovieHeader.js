import React from 'react';
import ReactPlayer from 'react-player';
import {Card,Image,Icon,Modal} from 'semantic-ui-react';

const MovieHeader = (props) => (
    <Card fluid>
       <Image src={props.poster} size="small"/>
       <Card.Content>
         <Card.Header>
           {props.title}
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
);

export default MovieHeader;
