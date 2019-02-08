import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Content from '../container/Content'
import Login from '../container/Login'
import Logout from '../container/Logout'
import Register from '../container/Register'
import Layout from '../container/Layout'
import Profile from '../container/Profile'
import Options from '../container/Options'
import CreateNew from '../container/CreateNew'
import NewPage from '../container/NewPage'
import User from '../container/User'
import Error from '../components/Error'
import '../css/index.css'


const App = () => {
    return (
        <Layout>
            <Switch>
                <Route exact component={Content} path='/'/>
                <Route exact component={Login} path='/login'/>
                <Route exact component={Logout} path='/logout'/>
                <Route exact component={Register} path='/register'/>
                <Route exact component={Options} path='/options'/>
                <Route exact component={Profile} path='/profile'/>
                <Route exact component={CreateNew} path='/news/create'/>
                <Route component={User} path='/user/:email'/>
                <Route component={NewPage} path='/new/:url'/>
                <Route component={Error} path='/error'/>
            </Switch>
        </Layout>
    )
}


export default App