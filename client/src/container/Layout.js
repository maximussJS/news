import React from 'react'
import Header from '../components/Header'
import Content from '../components/Content'

const Layout = props =>
       <div>
          <Header/>
         <br/><br/>
          <Content/>
         {props.children}
       </div>

export default Layout