import React,{Component} from 'react'
import OptionForm from '../components/Options'
import {getUser, authenticate, deauthenticate, isAuthenticated, getPassword} from '../utils/auth'
import {updateUser, deleteUser, uploadNewImage} from '../utils/requests'


export default class Options extends Component {
    constructor (props) {
        super(props)
        this.state = {
            name : '',
            email : '',
            password : '',
            newPassword : '',
            country : '',
            image : '',
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
        this.onImageChange = this.onImageChange.bind(this)
    }

    componentDidMount() {
        if(isAuthenticated() && getPassword()) {
            const user = getUser()
            this.setState({
                name : user.name,
                email : user.email,
                country : user.country,
                image : user.ava_url,
                age : user.age,
                gender : +user.gender,
            })
        }
        else this.props.history.push('/login')
    }

    async onSubmit() {
        try {
            const {name,email,country,age,gender,image,password,newPassword} = this.state
            if(20 < name.length < 8) this.setState({
                error : 'Invalid name length'
            })
            if(20 < email.length < 8) this.setState({
                error : 'Invalid email length'
            })
            if(15 < country && country < 3) this.setState({
                error : 'Invalid country length'
            })
            if(65 < age && age < 6) this.setState({
                error : 'Invalid user age'
            })
            if(gender !== 0 && gender !== 1) this.setState({
                error : 'Invalid gender'
            })
            if(image.length < 10) this.setState({
                error : 'Invalid image'
            })
            if(this.state.error === '') {
                const user = getUser()
                const pass = getPassword()
                let obj = {}
                if(user.name !== name) obj.name = name
                if(user.email !== email) obj.email = email
                if(user.country !== country) obj.country = country
                if(user.age !== age) obj.age = age
                if(+user.gender !== gender) obj.gender = gender
                if(user.ava_url !== image) obj.ava_url = image
                if(password !== '') {
                    if(pass === password) {
                        if (20 >= newPassword.length && newPassword.length >= 8){
                            obj.newPassword = newPassword
                            obj.password = password
                        }
                        else this.setState({
                            error: 'Invalid length of new password'
                        })
                    }
                    else this.setState({
                        error : 'Password doesnt match'
                    })
                }
                if(Object.keys(obj).length === 0) this.setState({
                    error : 'You did not change tour account settings'
                })
                if(this.state.error === '') {
                    this.setState({
                        isLoading : true
                    })
                    const response = await updateUser({
                        obj : obj
                    })
                    if(response.success) {
                        authenticate(response.token)
                        this.props.history.push('/')
                    }
                    else this.setState({
                        isLoading: false,
                        error: response.text
                    })
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

    onImageChange = async e => {
        try {
            if(e.target.files[0] === null) this.setState({
                error : 'You did not chose file'
            })
            else {
                const response = await uploadNewImage(e.target.files[0])
                response.success ? this.setState({
                    isLoading : false,
                    image : response.data
                }) : this.setState({
                    isLoading : false,
                    error : response.text
                })
            }
        }
        catch (e) {
            this.setState({
                error : e.message,
                isLoading : false
            })
        }
    }

    async onDeleteClick() {
        try {
            this.setState({
                isLoading : true
            })
            const response = await deleteUser()
            if(response.success) {
                deauthenticate()
                this.props.history.push('/login')
            }
            else this.setState({
                isLoading : false,
                error : response.text
            })
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
            <OptionForm password={this.state.password}
                        name={this.state.name}
                        email={this.state.email}
                        newPassword={this.state.newPassword}
                        country={this.state.country}
                        age={this.state.age}
                        image={this.state.image}
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
                        onImageChange={this.onImageChange}/>
        )
    }
}