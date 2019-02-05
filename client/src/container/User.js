import React,{Component} from 'react'
import Profile from '../components/Profile'
import {getUser} from '../utils/requests'
import {getPassword, isAuthenticated} from '../utils/auth'


export default class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item : '',
            error : '',
            isLoading : false
        }
    }

    componentDidMount() {
        if(isAuthenticated() && getPassword() !== '') {
            if(!this.state.isLoading) {
                this.setState({
                    isLoading : false
                }, async () => {
                    const email = this.props.match.params.email
                    if(email.length < 4) this.setState({
                        error : 'Invalid email length'
                    })
                    const response = await getUser(email)
                    response.success ? this.setState({
                        isLoading : false,
                        item : response.data
                    }) : this.setState({
                        isLoading : false,
                        error : response.text
                    })
                })
            }
        }
        else this.props.history.push('/login')
    }

    render() {
        return (
            <Profile item={this.state.item}/>
        )
    }
}