import React from 'react'
import {NavbarNav,NavItem,NavLink } from 'mdbreact'

const NavbarNavLeft = ({
  links
}) =>
  <NavbarNav left>
    {Object.keys(links).map( key =>
      <NavItem>
         <NavLink className="h3"
                  to={links[key]}>
             {key}
         </NavLink>
      </NavItem>)}
  </NavbarNav>


export default NavbarNavLeft