import React,{Component} from 'react'
import OptionForm from '../components/Options'
import {getUser,authenticate,deauthenticate} from '../utils/auth'
import {updateUser,deleteUser} from '../utils/requests'


export default class Options extends Component {
    constructor (props) {
        super(props)
        this.state = {
            name : '',
            email : '',
            password : '',
            newPassword : '',
            country : '',
            age : 0,
            gender : 0,
            isLoading : false,
            error : '',
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onNameChange = this.onNameChange.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onNewPasswordChange = this.onNewPasswordChange.bind(this)
        this.onAgeChange = this.onAgeChange.bind(this)
        this.onGenderChange = this.onGenderChange.bind(this)
        this.onCountryChange = this.onCountryChange.bind(this)
        this.onDeleteClick = this.onDeleteClick.bind(this)
        this.onImageClick = this.onImageClick.bind(this)
        this.onFileInputChange = this.onFileInputChange.bind(this)
    }

    async onSubmit() {
        try {
            this.setState({
                isLoading : true
            })
            const user = getUser()
            const {name,email,country,age,gender,password,newPassword} = this.state
            if(user.name === name && user.email === email && user.country === country
                && user.age === age && +user.gender === gender && password === '') {
                this.setState({
                    error : 'You did not change your account settings',
                    isLoading : false
                })
                setTimeout(() => this.setState({
                    error : ''
                }),2000)
            }
            else {
                let result = {}
                if(user.name !== name) result.name = name
                if(user.email !== email) result.email = email
                if(user.country !== country) result.country = country
                if(user.age !== age) result.age = age
                if(+user.gender !== gender) user.gender = gender
                if(password !== '') result.password = password
                if(newPassword !== '') result.newPassword = newPassword
                const response = await updateUser(result)
                if(response.success) {
                    authenticate(response.token)
                    this.props.history.push('/')
                }
                else {
                    this.setState({
                        isLoading : false,
                        error : response.message
                    })
                    setTimeout(() => this.setState({
                        error : ''
                    }),2000)
                }
            }

        }
        catch (e) {
            this.setState({
                error : e.message
            })
        }
    }

    componentDidMount() {
        const user = getUser()
        this.setState({
            name : user.name,
            email : user.email,
            country : user.country,
            age : user.age,
            gender : +user.gender,
        })
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

    onNewPasswordChange(e) {
        this.setState({
            newPassword: e.target.value
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
            gender : number
        })
    }

    onImageClick = () => document.getElementById('file-upload').click()

    onFileInputChange() {
        setTimeout( () => alert(JSON.stringify(document.getElementById('file-upload').files[0])),2000)
    }

    async onDeleteClick() {
        try {
            await this.setState({
                isLoading : true
            })
            const response = await deleteUser()
            if(response.success) {
                deauthenticate()
                this.props.history.push('/login')
            }
            else {
                this.setState({
                    isLoading : false,
                    error : 'Something goes wrong..',
                })
                setTimeout(() => this.setState({
                    error : ''
                }),2000)
            }
        }
        catch (e) {
            this.setState({
                error : e.message
            })
        }
    }

    render () {
        return (
            <OptionForm password={this.state.password}
                        name={this.state.name}
                        email={this.state.email}
                        newPassword={this.state.newPassword}
                        country={this.state.country}
                        age={this.state.age}
                        gender={this.state.gender}
                        isLoading={this.state.isLoading}
                        error={this.state.error}
                        onSubmit={this.onSubmit}
                        onNameChange={this.onNameChange}
                        onEmailChange={this.onEmailChange}
                        onPasswordChange={this.onPasswordChange}
                        onNewPasswordChange={this.onNewPasswordChange}
                        onAgeChange={this.onAgeChange}
                        onCountryChange={this.onCountryChange}
                        onGenderChange={this.onGenderChange}
                        onDeleteClick={this.onDeleteClick}
                        onImageClick={this.onImageClick}
                        onFileInputChange={this.onFileInputChange}/>
        )
    }
}