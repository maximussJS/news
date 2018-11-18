import React from 'react'
import {NavbarNav,NavItem,NavLink } from 'mdbreact'

const NavbarNavLeft = ({
    names,
    links
}) =>
  <NavbarNav left>
    {names.map((name,index) =>
      <NavItem>
         <NavLink className="h3" to={links[index]}
                  key={index}>
             {name}
         </NavLink>
      </NavItem>)}
  </NavbarNav>

export default NavbarNavLeft