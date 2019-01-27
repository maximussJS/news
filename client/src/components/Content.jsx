import React from 'react'
import {Container} from 'mdbreact'
import Spinner from './Spinner'
import New from './New'
import PropTypes from 'prop-types'


const Content = ({
  loading,
  items,
  error
}) =>
    <Container className="text-center content-container">
      {loading ? <Spinner/> :
          <div className='row col-md-12'>
            {items ? items.map(key => <New item={key}/>) : "No items"}
          </div>}
          {error && "Error..."}
    </Container>


Content.propTypes = {
  items : PropTypes.arrayOf(PropTypes.object).isRequired,
  loading : PropTypes.bool.isRequired,
  error : PropTypes.object
}


export default Content