import React from 'react'
import { Header, Image, Divider, Grid, Segment } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'
import xiaoLaJi2 from '../assets/active_resources/xiaolaji.gif'



class FourOFour extends React.Component {

  componentDidMount(){
    const that = this
    setTimeout(function(){
      that.props.history.push("/")
    }, 3000)
  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment className="frostglass">
            <Header className="textColor" as='h1' textAlign='center' >Dungeon Offline</Header>
            <Header className="textColor" as='h1' textAlign='center' >404</Header>
            <Header className="textColor" as='h1' textAlign='center' >But some How we got to the Wrong Page</Header>
            <Divider className="textColor" horizontal>EMMMMM</Divider>
            <Header className="textColor" as='h1' textAlign='center' >We will send you to the right place in a few</Header>
            <Image src={xiaoLaJi2} alt="xiaoLaJi2" centered/>
            <Header className="textColor" as='h4' textAlign='center' >if nothing happens in 3 sec please <Link to="/"> click me</Link>...</Header>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default withRouter(FourOFour)
