import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout = props =>
       <div>
          <Header/>
         <br/><br/>
         {props.children}
          <Footer/>
       </div>

export default Layout