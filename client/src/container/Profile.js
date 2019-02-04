import React,{Component} from 'react'
import Page from '../components/Profile'
import {getUser,getPassword, isAuthenticated} from '../utils/auth'


export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item : getUser()
        }
    }

    componentDidMount() {
        if(isAuthenticated() && getPassword() !== '') {
            if(this.state.password === '') this.props.history.push('/error')
        }
        else this.props.history.push('/login')
    }

    render() {
        return (
            <Page item={this.state.item}/>
        )
    }
}