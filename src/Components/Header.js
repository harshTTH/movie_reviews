import React from 'react';
import {Link} from 'react-router-dom';
import {Menu,Button,Modal,Icon,Dropdown,Message} from 'semantic-ui-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import actions from '../actions';
import {getUser,initUser} from '../store';
import jwt from 'jsonwebtoken';
import AddMovieForm from './AddMovieForm';

var event = new CustomEvent("notifyChange", { "detail": "Example of an event" });

class Header extends React.Component{
    constructor(props){
        super(props);
        let wt = localStorage.getItem('mov_rev_wt');
        let user;
        if(wt && jwt.verify(wt,'abC123!')){
            user = false;
            initUser(jwt.decode(wt));
        }else user = true;
        this.state = {
            newUser:user,
            loading:false,
            email:"",
            password:"",
            name:"",
            openLogin:false,
            openSignup:false,
            openAddMovie:false,
            error:false
        }
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
            console.log('logging in');
            actions.handleLogin({
                email : this.state.email,
                password : this.state.password
            })
            .then((response)=>{
                if(response){
                    this.setState({
                        newUser:false,
                        loading:false,
                        error:false
                    });
                    document.dispatchEvent(event);
                }else {
                    this.setState({
                        loading:false,
                        openLogin:true,
                        error:true
                    })
                }
            })
        }
        else if(opt === 2){
            console.log('signing up');
            actions.handleSignup({
                email : this.state.email,
                password : this.state.password,
                name:this.state.name
            })
            .then((response)=>{
                if(response){
                    this.setState({
                        newUser:false,
                        loading:false,
                        error:false
                    });
                    document.dispatchEvent(event);
                }
                else {
                    this.setState({
                        loading:false,
                        openSignup:true,
                        error:true
                    })
                }
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
                            <Modal
                                trigger={<Button onClick={()=>this.setState({loading:false,openLogin:true})}>Login
                                </Button>}
                                open = {this.state.openLogin}
                                onClose = {()=>this.setState({loading:false,openLogin:false,error:false})} size="tiny" dimmer="blurring">
                                <Modal.Header>
                                    <Icon name="lock" size="large"/>
                                    Login
                                </Modal.Header>
                                {this.state.error && this.state.openLogin && <Message color="red" style={{margin:"2%"}}>Invalid Credentials</Message>}
                                <Modal.Content>
                                    <LoginForm
                                        email={this.state.email}
                                        pass={this.state.password}
                                        loading={this.state.loading}
                                        handleChange={this.handleChange}
                                        handleSubmit={this.handleSubmit.bind(null,1)}/>
                                </Modal.Content>
                            </Modal>
                            <Modal size="tiny"
                                trigger = {<Button onClick={()=>this.setState({loading:false,openSignup:true})}>Signup
                                </Button>}
                                open = {this.state.openSignup}
                                onClose = {()=>this.setState({loading:false,openSignup:false,error:false})} dimmer="blurring">
                                <Modal.Header>
                                    <Icon name="user circle" size="large"/>
                                    Signup
                                </Modal.Header>
                                {this.state.error && this.state.openSignup && <Message color="red" style={{margin:"2%"}}>Account with this Email Already exists</Message>}
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
                                    {getUser().email === "dummy@dummy.com" &&
                                        <Modal
                                            trigger={<Dropdown.Item icon='add' text='Add Movie'/>}
                                            dimmer="blurring">
                                            <Modal.Header>
                                                <Icon name="add" size="large"/>
                                                Add Movie
                                            </Modal.Header>
                                            <Modal.Content>
                                                <AddMovieForm/>
                                            </Modal.Content>
                                        </Modal>
                                    }
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
