import React from 'react';
import {Route,Switch} from 'react-router-dom'
import Content from '../container/Content'
import Login from '../container/Login'
import Register from '../container/Register'
import Layout from '../container/Layout'
import Profile from '../container/Profile'
import Options from '../container/Options'
import CreateNew from '../container/CreateNew'
import NewPage from '../container/NewPage'
import '../index.css'


const App = () => {
    return (
        <Layout>
            <Switch>
                <Route exact component={Content} path='/'/>
                <Route exact component={Login} path='/login'/>
                <Route exact component={Register} path='/register'/>
                <Route exact component={Options} path='/options'/>
                <Route exact component={Profile} path='/profile'/>
                <Route exact component={CreateNew} path='/news/create'/>
                <Route component={NewPage} path='/new/:url'/>}/>
            </Switch>
        </Layout>
    )
}


export default App;