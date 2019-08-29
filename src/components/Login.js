import React from 'react'
import { Button, Form, Header, Segment } from 'semantic-ui-react'
import { connect } from "react-redux"
import { logIn } from '../redux/adapters/currentUserAdapters'


class Login extends React.Component {

  state = {
    username: "",
    password: "",
  }

  componentDidMount() {
    if (localStorage.token) {
      this.props.routingProps.history.push("/profile")
    }
  }

  handelSubmit = (event) => {
    this.props.logIn(this.state)
      .then(()=> {
          this.props.routingProps.history.push("/profile")
        })
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
      return (
        <div>
          <Header className="textColor" as='h2' textAlign='center'>
               Log-in to your account
          </Header>
          <Form size='large' onSubmit={this.handelSubmit}>
            <Segment className="transparent" raised>
              <Form.Input
                fluid
                name="username"
                icon='user'
                iconPosition='left'
                placeholder='Username'
                onChange={this.handleChange}
              />
              <Form.Input
                  fluid
                  name="password"
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handleChange}
              />
              <Button color='teal' fluid size='large'>
                  Login
              </Button>
            </Segment>
          </Form>
        </div>
      )
  }
}

const mapDispatchToProps = {
  logIn: logIn
}

export default connect(
    null,
    mapDispatchToProps
  )(Login);
