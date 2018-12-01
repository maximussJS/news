import React,{Component} from 'react'
import LoginForm from '../components/LoginForm'
import {withRouter} from 'react-router-dom'
import {dologin} from '../utils/requests'
import {Authenticate} from '../utils/auth'

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

  onSubmit = async()  => {
    try {
       const response = await dologin({
         email : this.state.login,
         password : this.state.password
       })
      alert("RSULT" +response)
       if(response.success) {
         console.log(response)
         Authenticate(response.token)
         this.props.history.push('/')
       }
       else {
         this.setState({
           error : 'Invalid login or password'
         })
       }
     }
     catch (e) {
       alert(e )
     }
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