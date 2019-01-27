import React,{Fragment} from 'react'
import {Navbar,NavbarBrand} from 'mdbreact'
import NavbarNavLeft from './NavbarNavLeft'
import NavbarNavRight from './NavbarNavRightt'
import {isAuthenticated} from '../utils/auth'
import {navbarLeftLinks,navbarRightLinks} from '../utils/links'


const Header = () =>
    <Navbar className='my-navbar-style'
            dark expand="md"
            scrolling
            fixed="top">
        <NavbarBrand href="/"
                     className="h1 logo-style">
            <h1>
                News
            </h1>
        </NavbarBrand>
        {isAuthenticated() ?
          <Fragment>
              <NavbarNavLeft links={navbarLeftLinks}/>
              <NavbarNavRight links={navbarRightLinks}/>
           </Fragment> : ''}
      </Navbar>


export default Header