import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Progress, Grid, Segment, Header } from 'semantic-ui-react'
// import '../assets/style/HeroStatus.css'


class HeroStatus extends Component {

  render(){
    if (!this.props.player.id) {
      return(
        <p> Getting your Information </p>
      )
    }
    return(
      <Grid columns={3} textAlign='center'>
        <Grid.Row stretched>
          <Grid.Column textAlign='center'>
            <Segment className="transparent No-Space">
              <Header as='h4' className="No-Space textColor">Lv: {this.props.player.level}</Header>
            </Segment>
            <Segment className="transparent No-Space">
              <Progress className="No-Space" total={this.props.player.exp_next_level} value={this.props.player.exp} inverted color='yellow' active size='small'/>
                <Header as='h4' className="No-Space textColor">EXP: {this.props.player.exp}/{this.props.player.exp_next_level}</Header>
            </Segment>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Segment className="transparent No-Space">
              <Progress className="No-Space" total={this.props.player.max_hp} value={this.props.player.hp} inverted color='red' active size='small'/>
                <Header as='h4' className="No-Space textColor">HP: {this.props.player.hp}/{this.props.player.max_hp}</Header>
            </Segment>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Segment className="transparent No-Space">
              <Header as='h4'className="No-Space textColor">Atk: {this.props.player.atk}</Header>
            </Segment>
            <Segment className="transparent No-Space">
              <Header as='h4'className="No-Space textColor">Def: {this.props.player.def}</Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    player: state.status
  }
}

export default connect(mapStateToProps, null)(HeroStatus)
