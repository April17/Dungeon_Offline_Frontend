import React, { Component } from 'react'
import { connect } from "react-redux"
import { gameInputToggle } from "../redux/adapters/utilityAdapters"
import { addChat } from "../redux/adapters/feedAdapters"
import Game from '../components/Game'
import Inventory from '../components/Inventory'
import Chat from '../components/Chat'
import MonsterHp from '../components/MonsterHp'
import PlayerLog from '../components/PlayerLog'
import HeroStatus from '../components/HeroStatus'
import { Grid, Segment, Tab, Form, Input, Button } from 'semantic-ui-react'
import  '../assets/style/GamePage.css'

const panes = [
    { menuItem: 'Chat', render: () => <Tab.Pane className="frostglass" attached={false} ><Chat/></Tab.Pane> },
    { menuItem: 'PlayerLog', render: () => <Tab.Pane className="frostglass" attached={false} ><PlayerLog/></Tab.Pane> },
  ]


class GamePage extends Component {

  state = {
    chatData: ""
  }

  componentDidMount(){
    if (!localStorage.token) {
      this.props.history.push("/")
    }
  }

  handleFocus = () => {
    this.props.gameInputToggle(false)
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleBlur = () => {
    this.props.gameInputToggle(true)
  }

  handleSubmit = (event) => {
    if (this.state.chatData !== "" ) {
      const message = {summary: `-[${this.props.playerName}]: ${this.state.chatData}`}
      this.props.addChat(message)
      this.setState({chatData: ""})
      event.target.reset()
    }
  }


  render() {
    return (
      <div>
        <Grid column={3} textAlign="center" id="monster-hp-bar">
          <Grid.Column width={10} textAlign="center">
            <Segment className="transparent">
              <MonsterHp/>
            </Segment>
          </Grid.Column>
        </Grid>
        <Grid className="GameUI" column={3} textAlign="center" verticalAlign="bottom">
          <Grid.Row stretched>
            <Grid.Column width={3} textAlign="center">
              <Segment className="transparent">
              </Segment>
            </Grid.Column>
            <Grid.Column width={10} textAlign="center" >
              <Segment className="Game-Component transparent">
                <Game routingProps={this.props}/>
              </Segment>
              <Segment className={this.props.uiState}>
                <HeroStatus />
              </Segment>
            </Grid.Column>
            <Grid.Column width={3} textAlign="center">
              <Segment className="transparent">
              </Segment>
              <Segment className={this.props.uiState}>
                <Inventory/>
              </Segment>
              <Segment className={this.props.uiState}>
                <Grid column={1} textAlign="center">
                  <Grid.Column width={16} >
                    <Tab menu={{ color: "grey", inverted: true, borderless: true, attached: false, tabular: false }} panes={panes} />
                  </Grid.Column>
                  <Grid.Column width={16} id="chatform">
                    <Form onSubmit={this.handleSubmit} >
                      <Form.Field inline>
                        <Grid column={2}  >
                          <Grid.Column width={10} className="No-Space" textAlign="right">
                            <Segment className="No-Space">
                              <Input name="chatData" onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} size='mini' placeholder='Message....' />
                            </Segment>
                          </Grid.Column>
                          <Grid.Column width={6} className="No-Space" textAlign="center">
                            <Segment className="No-Space">
                              <Button primary size='mini' type='submit' >Send</Button>
                            </Segment>
                          </Grid.Column>
                        </Grid>
                      </Form.Field>
                    </Form>
                  </Grid.Column>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    uiState: state.utilityReducer.ui_toggle,
    playerName: state.status.name
  }
}

const mapDispatchToProps = {
  gameInputToggle: gameInputToggle,
  addChat: addChat
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(GamePage);
