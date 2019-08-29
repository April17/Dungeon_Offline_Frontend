import React, { Component, Fragment } from 'react'
import { Menu, Header } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentUser, logOut } from '../redux/adapters/currentUserAdapters'
import  '../assets/style/NavBar.css'



class NavBar extends Component {
  componentDidMount() {
    this.props.setUser()
  }
  onLogout = () => {
    this.props.logOut()
    this.props.history.push('/')
  }

  render() {
    return (
      <Menu className="navbar">
        <Menu.Item name='browse'>
          <Header as="h3">Dungeon Offline</Header>
        </Menu.Item>
        {this.props.user.name ?
          ( <Menu.Item name='browse'>
              <Header as="h4">Welcome back {this.props.user.name}</Header>
            </Menu.Item> ) :
          ( null )
        }
        <Menu.Menu position='right'>
        {
          this.props.user.name ? (
            <Fragment>
              <Menu.Item name='account'>
                <Link to="/profile">Account</Link>
              </Menu.Item>
              <Menu.Item name='logout'>
                <Link onClick={this.onLogout} to="/">Logout</Link>
              </Menu.Item>
            </Fragment>
          ) : (
            <Menu.Item name='signup'>
              <Link to="/signup">Sign Up</Link>
            </Menu.Item>
          )
        }
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser
  }
}

const mapDispatchToProps = {
  setUser: getCurrentUser,
  logOut: logOut
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
