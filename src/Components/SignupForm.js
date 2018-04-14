import React from 'react';
import  {Form, Button} from 'semantic-ui-react';
import axios from 'axios';
import PropTypes from 'prop-types';

const SignupForm  = (props) => (
    <Form onSubmit={props.handleSubmit} loading={props.loading}>
        <Form.Field>
          <label>Name</label>
            <input
                onChange={props.handleChange}
                value={props.name}
                placeholder='Enter Name'
                type="text"
                name="nm"
                required/>
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
              onChange={props.handleChange}
              value={props.email}
              placeholder='Enter Email'
              type="email"
              name="em"
              required/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
              onChange={props.handleChange}
              value={props.pass}
              placeholder='Create Password'
              type="password"
              name="pass"
              required/>
        </Form.Field>
        <Button type='submit'>SignUp</Button>
    </Form>
);

SignupForm.propTypes = {
    handleSubmit:PropTypes.func.isRequired,
    handleChange:PropTypes.func.isRequired,
    loading:PropTypes.bool.isRequired,
    email:PropTypes.string.isRequired,
    pass:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired
}

export default SignupForm;
