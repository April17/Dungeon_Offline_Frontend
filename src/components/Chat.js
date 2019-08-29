import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Segment, Feed, Ref } from 'semantic-ui-react'



class Chat extends Component {

  chatBox = null

  handleRef = (node) => {
    this.chatBox = node
  }

  scrollToBottom = () => {
    if (this.chatBox) this.chatBox.lastElementChild.scrollIntoView({behavior: "instant", block: "end"});
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render(){
    return(
      <Grid columns={1} textAlign='center'>
        <Grid.Row column={1}>
          <Grid.Column width={16}>
            <Segment className="transparent No-Space">
              <Ref innerRef={this.handleRef}>
                <Feed className="feedbox" events={this.props.chat}/>
              </Ref>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    player: state.status,
    chat: state.feed.chat
  }
}

export default connect(mapStateToProps, null)(Chat)
