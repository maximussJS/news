import React,{Component} from 'react'
import LoginForm from '../components/LoginForm'
import {withRouter} from 'react-router-dom'
import {login} from '../utils/requests'
import {authenticate} from '../utils/auth'


class Login extends Component {
    constructor (props) {
        super(props)
        this.state = {
            email : '',
            password : '',
            error : '',
            isLoading : false
        }
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onReset = this.onReset.bind(this)
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

    onReset() {
        this.setState({
            password : '',
            email : '',
            isLoading : false
        })
    }

    onSubmit = async () => {
        try {
            const {email,password} = this.state
            if(8 > email.length > 20) this.setState({
                error : 'Invalid email length'
            })
            if(8 > password.length > 20) this.setState({
                error : 'Invalid password length'
            })
            if(this.state.error === '') {
                this.setState({
                    isLoading : true
                })
                const response = await login({
                    email : this.state.email,
                    password : this.state.password
                })
                if(response.success) {
                    authenticate(response.token)
                    this.props.history.push('/')
                }
                else {
                    this.setState({
                        error : response.message,
                        isLoading : false
                    })
                    setTimeout(() => this.setState({
                        error : ''
                    }),2000)
                }
            }
        }
        catch (e) {
            this.setState({
                error : e.message,
                isLoading : false
            })
        }
    }

    render () {
        return (
            <LoginForm onSubmit={this.onSubmit}
                       onPasswordChange={this.onPasswordChange}
                       onEmailChange={this.onEmailChange}
                       onReset={this.onReset}
                       error={this.state.error}
                       email={this.state.email}
                       password={this.state.password}
                       isLoading={this.state.isLoading}/>
        )
    }
}


export default withRouter(Login)