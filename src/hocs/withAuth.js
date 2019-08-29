import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentUser } from "../redux/adapters/currentUserAdapters";

export default function withAuth(ComponentToBeWrapped) {
  class IntheMiddle extends React.Component {
    componentDidMount() {
      if (!localStorage.token) {
        this.props.history.push("/");
      }
      try {
        this.props.setCurrentUser().catch(e => {
          this.props.history.push("/");
        });
      } catch (e) {
        if (e.message === "Please log in") {
          this.props.history.push("/");
        }
      }
    }

    render() {
      return (
        <ComponentToBeWrapped loggedIn={this.props.loggedIn} {...this.props} />
      );
    }
  }

  const mapStateToProps = state => {
    return {
      loggedIn: state.loggedIn
    };
  };

  const mapDispatchToProps = {
    setCurrentUser: getCurrentUser
  };

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(IntheMiddle)
  );
}
