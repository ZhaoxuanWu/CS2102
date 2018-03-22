import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import * as actions from '../actions';


class LoginForm extends Component {
  state = { email: '', password: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit(e){
    e.preventDefault();
    const { email, password } = this.state;
    this.props.getUserLogin(email, password, () => this.props.history.push('/index'));
  }

  render() {
    const { email, password } = this.state;

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
              <Icon name='car' color='teal' />
              {' '}Log-in to your account
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

                <Button color='teal' fluid size='large' onClick={this.handleSubmit.bind(this)}>Login</Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to="/signup">Sign Up</Link>
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

export default connect(mapStateToProps, actions)(LoginForm);
