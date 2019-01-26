import React from 'react'
import {Fa,NavbarNav,NavItem,NavLink} from 'mdbreact'
import PropTypes from 'prop-types'

const NavbarNavRight = props => {
  const links = props.links
  return (
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
  )
}

NavbarNavRight.propTypes = {
  links : PropTypes.array.isRequired
}

export default NavbarNavRight