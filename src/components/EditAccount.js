import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import {editAccount} from '../redux/adapters/currentUserAdapters'
import {modalToggle} from '../redux/adapters/utilityAdapters'




class EditAccount extends React.Component{
  state = {
    id: this.props.user.id,
    name: '',
    password: '',
    password_confirmation: ''
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    this.props.editAccount(this.state)
  }

  render() {
    return(
      <Grid.Column textAlign='center'>
        <Form>
          <Segment className="transparent">
            <Form.Field>
              <Header className="textColor" as='h3'>{this.props.user.username}</Header>
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
            <Button name="edit_account" value={false} color='green' type='submit' onClick={this.handleSubmit}>Submit</Button>
            <Button name="edit_account_modal" value={false} color='red' onClick={this.props.handleModalToogle}>Cancel</Button>
          </Segment>
        </Form>
      </Grid.Column>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser
  }
}

const mapDispatchToProps = {
  editAccount: editAccount,
  modalToggle: modalToggle
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(EditAccount));
