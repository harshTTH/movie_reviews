import React from 'react';
import {Link} from 'react-router-dom';
import {Menu,Button,Modal,Icon,Dropdown} from 'semantic-ui-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import actions from '../actions';
import {getUser,initUser} from '../store';

class Header extends React.Component{
    constructor(props){
        super(props);
        let wt = localStorage.getItem('mov_rev_wt');
        let user;
        if(wt){
            user = false;
            initUser(wt);
        }else user = true;
        this.state = {
            newUser:user,
            loading:false,
            email:"",
            password:"",
            name:""
        }
        console.log(getUser())
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        switch(event.target.name){
            case "em":
                this.setState({email:event.target.value});
            break;
            case "pass":
                this.setState({password:event.target.value});
            break;
            case "nm":
                this.setState({name:event.target.value});
            break;
        }
    }

    handleSubmit(opt){
        this.setState({loading:true});
        if(opt === 1){
            actions.handleLogin({
                email : this.state.email,
                password : this.state.password
            })
            .then((response)=>{
                if(response)this.setState({
                    newUser:false,
                    loading:false
                });
            })
        }
        else if(opt === 2){
            actions.handleSignup({
                email : this.state.email,
                password : this.state.password,
                name:this.state.name
            })
            .then((response)=>{
                if(response)this.setState({newUser:false});
            })
        }
    }

    render(){
        return(
            <div>
                <Menu>
                    <Menu.Item name="Home" as={Link} to="/" />
                    <Menu.Item position="right">
                        {this.state.newUser ? (
                            <div>
                                <Modal size="tiny" dimmer="blurring" trigger={<Button onClick={()=>this.setState({loading:false})}>Login</Button>}>
                                    <Modal.Header>
                                        <Icon name="lock" size="large"/>
                                        Login
                                    </Modal.Header>
                                    <Modal.Content>
                                        <LoginForm
                                            email={this.state.email}
                                            pass={this.state.password}
                                            loading={this.state.loading}
                                            handleChange={this.handleChange}
                                            handleSubmit={this.handleSubmit.bind(null,1)}/>
                                    </Modal.Content>
                                </Modal>
                                <Modal size="tiny" dimmer="blurring" trigger={<Button onClick={()=>this.setState({loading:false})}>Signup</Button>}>
                                    <Modal.Header>
                                        <Icon name="user circle" size="large"/>
                                        Signup
                                    </Modal.Header>
                                    <Modal.Content>
                                        <SignupForm
                                            email={this.state.email}
                                            pass={this.state.password}
                                            loading={this.state.loading}
                                            name={this.state.name}
                                            handleChange={this.handleChange}
                                            handleSubmit={this.handleSubmit.bind(null,2)}/>
                                    </Modal.Content>
                                </Modal>
                            </div>
                        ):
                        (
                            <Dropdown text={getUser().name} icon="user circle" floating labeled button className='icon'>
                                <Dropdown.Menu>
                                    <Dropdown.Item icon='arrow left' text='Logout' onClick={actions.handleLogout}/>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default Header;
