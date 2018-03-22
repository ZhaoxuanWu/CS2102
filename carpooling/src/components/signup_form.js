import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import * as actions from '../actions';


class SignupForm extends Component {
  state = { email: '', password: '', ic: '',
            firstname: '', lastname: '',
            username: '', phonenumber: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit(e){
    e.preventDefault();
    const { email, password, ic, firstname, lastname, username, phonenumber } = this.state;
    let data = {
      email: email,
      password: password,
      ic: ic,
      firstname: firstname,
      lastname: lastname,
      username: username,
      phonenumber: phonenumber
    }
    this.props.createUser(data);
  }

  render() {
    const { email, password, ic, firstname, lastname, username, phonenumber } = this.state;

    return (
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Icon name='star' color='teal' />
              {' '}Sign up a new account
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='user' name='email' value={email}
                  iconPosition='left'
                  placeholder='E-mail address'
                  onChange={this.handleChange}
                />
                <Form.Input fluid icon='lock' name='password' value={password}
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handleChange}
                />
                <Form.Input fluid icon='drivers license' name='ic' value={ic}
                  iconPosition='left'
                  placeholder='NRIC/FIN'
                  onChange={this.handleChange}
                />
                <Form.Input fluid name='firstname' value={firstname}
                  placeholder='First name'
                  onChange={this.handleChange}
                />
                <Form.Input fluid name='lastname' value={lastname}
                  placeholder='Last name'
                  onChange={this.handleChange}
                />
                <Form.Input fluid name='username' value={username}
                  placeholder='Username'
                  onChange={this.handleChange}
                />
                <Form.Input fluid name='phonenumber' value={phonenumber}
                  placeholder='Phone number'
                  onChange={this.handleChange}
                />

                <Button color='teal' fluid size='large' onClick={this.handleSubmit.bind(this)}>Sign Up</Button>
              </Segment>
            </Form>
            <Message>
              Already have an account? <Link to='/'>Log in</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(SignupForm);
