import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Segment, Feed, Ref } from 'semantic-ui-react'



class PlayerLog extends Component {

  logBox = null

  handleRef = (node) => {
    this.logBox = node
  }

  scrollToBottom = () => {
    if (this.logBox){
      if (this.logBox.lastElementChild) {
        this.logBox.lastElementChild.scrollIntoView({behavior: "instant", block: "end"});
      }
    }
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render(){
    return(
      <Grid column={1} textAlign="center">
        <Grid.Row column={1}>
          <Grid.Column width={16}>
            <Segment className="transparent No-Space">
              <Ref innerRef={this.handleRef}>
                <Feed className="feedbox" events={this.props.log}/>
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
    log: state.feed.log
  }
}

export default connect(mapStateToProps, null)(PlayerLog)
