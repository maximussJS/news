import React from 'react';
import {Route,Switch} from 'react-router-dom'
import Content from '../container/Content'
import Login from '../container/Login'
import Register from '../container/Register'
import Layout from '../container/Layout'
import Profile from '../container/Profile'
import '../index.css'

const App = () => {
    return (
        <Layout>
          <Switch>
            <Route exact component={Content} path='/'/>
            <Route exact component={Login} path='/login'/>
            <Route exact component={Register} path='/register'/>
            <Route component={Profile} path='/profile'/>
          </Switch>
        </Layout>
    )
}

export default App;