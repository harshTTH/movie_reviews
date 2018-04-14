import React from 'react';
import  {Form, Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const LoginForm = (props) => (
    <Form onSubmit={props.handleSubmit} loading={props.loading}>
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
               placeholder='Enter Password'
               type="password"
               name="pass"
               required/>
        </Form.Field>
        <Button type='submit'>Login</Button>
    </Form>
);

LoginForm.propTypes = {
    handleSubmit:PropTypes.func.isRequired,
    handleChange:PropTypes.func.isRequired,
    loading:PropTypes.bool.isRequired,
    email:PropTypes.string.isRequired,
    pass:PropTypes.string.isRequired
}
export default LoginForm;
