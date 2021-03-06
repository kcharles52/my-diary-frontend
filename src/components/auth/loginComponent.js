import React, { Component, Fragment } from "react";
import loginAction from "../../actions/auth/loginAction";
import { Loading } from "../../actions/loadingAction";
import { connect } from "react-redux";
import "../../assets/login.scss";
import Footer from "../common/footer";
import LoginForm from "../../views/loginForm";
import NavBar from "../common/navBar";

export class Login extends Component {
  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.isLoggedIn) {
      localStorage.setItem("token", nextProps.user.user.Token);
      this.props.history.push("/");
    }
  }
  handleValidSubmit = (event, values) => {
    this.props.Loading(true);
    this.props.loginAction(values);
  };
  render() {
    return (
      <Fragment>
        <NavBar />
        <LoginForm
          submit={this.handleValidSubmit}
          loader={!this.props.isLoading}
          error={this.props.error}
        />
        <Footer />
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  user: state.userReducer,
  isLoading: state.loadingReducer.isLoading,
  error: state.userReducer.error
});
export default connect(
  mapStateToProps,
  { loginAction, Loading }
)(Login);
