import React from 'react';
import {Link} from 'react-router-dom';
import {Menu,Button} from 'semantic-ui-react';

const Header = (props) => {
    const {classes} = props;
    return(
        <Menu>
            <Menu.Item name="Home" as={Link} to="/" />
            <Menu.Item position="right">
                <Button>Login</Button>
            </Menu.Item>
        </Menu>
    );
}

export default Header;
