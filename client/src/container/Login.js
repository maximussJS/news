import React,{Component} from 'react'
import LoginForm from '../components/LoginForm'
import {withRouter} from 'react-router-dom'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      login : '',
      password : '',
      error : ''
    }
    this.onLoginChange = this.onLoginChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onLoginChange(e) {
    this.setState({
      login : e.target.value
    })
  }

  onPasswordChange(e) {
    this.setState({
      password : e.target.value
    })
  }

  onSubmit() {
    alert('Login : ' + this.state.login + ' password : ' + this.state.password)
  }

  render () {
    return (
        <LoginForm onSubmit={this.onSubmit}
                   onPasswordChange={this.onPasswordChange}
                   onLoginChange={this.onLoginChange}
                   error={this.state.error}/>
    )
  }
}

export default withRouter(Login)