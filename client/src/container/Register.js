import React,{Component} from 'react'
import RegisterForm from '../components/RegisterForm'
import {withRouter} from 'react-router-dom'
import {register} from '../utils/requests'
import {Authenticate} from '../utils/auth'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name : '',
      email : '',
      password : '',
      confirmPassword : '',
      age : null,
      country : '',
      radio : null,
      isLoading : false,
      error : ''
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onReset = this.onReset.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this)
    this.onAgeChange = this.onAgeChange.bind(this)
    this.onRadioChange = this.onRadioChange.bind(this)
    this.onCountryChange = this.onCountryChange.bind(this)
  }

  onSubmit = async () => {
      try {
        this.setState({
          isLoading : true
        })
        const response = await register({
          name : this.state.name,
          email : this.state.email,
          password : this.state.password,
          age : this.state.age,
          country : this.state.country,
          gender : this.state.radio
        })
        alert(response.token)
        if(response.success) {
          Authenticate(response.token)
          this.props.history.push('/')
        }
        else {
          this.setState({
            error : response.message
          })
        }
      }
      catch (e) {
        this.setState({
          error : e.message
        })
      }
  }

  onNameChange(e) {
    this.setState({
      name : e.target.value
    })
  }

  onEmailChange(e) {
    this.setState({
      email : e.target.value
    })
  }

  onPasswordChange(e) {
    this.setState({
      password : e.target.value
    })
  }

  onConfirmPasswordChange(e) {
    if(!this.state.password) {
      this.setState({
        confirmPassword : e.target.value
      })
      return
    }
    let err
    if(this.state.password !== e.target.value) err = 'Passwords do not match'
    else err = ''
    this.setState({
      confirmPassword : e.target.value,
      error : err
    })
  }

  onAgeChange(e) {
    this.setState({
      age : e.target.value
    })
  }

  onCountryChange(e) {
    this.setState({
      country : e.target.value
    })
  }

  onRadioChange = number => {
    this.setState({
      radio : number
    })
  }

  onReset() {
    this.setState({
      name : '',
      email : '',
      password : '',
      confirmPassword : '',
      age : null,
      country : '',
      radio : null,
      error : '',
      isLoading : false
    })
  }

  render() {
    return (
      <RegisterForm onSubmit={this.onSubmit}
                    onNameChange={this.onNameChange}
                    onEmailChange={this.onEmailChange}
                    onPasswordChange={this.onPasswordChange}
                    onConfirmPasswordChange={this.onConfirmPasswordChange}
                    onAgeChange={this.onAgeChange}
                    onCountryChange={this.onCountryChange}
                    onRadioChecked={this.onRadioChange}
                    onReset={this.onReset}
                    isLoading={this.state.isLoading}
                    error={this.state.error}
                    name={this.state.name}
                    email={this.state.email}
                    password={this.state.password}
                    confirmPassword={this.state.confirmPassword}
                    age={this.state.age}
                    country={this.state.country}
                    radio={this.state.radio}/>
    )
  }
}

export default withRouter(Register)