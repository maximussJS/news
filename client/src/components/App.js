import React from 'react';
import {Route,Switch} from 'react-router-dom'
import Content from './Content'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Layout from '../container/Layout'
import '../index.css'

const App = () => {
    return (
        <Layout>
          <Switch>
            <Route exact component={Content} path='/'/>
            <Route exact component={LoginForm} path='/login'/>
            <Route exact component={RegisterForm} path='/register'/>
          </Switch>
        </Layout>
    )
}


export default App;
