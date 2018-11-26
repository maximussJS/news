import React,{Component} from 'react'
import {Navbar,NavbarBrand} from 'mdbreact'
import NavbarNavLeft from './NavbarNavLeft'
import NavbarNavRight from './NavbarNavRightt'
import {isAuthenticated} from '../utils/auth'
import {getUser} from '../utils/requests'

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

  async componentDidMount() {
    try {
      const auth = await isAuthenticated()
      if (auth) {
        const result = await getUser()
        if (result.auth) await this.setState({
            left: leftarize(result.user),
            rigth: rigthize(result.user),
        })
      }
    }
    catch (e) {
       this.setState({
         error : e.message
       })
    }
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