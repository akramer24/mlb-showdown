import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import { NavLink } from 'react-router-dom';
import navTo from './utils/navTo';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props

  return (
    <form id="credentials-form" onSubmit={handleSubmit} name={name}>
      {
        name === 'signup' &&
        <div className="form-field">
          <input name="team" type="text" placeholder="Team Name" />
        </div>
      }
      <div className="form-field">
        <input name="email" type="text" placeholder="Email" />
      </div>
      <div className="form-field">
        <input name="password" type="password" placeholder="Password" />
      </div>
      <div id="credentials-buttons">
        <div id="credentials-buttons-row">
          <button id="credentials-submit-button" type="submit">{displayName}</button>
          {name === 'login' && <button id="create-account-button" onClick={() => navTo('/signup')}>Create an account</button>}
        </div>
        <a href="/auth/google"><img src="/btn_google_signin_dark_normal_web.png" id="google-signin-button" /></a>
      </div>
      {error && error.response && <div> {error.response.data} </div>}
    </form>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const teamName = formName === 'signup' ? evt.target.team.value : null;
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName, teamName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
