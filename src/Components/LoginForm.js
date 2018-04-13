import React from 'react';
import  {Form, Button} from 'semantic-ui-react';
import axios from 'axios';

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            loading:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        switch(event.target.name){
            case "em":
                this.setState({email:event.target.value});
            break;
            case "pass":
                this.setState({password:event.target.value});
            break;
        }
    }
    handleSubmit(){
        this.setState({loading:true});
        axios.post('/login.php',{
            email:this.state.email,
            password:this.state.password
        })
    }
    render(){
        return(
            <Form onSubmit={this.handleSubmit} loading={this.state.loading}>
                <Form.Field>
                  <label>Email</label>
                  <input
                      onChange={this.handleChange}
                      value={this.state.email}
                      placeholder='Enter Email'
                      type="email"
                      name="em"
                      required/>
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                       onChange={this.handleChange}
                       value={this.state.pass}
                       placeholder='Enter Password'
                       type="password"
                       name="pass"
                       required/>
                </Form.Field>
                <Button type='submit'>Login</Button>
            </Form>
        );
    }
}

export default LoginForm;
