import React from 'react'
import {NavbarNav,NavItem,NavLink } from 'mdbreact'
import PropTypes from 'prop-types'


const NavbarNavLeft = ({
  links
}) =>
    <NavbarNav left>
      {Object.keys(links).map(key =>
          <NavItem>
            <NavLink className="h3"
                     to={links[key]}>
              {key}
            </NavLink>
          </NavItem>
      )}
    </NavbarNav>


NavbarNavLeft.propTypes = {
  links : PropTypes.array.isRequired
}


export default NavbarNavLeft