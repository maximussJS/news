import React from 'react'
import {Fa,NavbarNav,NavItem,NavLink} from 'mdbreact'

const NavbarNavRight = ({
    names,
    links
}) =>
  <NavbarNav right>
    {names.map( (name,index) =>
      <NavItem>
        <NavLink to={links[index]}
                 key={index}>
          <Fa size='3x'
              icon={name}/>
        </NavLink>
      </NavItem>
    )}
  </NavbarNav>

export default NavbarNavRight