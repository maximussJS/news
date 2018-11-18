import React,{Component} from 'react'
import {Navbar,NavbarBrand} from 'mdbreact'
import NavbarNavLeft from './NavbarNavLeft'
import NavbarNavRight from './NavbarNavRight'

const left = {
  names : ['Home','Features','Pricing','Options'],
  links : ["#","#","#","#"]
}

const right = {
  names: ['facebook','github','instagram'],
  links: ['#','#','#']
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
             <NavbarNavLeft names={left.names}
                            links={left.links}/>
             <NavbarNavRight names={right.names}
                             links={right.links}/>
          </Navbar>
    )
  }
}

export default Header