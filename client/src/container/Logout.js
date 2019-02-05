import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {deauthenticate} from '../utils/auth'


export default class Logout extends Component {
    render() {
        deauthenticate()
        return <Redirect to={{pathname: '/login'}}/>
    }
}