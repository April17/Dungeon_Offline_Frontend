import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Progress, Grid, Header, Segment } from 'semantic-ui-react'


class MonsterHp extends Component {

  render(){
    // console.log(this.props.monsterHpBar);
    return(
      <Grid columns={3} textAlign='center'>
        <Grid.Column textAlign='center'>
          <Segment className={this.props.monsterHpBar}>
            <Header className="No-Space textColor" as='h3'>{this.props.monster.name}: {this.props.monster.monster_type}</Header>
            <Progress total={this.props.monster.max_hp} value={this.props.monster.hp} inverted color='red' active size='small'/>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    monster: state.monsterStatus,
    monsterHpBar: state.utilityReducer.monster_hp_toggle
  }
}

export default connect(mapStateToProps, null)(MonsterHp)
