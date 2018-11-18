import React,{Component} from 'react'
import {Navbar,NavbarBrand} from 'mdbreact'
import NavbarNavLeft from './NavbarNavLeft'
import NavbarNavRight from './NavbarNavRightt'

const left = {
  Home : '#',
  Features : '#',
  Pricing : '#',
  Options : '#'
}

const right = {
  facebook : '#',
  github : '#',
  instagram : '#'
}

class Header extends Component {
  render() {
    const style = {
      backgroundColor: '#ff3333',
      maxHeight : 30
    }
    const logo = {
      color : 'black',
    }
    return (
          <Navbar style={style}
                  dark expand="md"
                  scrolling
                  fixed="top">
             <NavbarBrand href="/"
                          className="h1"
                          style={logo}>
               <h1>News</h1>
             </NavbarBrand>
             <NavbarNavLeft links={left}/>
             <NavbarNavRight links={right}/>
          </Navbar>
    )
  }
}

export default Header