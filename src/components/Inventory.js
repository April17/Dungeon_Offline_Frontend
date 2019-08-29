import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addLog } from '../redux/adapters/feedAdapters'
import { Grid, Header, Segment, Feed } from 'semantic-ui-react'
import Item from './Item'

class Inventory extends Component {

  genItems = () => {
    return this.props.character_items.map(item => <Item key={item.item_id} itemData={item}/>)
  }

  render(){
    return(
      <Grid columns={1} textAlign="center">
        <Grid.Column width={16} textAlign='center'>
          <Header as='h3'>Inventory</Header>
          <Segment className="frostglass">
            <Feed>
              {this.genItems()}
            </Feed>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    character_items: state.status.unique_character_owned_items
  }
}

const mapDispatchToProps = {
  addLog: addLog
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory)
