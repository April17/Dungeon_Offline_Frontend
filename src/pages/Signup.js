import React from 'react'
import { Button, Form, Grid, Header, Segment, Divider } from 'semantic-ui-react'
import { connect } from "react-redux"
import { signUp } from '../redux/adapters/currentUserAdapters'


class Signup extends React.Component{
  state = {
    username: '',
    password: '',
    confirmPassword: ''
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = () => {
    this.props.signUp(this.state)
    .then(data => {
      if (data.success) {
        console.log(data.success);
        this.props.history.push("/")
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  handleClick = () => {
    this.props.history.push("/")
  }

  render() {
    return(
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header className="textColor" as='h2' color='black' textAlign='center'>
                 Sign Up
            </Header>
            <Segment className="frostglass" raised>
              <Form onSubmit={this.handleSubmit}>
                <Segment className="transparent" raised>
                  <Form.Field>
                  <Header className="textColor" as='h3' color='black' textAlign='center'>
                      Dungeon Offline
                  </Header>
                  </Form.Field>
                  <Form.Field>
                    <div className="ui left icon input">
                      <i className="user icon"></i>
                      <input name="username" onChange={this.handleChange} placeholder='Username' />
                    </div>
                  </Form.Field>
                  <Form.Field>
                    <div className="ui left icon input">
                      <i className="user outline icon"></i>
                      <input name="name" onChange={this.handleChange} placeholder='Display Name' />
                    </div>
                  </Form.Field>
                  <Form.Field>
                    <div className="ui left icon input">
                      <i className="lock icon"></i>
                      <input type="password" name="password" onChange={this.handleChange} placeholder='Password' />
                    </div>
                  </Form.Field>
                  <Form.Field>
                    <div className="ui left icon input">
                      <i className="lock icon"></i>
                      <input type="password" name="password_confirmation" onChange={this.handleChange} placeholder='Confirm Password' />
                    </div>
                  </Form.Field>
                  <Button type='submit' color="green" size='big'>Submit</Button>
                </Segment>
              </Form>
              <Divider className="textColor" horizontal>Or</Divider>
              <Button onClick={this.handleClick} color="teal" content='Login' size='big' />
            </Segment>
          </Grid.Column>
      </Grid>
    )
  }


}

const mapDispatchToProps = {
  signUp: signUp
}

export default connect(
    null,
    mapDispatchToProps
  )(Signup);
