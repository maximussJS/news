import React,{Component} from 'react'
import OptionForm from '../components/Options'

class Options extends Component {
   constructor (props) {
     super(props)
     this.state = {
       name : '',
       email : '',
       password : '',
       confirmPassword : '',
       country : '',
       age : null,
       gender : '',
       isLoading : false,
       error : ''
     }
     this.onSubmit = this.onSubmit.bind(this)
     this.onNameChange = this.onNameChange.bind(this)
     this.onEmailChange = this.onEmailChange.bind(this)
     this.onPasswordChange = this.onPasswordChange.bind(this)
     this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this)
     this.onAgeChange = this.onAgeChange.bind(this)
     this.onGenderChange = this.onGenderChange.bind(this)
     this.onCountryChange = this.onCountryChange.bind(this)
   }

   onSubmit() {

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

  onGenderChange = number => {
    this.setState({
      radio : number
    })
  }

  render () {
    return (
      <OptionForm password={this.state.password}
                  name={this.state.name}
                  email={this.state.email}
                  confirmPassword={this.state.confirmPassword}
                  country={this.state.country}
                  age={this.state.age}
                  gender={this.state.gender}
                  isLoading={this.state.isLoading}
                  error={this.state.error}/>
    )
  }
}

export default Options