import React from 'react';
import {Comment} from 'semantic-ui-react';

const Comments = (props) => (
    <div>
        {props.comments === []}
    </div>
)

export default Comments;
