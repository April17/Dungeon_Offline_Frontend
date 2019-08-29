import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Feed, Popup, Image, Segment, Dimmer, Loader} from 'semantic-ui-react'
import hp_potion from '../assets/active_resources/naichalaji.jpg'
import atk_potion from '../assets/active_resources/xiaolaji.gif'
import super_atk_potion from '../assets/active_resources/xiao_la_ji.gif'

const iconMap = {
  "small_HP": hp_potion,
  "large_HP": hp_potion,
  "atk_potion": atk_potion,
  "super_atk_potion": super_atk_potion
}


class Item extends Component {

  itemInfo = () => {
    return (this.props.itemData.item.effect + `(cooldown: ${this.props.itemData.item.cooldown/1000} sec)`)
  }

  render(){
    return(
      <Feed.Event>
        <Feed.Label>
          <Segment className="transparent No-Space">
            <Dimmer className="frostglass No-Space" id={this.props.itemData.item.icon_name} active={this.props.cooldownState[this.props.itemData.item.icon_name]} inverted>
              <Loader />
            </Dimmer>
              <Image src={iconMap[this.props.itemData.item.icon_name]} alt={this.props.itemData.item.icon_name} fluid circular/>
          </Segment>
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
              <Popup content={this.itemInfo()} trigger={<Feed.User>{this.props.itemData.item.name}</Feed.User>} /> x{this.props.itemData.quantity}
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    )
  }
}

const mapStateToProps = state => {
  return {
    cooldownState: state.utilityReducer.cooldownState
  }
}

export default connect(mapStateToProps, null)(Item)
