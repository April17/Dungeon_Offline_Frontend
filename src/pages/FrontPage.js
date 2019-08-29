import React from 'react'
import { Header, Button, Divider, Grid, Segment } from 'semantic-ui-react'
import Login from '../components/Login'
// import Navbar from '../components/navbar'

class Frontpage extends React.Component {
  handleSignup = () => {
    this.props.history.push('/signup')
  }
  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header className="textColor" as='h1' textAlign='center' >Welcome to Dungeon Offline</Header>
          <Segment className="frostglass">
                <Login routingProps={this.props}/>
            <Divider className="textColor" horizontal>Or</Divider>
              <Button onClick={this.handleSignup} color="green" content='Sign up' icon='signup' size='big' />
          </Segment>
        </Grid.Column>
    </Grid>
    )
  }
}

export default Frontpage
