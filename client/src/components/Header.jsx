import React,{Component} from 'react'
import {Navbar,NavbarBrand} from 'mdbreact'
import NavbarNavLeft from './NavbarNavLeft'
import NavbarNavRight from './NavbarNavRightt'
import {isAuthenticated} from '../utils/auth'
import {navbarLeftLinks,navbarRightLinks} from '../utils/links'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      leftNavbar : {},
      rightNavbar : {},
      error : ''
    }
  }

  componentDidMount() {
    isAuthenticated() && this.setState({
          leftNavbar : navbarLeftLinks,
          rightNavbar : navbarRightLinks
    })
  }

  render() {
    const {error,leftNavbar,rightNavbar} = this.state
    return (
      !error ? <Navbar className='my-navbar-style'
                       dark expand="md"
                       scrolling
                       fixed="top">
          <NavbarBrand href="/"
                       className="h1 logo-style">
            <h1>News</h1>
          </NavbarBrand>
          <NavbarNavLeft links={leftNavbar}/>
          <NavbarNavRight links={rightNavbar}/>
        </Navbar> : null
    )
  }
}

export default Header