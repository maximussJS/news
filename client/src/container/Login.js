import React,{Component} from 'react'
import LoginForm from '../components/LoginForm'
import {withRouter} from 'react-router-dom'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      login : '',
      password : '',
      error : '',
      isLoading : false
    }
    this.onLoginChange = this.onLoginChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onReset = this.onReset.bind(this)
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

  onReset() {
    this.setState({
      password : '',
      login : '',
      isLoading : false
    })
  }

  onSubmit() {
    this.setState({
      isLoading: true
    })
    alert('Login : ' + this.state.login + ' password : ' + this.state.password)
    this.onReset()
  }

  render () {
    return (
        <LoginForm onSubmit={this.onSubmit}
                   onPasswordChange={this.onPasswordChange}
                   onLoginChange={this.onLoginChange}
                   onReset={this.onReset}
                   error={this.state.error}
                   login={this.state.login}
                   password={this.state.password}
                   isLoading={this.state.isLoading}/>
    )
  }
}

export default withRouter(Login)