import React,{Component} from 'react'
import {Navbar,NavbarBrand} from 'mdbreact'
import NavbarNavLeft from './NavbarNavLeft'
import NavbarNavRight from './NavbarNavRightt'
import {isAuthenticated,getUser} from '../utils/auth'

const leftarize  = (user) => {
  return {
    Profile: `/profile/${user.url}`,
    Features: `/features/${user.url}`,
    Options: `/options/${user.url}`
  }
}

const rigthize = (user) => {
   return {
     facebook: `/facebook/${user.facebook}`,
     github : `/github/${user.github}`,
     instagram: `/instagram/${user.instagram}`
   }
}

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      left : {},
      right : {},
      error : ''
    }
  }

  componentDidMount() {
    isAuthenticated() && this.setState({
          left: leftarize(getUser()),
          rigth: rigthize(getUser())
    })
  }

  render() {
    const {error,left,right} = this.state
    return (
      !error ? <Navbar className='my-navbar-style'
                       dark expand="md"
                       scrolling
                       fixed="top">
          <NavbarBrand href="/"
                       className="h1 logo-style">
            <h1>News</h1>
          </NavbarBrand>
          <NavbarNavLeft links={left}/>
          <NavbarNavRight links={right}/>
        </Navbar> : null
    )
  }
}

export default Header