import React from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import {Menu,Button,Modal,Icon} from 'semantic-ui-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newUser:true
        }
    }

    render(){
        return(
            <div>
                <Menu>
                    <Menu.Item name="Home" as={Link} to="/" />
                    <Menu.Item position="right">
                        <Modal size="tiny" dimmer="blurring" trigger={<Button>Login</Button>}>
                            <Modal.Header>
                                <Icon name="lock" size="large"/>
                                Login
                            </Modal.Header>
                            <Modal.Content>
                                <LoginForm/>
                            </Modal.Content>
                        </Modal>
                        <Modal size="tiny" dimmer="blurring" trigger={<Button>Signup</Button>}>
                            <Modal.Header>
                                <Icon name="user circle" size="large"/>
                                Signup
                            </Modal.Header>
                            <Modal.Content>
                                <SignupForm/>
                            </Modal.Content>
                        </Modal>
                    </Menu.Item>
                </Menu>

            </div>
        );
    }
}

export default Header;
