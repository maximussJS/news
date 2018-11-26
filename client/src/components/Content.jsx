import React from 'react'
import {Container} from 'mdbreact'
import Spinner from './Spinner'
import New from './New'

const Content = ({
   items,
   loading,
   error
}) =>
   <Container className="text-center content-container">
     {loading ? <Spinner/> :
    <div className='row col-md-12'>
      {items ? items.map(key => <New item={key}/>) : "No items"}
    </div> }
     {error && "Error ...."}
  </Container>

export default Content