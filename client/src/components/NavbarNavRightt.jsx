import React from 'react'
import {Fa,NavbarNav,NavItem,NavLink} from 'mdbreact'

const NavbarNavRight = ({
    links
}) =>
  <NavbarNav right>
    {Object.keys(links).map(key =>
      <NavItem>
        <NavLink to={links[key]}>
          <Fa size='3x'
              icon={key}/>
        </NavLink>
      </NavItem>
    )}
  </NavbarNav>

export default NavbarNavRight